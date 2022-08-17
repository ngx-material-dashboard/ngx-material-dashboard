import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { catchError, map, Observable, of, throwError } from "rxjs";

import { DatastoreConfig } from "../interfaces/datastore-config.interface";
import { ModelConfig } from "../interfaces/model-config.interface";
import { ModelType } from "../interfaces/model-type.interface";
import { JsonApiQueryData } from "../models/json-api-query-data";
import { JsonModel } from "../models/json.model";
import { ErrorResponse } from "../models/error-response.model";
import stringify from '../utilities/stringify';
import { Injectable } from "@angular/core";

/**
 * The `JsonDatastore` is the main datastore service that should be used to
 * interface with your JSON API. While it is defined as an abstract class there
 * is quite a bit of functionality included. This service includes CRUD methods
 * that handle creating the various HTTP requests needed, and handles parsing
 * JSON response body data and converting it into client side data models. I've
 * created the methods so that they are as generic as possible, meaning they do
 * not care about how the JSON and your client side data models are structured.
 * 
 * ## Extending this Service
 * 
 * This service must be extended to complete the functionality required for the
 * CRUD methods. The [json](/json) and [json-api](/json-api) libraries contain
 * a datastore service that extend this class. I suggest taking a look at these
 * libraries to see if they will work for your application. If they do not they
 * should at the very least provide examples of how to extend this class. I do
 * include some details on what you need to do to extend this class below.
 * 
 * > NOTE: All examples provided below are taken from the
 * > [JsonDatastore](/json/services/json-datastore) in the `json` library.
 * 
 * To make the service as generic as possible I had to define several abstract
 * method calls that need to be implemented to handle parsing and generating
 * JSON data to/from your client. The methods that must be implemented are
 * `createRecord`, `deserializeModel`, `serializeModel`, `extractQueryData`,
 * and `extractRecordData`. See below for details on the methods that
 * need to be implemented when extending this class.
 * 
 * ### createRecord
 * 
 * Creates and returns a new instance of the given data as the given model
 * type. This should only create the instance and should not make any HTTP
 * requests to save the model. It is a convenience method for initializing
 * new data objects in the client, so you are not tied to format of JSON
 * included in HTTP requests/responses. It should be relatively simple and
 * should not rely on transforming attribute values like deserializeModel,
 * meaning the data should be a map of key/value pairs where the keys match
 * up with the attributes defined for your models. Below is the most basic
 * implementation:
 * 
 * ```typescript
 * public createRecord<T extends JsonModel>(modelType: ModelType<T>, data: Partial<T>): T {
 *     return new modelType(this, data);
 * }
 * ```
 * 
 * ### deserializeModel
 * 
 * Returns the given JSON data as the given model type. The JSON data should
 * be data extracted directly from the body of a JSON API response, and is
 * mainly called from the extractQueryData and extractRecordData methods.
 * The implementation should call transformSerializedNamesToPropertyNames on
 * the data prior to calling the models contructor. This will transform any
 * JSON object literal keys to their respective property names as defined in
 * the `serializedName` value for the `Attribute` decorators defined in your
 * data models, so that the constructor can use `Object.assign(this, data)`
 * (or some variation of that can be used to assign all properties their
 * corresponding values).
 * 
 * ```typescript
 * public deserializeModel<T extends JsonModel>(modelType: ModelType<T>, data: any): T {
 *     data = this.transformSerializedNamesToPropertyNames(modelType, data);
 *     return new modelType(this, data);
 * }
 * ```
 * 
 * ### serializeModel
 * 
 * Returns a JSON literal that can be included in an HTTP request body from
 * the given model.
 * 
 * ```typescript
 * public serializeModel(model: any, attributesMetadata: any, transition?: string): any {
 *     const data: any = this.getDirtyAttributes(attributesMetadata, model);
 *
 *     let body;
 *     if (transition) {
 *         body = {
 *             meta: {
 *                 transition
 *             },
 *             data
 *         };
 *     } else {
 *         body = data;
 *     }
 *
 *     return body;
 * }
 * ```
 * 
 * ### extractQueryData
 * 
 * Parses and extracts query data from the given HTTP response body for
 * lists of models (used by findAll), and returns it as a 
 * {@link JsonApiQueryData} that includes a list of models of the given
 * modelType and meta data (i.e. total number of results for determining
 * how many pages there are).
 * 
 * ```typescript
 * protected extractQueryData<T extends JsonModel>(
 *     response: HttpResponse<object>,
 *     modelType: ModelType<T>,
 *     withMeta = false
 * ): Array<T> | JsonApiQueryData<T> {
 *     const body: any = response.body;
 *     const models: T[] = [];
 *
 *     body.data.forEach((data: any) => {
 *         const model: T = this.deserializeModel(modelType, data);
 *         this.addToStore(model);
 *         models.push(model);
 *     });
 *
 *     if (withMeta && withMeta === true) {
 *         return new JsonApiQueryData(models, this.parseMeta(body, modelType));
 *     }
 *
 *     return models;
 * }
 * ```
 * 
 * ### extractRecordData
 * 
 * Parses and extracts record data from the given HTTP response body for a
 * single object and returns it as the given modelType.
 * 
 * ```typescript
 * protected extractRecordData<T extends JsonModel>(
 *     res: HttpResponse<object>,
 *     modelType: ModelType<T>,
 *     model?: T
 * ): T {
 *     const body: any = res.body;
 *     if (!body) {
 *         throw new Error('no body in response');
 *     }
 *
 *     if (model) {
 *         model.modelInitialization = true;
 *         model.id = body.id;
 *         Object.assign(model, body);
 *         model.modelInitialization = false;
 *     }
 *
 *     const deserializedModel = model || this.deserializeModel(modelType, body.data);
 *     this.addToStore(deserializedModel);
 *     return deserializedModel;
 * }
 * ```
 */
