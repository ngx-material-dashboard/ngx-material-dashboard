import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatastoreConfig, JsonApiQueryData, JsonDatastore as BaseJsonDatastore, ModelType } from '@ngx-material-dashboard/base-json';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { ErrorResponse } from '../models/error-response.model';

import { JsonModel } from '../models/json.model';

@Injectable()
export class JsonDatastore extends BaseJsonDatastore {

    protected override config!: DatastoreConfig;

    constructor(protected httpClient: HttpClient) {
        super();
    }

    private get getAttributes() {
        if (this.datastoreConfig.overrides
            && this.datastoreConfig.overrides.getDirtyAttributes
        ) {
            return this.datastoreConfig.overrides.getDirtyAttributes;
        }
        return JsonDatastore.getAttributes;
    }

    private static getAttributes(attributesMetadata: any): { string: any } {
        const data: any = {};

        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                const metadata: any = attributesMetadata[propertyName];

                if (metadata.hasDirtyAttributes) {
                    const attributeName = metadata.serializedName != null ? metadata.serializedName : propertyName;
                    data[attributeName] = metadata.serialisationValue ? metadata.serialisationValue : metadata.newValue;
                }
            }
        }

        return data;
    }

    /**
     * Creates a new model using the given partial data.
     *
     * @param modelType The type of model to create.
     * @param data The data to use when creating the model.
     * @returns A newly created model based on the given data.
     */
    public createRecord<T extends JsonModel>(modelType: ModelType<T>, data: Partial<T>): T {
        return new modelType(this, data);
    }

    /**
     * Deletes the object with the given id.
     *
     * @param modelType The type of model to delete.
     * @param id The id of the object ot delete.
     * @returns An empty observable.
     */
    public deleteRecord<T extends JsonModel>(modelType: ModelType<T>, id: string): Observable<any> {
        const url = this.buildUrl(modelType);
        return this.httpClient.delete(`${url}/${id}`);
    }

    public deserializeModel<T extends JsonModel>(modelType: ModelType<T>, data: any) {
        data = this.transformSerializedNamesToPropertyNames(modelType, data);
        return new modelType(this, data);
    }

    public transformSerializedNamesToPropertyNames<T extends JsonModel>(modelType: ModelType<T>, attributes: any) {
        const serializedNameToPropertyName = this.getModelPropertyNames(modelType.prototype);
        const properties: any = {};

        Object.keys(serializedNameToPropertyName).forEach((serializedName) => {
            if (attributes && attributes[serializedName] !== null && attributes[serializedName] !== undefined) {
                properties[serializedNameToPropertyName[serializedName]] = attributes[serializedName];
            }
        });

        return properties;
    }

    protected getModelPropertyNames(model: JsonModel) {
        return Reflect.getMetadata('AttributeMapping', model) || [];
    }

    /**
     * Returns a list of objects along with meta data (i.e. total results).
     *
     * @param modelType The type of models to retrieve.
     * @param params Any parameters to include in the request (i.e. filter, sorting, etc).
     * @returns A list of objects along with meta data.
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

    protected extractQueryData<T extends JsonModel>(
        response: HttpResponse<object>,
        modelType: ModelType<T>,
        withMeta = false
    ): Array<T> | JsonApiQueryData<T> {
        const body: any = response.body;
        const models: T[] = [];

        body.data.forEach((data: any) => {
            const model: T = this.deserializeModel(modelType, data);
            // this.addToStore(model);
            models.push(model);
        });

        if (withMeta && withMeta === true) {
            return new JsonApiQueryData(models, this.parseMeta(body, modelType));
        }

        return models;
    }

    protected parseMeta(body: any, modelType: ModelType<JsonModel>): any {
        const metaModel: any = Reflect.getMetadata('JsonApiModelConfig', modelType).meta;
        return new metaModel(body);
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
        return this.httpClient.get<{ data: T }>(url, requestOptions).pipe(
            map((res: any) => this.extractRecordData(res, modelType))
        );
    }

    /**
     * Updates the given object.
     *
     * @param id The id of the object to update.
     * @param model The object to update.
     * @returns The updated object.
     */
    public updateRecord<T extends JsonModel>(
        model: T,
        transition?: string,
        params?: { [param: string]: string | string[] } 
    ): Observable<T> {
        const modelType = model.constructor as ModelType<T>;
        const requestHeaders: HttpHeaders = this.buildHttpHeaders();
        const url = this.buildUrl(modelType, '', model.id);

        const attributesMetadata: any = Reflect.getMetadata('Attribute', model);
        const data: any = this.getAttributes(attributesMetadata, model);

        let body;
        if (transition) {
            body = {
                meta: {
                    transition
                },
                data
            };
        } else {
            body = data;
        }

        return this.httpClient.put(url, body, { headers: requestHeaders, observe: 'response', params }).pipe(
            map((res: HttpResponse<object>) => {
                return [200, 201].indexOf(res.status) !== -1 ? this.extractRecordData(res, modelType, model) as T : model as T;
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
     * Creates or updates the given object based on whether the object exists
     * in the DB already. For now an object exists if it has an id property.
     * This method helps reduce logic in components so you can just call save
     * regardless of whether object exists or not.
     *
     * @param model Object to create or update.
     * @returns The new or updated object.
     */
    public saveRecord<T extends JsonModel>(
        attributesMetadata: any,
        model: T,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<T> {
        const modelType = model.constructor as ModelType<T>;
        const requestOptions: object = this.buildRequestOptions({headers, observe: 'response'});
        const url = this.buildUrl(modelType, params, model.id, customUrl);

        let httpCall: Observable<HttpResponse<object>>;
        const body: any = this.getAttributes(attributesMetadata, model);

        if (model.id) {
            httpCall = this.httpClient.patch<object>(url, body, requestOptions) as Observable<HttpResponse<object>>;
        } else {
            httpCall = this.httpClient.post<object>(url, body, requestOptions) as Observable<HttpResponse<object>>;
        }

        return httpCall.pipe(
            map((res) => [200, 201].indexOf(res.status) !== -1 ? this.extractRecordData(res, modelType, model) : model),
            catchError((res) => {
                if (res == null) {
                    return of(model);
                }
                return this.handleError(res);
            })
        );
    }

    protected extractRecordData<T extends JsonModel>(
        res: HttpResponse<object>,
        modelType: ModelType<T>,
        model?: T
    ): T {
        const body: any = res.body;
        // Error in Angular < 5.2.4 (see https://github.com/angular/angular/issues/20744)
        // null is converted to 'null', so this is temporary needed to make testcase possible
        // (and to avoid a decrease of the coverage)
        if (!body || body === 'null') {
            throw new Error('no body in response');
        }

        // if (!body.data) {
        //     if (res.status === 201 || !model) {
        //         throw new Error('expected data in response');
        //     }
        //     return model;
        // }

        if (model) {
            model.modelInitialization = true;
            model.id = body.id;
            Object.assign(model, body);
            model.modelInitialization = false;
        }

        const deserializedModel = model || this.deserializeModel(modelType, body.data);
        // this.addToStore(deserializedModel);
        // if (body.included) {
        //     deserializedModel.syncRelationships(body.data, body.included);
        //     this.addToStore(deserializedModel);
        // }

        return deserializedModel;
    }

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
}