@Injectable()
export abstract class JsonDatastore {

    /** Options included in DatastoreConfig decorator. */
    protected config!: DatastoreConfig;
    /** An internal data store map of model types to model objects mapped by id. */
    protected internalStore: { [type: string]: { [id: string]: any } } = {};
    private globalHeaders!: HttpHeaders;
    private globalRequestOptions: object = {};
    private toQueryString: (params: any) => string = this.datastoreConfig.overrides
        && this.datastoreConfig.overrides.toQueryString ?
            this.datastoreConfig.overrides.toQueryString : this._toQueryString;

    constructor(protected httpClient: HttpClient) {}

    //---Getters/Setters-------------------------------------------------------

    /**
     * Returns the contentType for requests. Can be specified in the
     * datastoreConfig, but defaults to 'application/json' if no option
     * included. This provided as a convenience to control the contentType
     * easily as the default may not work for everyone (i.e. json:api spec uses
     * 'application/vnd.api+json').
     */
    public get contentType(): string {
        const contentType = this.datastoreConfig.contentType;
        if (contentType) {
            return contentType;
        } else {
            return 'application/json';
        }
    }

    /**
     * Returns configuration provided in JsonApiDatastoreConfig decorator. This
     * should be defined where you create your extending datastore service in
     * your application, and should include things like base URL and model
     * types to include in JSON API interface.
     */
    public get datastoreConfig(): DatastoreConfig {
        const configFromDecorator: DatastoreConfig = Reflect.getMetadata('JsonApiDatastoreConfig', this.constructor);
        return Object.assign(configFromDecorator, this.config);
    }

    /**
     * Sets global headers which will be included in every HTTP request. Any
     * custom headers added when calling various CRUD methods are added in
     * addition to these global headers.
     */
    set headers(headers: HttpHeaders) {
        this.globalHeaders = headers;
    }

    //---Abstract Methods------------------------------------------------------
    // These methods define how data is structured

    /**
     * Creates and returns a new instance of the given data as the given model
     * type. This should only create the instance and should not make any HTTP
     * requests to save the model. It is a convenience method for initializing
     * new data objects in the client, so you are not tied to format of JSON
     * included in HTTP requests/responses. It should be relatively simple and
     * should not rely on transforming attribute values like deserializeModel,
     * meaning the data should be a map of key/value pairs where the keys match
     * up with the attributes defined for your models. Below is the most basic
     * implementation:
     * 
     * ```typescript
     * public createRecord<T extends JsonModel>(modelType: ModelType<T>, data: Partial<T>): T {
     *     return new modelType(this, data);
     * }
     * ```
     *
     * @param modelType The type of model to create.
     * @param data Optional parameter that contains data to initialize.
     * @returns A new instance of the given data as the given model type.
     */
    public abstract createRecord(modelType: ModelType<any>, data?: any): any;

    /**
     * Returns the given JSON data as the given model type. The JSON data should
     * be data extracted directly from the body of a JSON API response, and is
     * mainly called from the extractQueryData and extractRecordData methods.
     * The implementation should call transformSerializedNamesToPropertyNames
     * method to take advantage of options included in {@link Attribute}
     * decorators defined in your data models.
     *
     * @param modelType The model type to return. 
     * @param data The JSON data to use to create an object of modelType.
     * @returns An object of given modelType with given data.
     */
    public abstract deserializeModel(modelType: ModelType<any>, data: any): any;
 
    /**
     * Returns a JSON object that can be included in an HTTP request body from
     * the given model.
     *
     * @param model The model with data to serialize. 
     * @param attributesMetadata Metadata for the model instance.
     * @param transition Optional transition string to include as meta data in request body.
     * @param includeRelationships Optional boolean value to include relationship data with body.
     */
    public abstract serializeModel(model: any, attributesMetadata: any, transition?: string, includeRelationships?: boolean): any;
 
    /**
     * Parses and extracts query data from the given HTTP response body for
     * lists of models (used by findAll), and returns it as a 
     * {@link JsonApiQueryData} that includes a list of models of the given
     * modelType and meta data (i.e. total number of results for determining
     * how many pages there are).
     *
     * @param response The HTTP response from the server.
     * @param modelType The type of model the data should be returned as.
     * @param withMeta Optional boolean value indicating if meta data included.
     */
    protected abstract extractQueryData(
         response: HttpResponse<object>,
         modelType: ModelType<any>,
         withMeta?: boolean
    ): Array<any> | JsonApiQueryData<any>;
 
    /**
     * Parses and extracts record data from the given HTTP response body for a
     * single object and returns it as the given modelType.
     * 
     * @param res The HTTP response from the server.
     * @param modelType The type of model the data 
     * @param model 
     */
    protected abstract extractRecordData(
         res: HttpResponse<object>,
         modelType: ModelType<any>,
         model?: any
    ): any;

    //---Default CRUD Methods--------------------------------------------------
    // Default implementation for CRUD methods. You may override any of these
    // to suite your needs

    /**
     * Finds all models of the given type based on the given parameters and
     * returns an observable of {@link JsonApiQueryData}, which should include
     * the resulting models and meta data (i.e. total number of results for
     * determining how many pages there are).
     *
     * @param modelType The type of model to query for.
     * @param params Optional parameters to include in query (filter, paging, sorting).
     * @param headers Optional headers to include with the request.
     * @param customUrl Optional custom URL to use for request (otherwise built from config and model).
     */
    public findAll<T extends JsonModel>(
        modelType: ModelType<T>,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<JsonApiQueryData<T>> {
        const requestOptions: object = this.buildRequestOptions({headers, observe: 'response'});
        const url = this.buildUrl(modelType, params, undefined, customUrl);
        return this.httpClient.get<any>(url, requestOptions).pipe(
            map((res: any) => {
                return this.extractQueryData(res, modelType, true) as JsonApiQueryData<T>;
            }),
            catchError((res: any) => this.handleError(res))
        );
    }

    /**
     * Returns the details for a single model.
     *
     * @param modelType The type of model to return.
     * @param id The id of the model to return.
     * @returns The requested model.
     */
    public findRecord<T extends JsonModel>(
        modelType: ModelType<T>,
        id: string,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<T> {
        const requestOptions: object = this.buildRequestOptions({headers, observe: 'response'});
        const url = this.buildUrl(modelType, params, id, customUrl);
        return this.httpClient.get(url, requestOptions).pipe(
            map((res: any) => this.extractRecordData(res, modelType)),
            catchError((res: any) => this.handleError(res))
        );
    }

    /**
     * Deletes an existing model.
     *
     * @param modelType The type of model to delete. 
     * @param id The id of the model to delete.
     * @param headers Optional headers to include with the request.
     * @param customUrl Optional custom URL to use for request.
     */
    public deleteRecord<T>(
        modelType: ModelType<T>,
        id: string,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<any> {
        const requestOptions: object = this.buildRequestOptions({headers});
        const url: string = this.buildUrl(modelType, null, id, customUrl);

        return this.httpClient.delete(url, requestOptions).pipe(
            catchError((res: HttpErrorResponse) => this.handleError(res))
        );
    }

    /**
     * Saves a model. This will send appropriate HTTP request based on whether
     * model is new or exists (i.e. POST for new models, PATCH for existing). A
     * model is considered new if it doesn't have an assigned primary key id
     * value.
     *
     * @param attributesMetadata Metadata from the model.
     * @param model The model to save.
     * @param params Optional parameters to include in HTTP request.
     * @param headers Optional headers to include in HTTP request.
     * @param customUrl Optional custom URL to use for HTTP request.
     * @returns The HTTP response data extracted as the saved model type.
     */
    public saveRecord(
        attributesMetadata: any,
        model: any,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<any> {
        const modelType = model.constructor as ModelType<any>;
        const url: string = this.buildUrl(modelType, params, model.id, customUrl);

        let httpCall: Observable<HttpResponse<object>>;
        const body: any = this.serializeModel(model, attributesMetadata, undefined, true);
        const requestOptions: object = this.buildRequestOptions({headers, observe: 'response'});

        if (model.id) {
            // if the id exists, then model should exist in DB so send PATCH
            httpCall = this.httpClient.patch<object>(url, body, requestOptions) as Observable<HttpResponse<object>>;
        } else {
            // if id doesn't exist, then new model so send POST
            httpCall = this.httpClient.post<object>(url, body, requestOptions) as Observable<HttpResponse<object>>;
        }

        return httpCall
        .pipe(
            map((res) => [200, 201].indexOf(res.status) !== -1 ? this.extractRecordData(res, modelType, model) : model),
            catchError((res) => {
                if (res == null) {
                    return of(model);
                }
                return this.handleError(res);
            })
        );
    }

    /**
     * Updates an existing model.
     *
     * @param model The model to update. 
     * @param transition Optional transition to include with update data.
     * @param params Optional parameters to include with HTTP request.
     * @param includeRelationships Optional boolean value indicating whether to include relationships with request.
     * @returns The HTTP response data extracted as the updated model type.
     */
    public updateRecord(
        model: any,
        transition?: string,
        params?: { [param: string]: string | string[] },
        includeRelationships?: boolean
    ): Observable<any> {
        // setup basic info for request (taken directly from saveRecord)
        const modelType = model.constructor as ModelType<any>;
        const requestHeaders: HttpHeaders = this.buildHttpHeaders();
        const url: string = this.buildUrl(modelType, '', model.id);

        // the model data to include in the request body
        const attributesMetadata: any = Reflect.getMetadata('Attribute', model);
        const body: any = this.serializeModel(model, attributesMetadata, transition, includeRelationships);

        // send the PATCH request
        const httpPatch = this.httpClient.patch(url, body, { headers: requestHeaders, observe: 'response', params });
        return httpPatch.pipe(
            map((res: HttpResponse<object>) => {
                    return [200, 201].indexOf(res.status) !== -1 ? this.extractRecordData(res, modelType, model) : model;
            }),
            catchError((res) => {
                if (res == null) {
                    return of(model);
                }

                return this.handleError(res);
            })
        );
    }

    /**
     * Deletes all given JsonApiModel objects. A separate delete request
     * is made for each JsonApiModel object. The method is asynchronous so
     * that it can "await" for each delete request to complete before the
     * next delete request is made. Otherwise a StaleObjectStateException
     * occurs due to multiple delete requests getting received at the same
     * time on the server.
     *
     * @param modelType The model type to delete.
     * @param models The array of models to delete.
     */
    // TODO make bulk delete a single transaction where UI can send list of
    // IDs to delete to server API
    // NEW METHOD SIGNATURE SHOULD BE SOMETHING LIKE BELOW
    //
    //  public deleteAllRecords(
    //      modelType: ModelType<T>,
    //      models: JsonApiModel[] or just string list of ids: string[],
    //      headers?: HttpHeaders,
    //      customUrl?: string
    //  ): Observable<any> {...}
    //
    //  async deleteAll(modelType: ModelType<JsonApiModel>, models: JsonApiModel[]): Promise<void> {
    //     for (let i = 0; i < models.length; i++) {
    //         const id = models[i].id
    //         // wait for the current async call to complete before making another call
    //         if (id) {
    //             await this.deleteRecord(modelType, id).subscribe();
    //         }
    //     }
    // }

    //---Other Helper Methods--------------------------------------------------

    /**
     * Adds the given model or models to the internal data store for the
     * service.
     * 
     * @param modelOrModels The model or models to add to the data store.
     */
    public addToStore(modelOrModels: JsonModel | JsonModel[]): void {
        const models = Array.isArray(modelOrModels) ? modelOrModels : [modelOrModels];
        const type: string = models[0].modelConfig.type;
        let typeStore = this.internalStore[type];

        if (!typeStore) {
            typeStore = this.internalStore[type] = {};
        }

        for (const model of models) {
            if (model.id) {
                typeStore[model.id] = model;
            }
        }
    }

    /**
     * Generates and returns request options from given customOptions headers
     * and globalRequestOptions.
     *
     * @param customOptions Custom options that contains headers to include in request. 
     * @returns Combined globalRequestOptions and optional custom headers.
     */
    buildRequestOptions(customOptions: any = {}): object {
        const httpHeaders: HttpHeaders = this.buildHttpHeaders(customOptions.headers);

        const requestOptions: object = Object.assign(customOptions, {
            headers: httpHeaders
        });

        return Object.assign(this.globalRequestOptions, requestOptions);
    }

    /**
     * Returns the attributes that are dirty.
     */
    protected get getDirtyAttributes() {
        if (this.datastoreConfig.overrides
            && this.datastoreConfig.overrides.getDirtyAttributes
        ) {
            return this.datastoreConfig.overrides.getDirtyAttributes;
        }
        return JsonDatastore.getDirtyAttributes;
    }

    /**
     * Determines the model attributes that are dirty.
     *
     * @param attributesMetadata Metadata for attributes for model. 
     * @returns The model attributes that are dirty.
     */
    protected static getDirtyAttributes(attributesMetadata: any): { string: any } {
        const dirtyData: any = {};

        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                const metadata: any = attributesMetadata[propertyName];

                // include all attributes regardless of whether they are dirty
                // as the dirty check seems to be broken right now
                //if (metadata.hasDirtyAttributes) {
                    const attributeName = metadata.serializedName != null ? metadata.serializedName : propertyName;
                    dirtyData[attributeName] = metadata.serialisationValue ? metadata.serialisationValue : metadata.newValue;
                //}
            }
        }

        return dirtyData;
    }

    protected buildHttpHeaders(customHeaders?: HttpHeaders): HttpHeaders {
        let requestHeaders: HttpHeaders = new HttpHeaders({
            Accept: this.contentType,
            'Content-Type': this.contentType
        });

        if (this.globalHeaders) {
            this.globalHeaders.keys().forEach((key) => {
                if (this.globalHeaders.has(key)) {
                    const val = this.globalHeaders.get(key);
                    if (val) {
                        requestHeaders = requestHeaders.set(key, val);
                    }                
                }
            });
        }

        if (customHeaders) {
            customHeaders.keys().forEach((key) => {
                if (customHeaders.has(key)) {
                    const val = customHeaders.get(key);
                    if (val) {
                        requestHeaders = requestHeaders.set(key, val);
                    }
                }
            });
        }

        return requestHeaders;
    }

    /**
     * Returns the URL to connect to based on the given modelType.
     *
     * @param modelType The type of model to use when building the URL.
     * @returns The URL to connect to.
     */
    protected buildUrl(
        modelType: ModelType<any>,
        params?: any,
        id?: string,
        customUrl?: string
    ): string {
        // TODO: use HttpParams instead of appending a string to the url
        const queryParams: string = this.toQueryString(params);

        if (customUrl) {
            return queryParams ? `${customUrl}?${queryParams}` : customUrl;
        }

        const modelConfig: ModelConfig = Reflect.getMetadata('JsonApiModelConfig', modelType);
        const baseUrl = modelConfig.baseUrl || this.datastoreConfig.baseUrl;
        const apiVersion = modelConfig.apiVersion || this.datastoreConfig.apiVersion;
        const modelEndpointUrl: string = modelConfig.modelEndpointUrl || modelConfig.type;
        const url: string = [baseUrl, apiVersion, modelEndpointUrl, id].filter((x) => x).join('/');

        return queryParams ? `${url}?${queryParams}` : url;
    }

    protected getModelPropertyNames(model: JsonModel) {
        return Reflect.getMetadata('AttributeMapping', model) || [];
    }

    /**
     * Handles parsing an HttpErrorResponse and creating an ErrorResponse type
     * object (if it follows the JSON:API spec format), and then throwing the
     * error object so the application can handle the error object accordingly.
     * If the error received does not follow the JSON:API spec format, the
     * error should be thrown as is so the application can still handle the
     * error (it will just need to manually parse the response).
     *
     * @param error An error object caught by the HttpClient.
     * @returns An Observable of an ErrorResponse or the given error as is.
     */
    protected handleError(error: any): Observable<any> {
        if (
            error instanceof HttpErrorResponse &&
            error.error instanceof Object &&
            error.error.errors &&
            error.error.errors instanceof Array
        ) {
            const errors: ErrorResponse = new ErrorResponse(error.error.errors);
            return throwError(() => errors);
        }

        return throwError(() => error);
    }

    protected parseMeta(body: any, modelType: ModelType<JsonModel>): any {
        const metaModel: any = Reflect.getMetadata('JsonApiModelConfig', modelType).meta;
        return new metaModel(body);
    }

    public peekRecord<T>(modelType: ModelType<T>, id: string): T | null {
        const type: string = Reflect.getMetadata('JsonApiModelConfig', modelType).type;
        return this.internalStore[type] ? this.internalStore[type][id] as T : null;
    }

    public peekAll<T>(modelType: ModelType<T>): Array<T> {
        const type = Reflect.getMetadata('JsonApiModelConfig', modelType).type;
        const typeStore = this.internalStore[type];
        return typeStore ? Object.keys(typeStore).map((key) => typeStore[key] as T) : [];
    }

    public transformSerializedNamesToPropertyNames<T>(modelType: ModelType<T>, attributes: any): any {
        const serializedNameToPropertyName = this.getModelPropertyNames(modelType.prototype);
        const properties: any = {};

        Object.keys(serializedNameToPropertyName).forEach((serializedName) => {
            if (attributes && attributes[serializedName] !== null && attributes[serializedName] !== undefined) {
                properties[serializedNameToPropertyName[serializedName]] = attributes[serializedName];
            }
        });

        return properties;
    }

    private _toQueryString(params: any): string {
        return stringify(params, {arrayFormat: 'brackets'});
    }
}
