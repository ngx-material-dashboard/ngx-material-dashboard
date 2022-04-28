import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import {
    AttributeMetadata,
    DatastoreConfig,
    JsonApiQueryData,
    JsonDatastore,
    ModelConfig,
    ModelType
} from '@ngx-material-dashboard/base-json';
import { find } from 'lodash-es';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import 'reflect-metadata';

import { JsonApiModel } from '../models/json-api.model';

/**
 * HACK/FIXME:
 * Type 'symbol' cannot be used as an index type.
 * TypeScript 2.9.x
 * See https://github.com/Microsoft/TypeScript/issues/24587.
 */
// tslint:disable-next-line:variable-name
const AttributeMetadataIndex: string | symbol = AttributeMetadata as any;

@Injectable()
export class JsonApiDatastore extends JsonDatastore {

    protected override config!: DatastoreConfig;
    // private internalStore: { [type: string]: { [id: string]: JsonApiModel } } = {};

    constructor(protected http: HttpClient) {
        super();
    }

    private get getDirtyAttributes() {
        if (this.datastoreConfig.overrides
            && this.datastoreConfig.overrides.getDirtyAttributes
        ) {
            return this.datastoreConfig.overrides.getDirtyAttributes;
        }
        return JsonApiDatastore.getDirtyAttributes;
    }

    private static getDirtyAttributes(attributesMetadata: any): { string: any } {
        const dirtyData: any = {};

        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                const metadata: any = attributesMetadata[propertyName];

                if (metadata.hasDirtyAttributes) {
                    const attributeName = metadata.serializedName != null ? metadata.serializedName : propertyName;
                    dirtyData[attributeName] = metadata.serialisationValue ? metadata.serialisationValue : metadata.newValue;
                }
            }
        }

        return dirtyData;
    }

    public findAll<T extends JsonApiModel>(
        modelType: ModelType<T>,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<JsonApiQueryData<T>> {
        const url: string = this.buildUrl(modelType, params, undefined, customUrl);
        const requestOptions: object = this.buildRequestOptions({headers, observe: 'response'});

        return this.http.get(url, requestOptions)
        .pipe(
            map((res: any) => this.extractQueryData(res, modelType, true) as JsonApiQueryData<T>),
            catchError((res: any) => this.handleError(res))
        );
    }

    public findRecord<T extends JsonApiModel>(
        modelType: ModelType<T>,
        id: string,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<T> {
        const requestOptions: object = this.buildRequestOptions({headers, observe: 'response'});
        const url: string = this.buildUrl(modelType, params, id, customUrl);

        return this.http.get(url, requestOptions)
        .pipe(
            map((res: any) => this.extractRecordData(res, modelType)),
            catchError((res: any) => this.handleError(res))
        );
    }

    public createRecord<T extends JsonApiModel>(modelType: ModelType<T>, data?: any): T {
        return new modelType(this, {attributes: data});
    }

    public saveRecord<T extends JsonApiModel>(
        attributesMetadata: any,
        model: T,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<T> {
        const modelType = model.constructor as ModelType<T>;
        const modelConfig: ModelConfig = model.modelConfig;
        const typeName: string = modelConfig.type;
        const relationships: any = this.getRelationships(model);
        const url: string = this.buildUrl(modelType, params, model.id, customUrl);

        let httpCall: Observable<HttpResponse<object>>;
        const body: any = {
            data: {
                relationships,
                type: typeName,
                id: model.id,
                attributes: this.getDirtyAttributes(attributesMetadata, model)
            }
        };

        const requestOptions: object = this.buildRequestOptions({headers, observe: 'response'});

        if (model.id) {
            httpCall = this.http.patch<object>(url, body, requestOptions) as Observable<HttpResponse<object>>;
        } else {
            httpCall = this.http.post<object>(url, body, requestOptions) as Observable<HttpResponse<object>>;
        }

        return httpCall
        .pipe(
            map((res) => [200, 201].indexOf(res.status) !== -1 ? this.extractRecordData(res, modelType, model) : model),
            catchError((res) => {
                if (res == null) {
                    return of(model);
                }
                return this.handleError(res);
            }),
            map((res) => this.updateRelationships(res, relationships))
        );
    }

    /**
     * Helper method to create a model with "meta" data included in the
     * request payload.
     *
     * @param model The model to create.
     * @param params The params to pass in the URL (i.e. includes).
     * @param meta The meta data to include in the request payload.
     */
     public saveRecordWithMetaData<T extends JsonApiModel>(
        model: T,
        params: { [param: string]: string },
        meta: { [param: string]: string }
    ): Observable<T> {
        const modelType = <ModelType<T>>model.constructor;
        const modelConfig: ModelConfig = model.modelConfig;
        const typeName: string = modelConfig.type;
        const relationships: any = this.getRelationships(model);
        const url: string = this.buildUrl(modelType, params);

        let httpCall: Observable<HttpResponse<object>>;
        const body: any = {
            meta: meta,
            data: {
                relationships,
                type: typeName,
                id: model.id
            }
        };

        httpCall = this.http.post<object>(url, body, { observe: 'response' }) as Observable<HttpResponse<object>>;
        return httpCall.pipe(
            map((res) => [200, 201].indexOf(res.status) !== -1 ? this.extractRecordData(res, modelType, model) : model),
            catchError((res) => {
                if (res == null) {
                    return of(model);
                }
                return this.handleError(res);
            }),
            map((res) => this.updateRelationships(res, relationships))
        );
    }

    public deleteRecord<T extends JsonApiModel>(
        modelType: ModelType<T>,
        id: string,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<any> {
        const requestOptions: object = this.buildRequestOptions({headers});
        const url: string = this.buildUrl(modelType, null, id, customUrl);

        return this.http.delete(url, requestOptions)
        .pipe(
            catchError((res: HttpErrorResponse) => this.handleError(res))
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

    public deserializeModel<T extends JsonApiModel>(modelType: ModelType<T>, data: any): T {
        data.attributes = this.transformSerializedNamesToPropertyNames(modelType, data.attributes);
        return new modelType(this, data);
    }

    /**
     * Updates the given model using the given transition. The code below is a modification
     * of the saveRecord method. This allows for more control when updating an object through
     * the API like adding meta data as well as controlling whether Relationships should be 
     * included. Not all relationships on objects are writable, and if they are included in 
     * the body of the request, then a 400 error is thrown.
     *
     * TODO see about refactoring and combining this method with saveRecordWithMetaData
     * method defined above.
     * 
     * @param model The object to update.
     * @param transition The transition defined by the API.
     * @param params Paramaters to include in the request.
     * @param includeRelationships Boolean to indicate if relationships should be included (defaults to false i.e. excluded)
     */
     updateRecord<T extends JsonApiModel>(
        model: JsonApiModel,
        transition?: string,
        params?: { [param: string]: string | string[] },
        includeRelationships?: boolean
    ): Observable<T> {
        // setup basic info for request (taken directly from saveRecord)
        const modelType = model.constructor as ModelType<T>;
        const modelConfig: ModelConfig = model.modelConfig;
        const typeName: string = modelConfig.type;
        const requestHeaders: HttpHeaders = this.buildHttpHeaders();
        const relationships: any = this.getRelationships(model);
        const url: string = this.buildUrl(modelType, '', model.id);

        // the model data to include in the request body
        const attributesMetadata: any = Reflect.getMetadata('Attribute', model);
        const data: any = {
            type: typeName,
            id: model.id,
            attributes: this.getDirtyAttributes(attributesMetadata, model)
        };
        // add the relationships to the data if they should be included
        if (includeRelationships) {
            // TODO update to only include writable relationships
            data.relationships = relationships;
        }

        // the request body with model data
        const body: any = {
            data
        };
        // add the meta data to the body if included
        if (transition) {
            body.meta = {
                transition
            };
        }

        // send the PATCH request
        const httpPatch = this.http.patch(url, body, { headers: requestHeaders, observe: 'response', params });
        return httpPatch.pipe(
            map((res: HttpResponse<object>) => {
                    return [200, 201].indexOf(res.status) !== -1 ? this.extractRecordData(res, modelType, model) as T : model as T;
            }),
            catchError((res) => {
                if (res == null) {
                    return of(model);
                }

                return this.handleError(res);
            })
            // TODO update relationships? this is in saveRecord
            // map((res) => this.updateRelationships(res, relationships))
        );
    }

    protected getRelationships(data: any): any {
        let relationships: any;

        const belongsToMetadata: any[] = Reflect.getMetadata('BelongsTo', data) || [];
        const hasManyMetadata: any[] = Reflect.getMetadata('HasMany', data) || [];

        for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key] instanceof JsonApiModel) {
                relationships = relationships || {};

                if (data[key].id) {
                    const entity = belongsToMetadata.find((it: any) => it.propertyName === key);
                    const relationshipKey = entity.relationship;
                    relationships[relationshipKey] = {
                        data: this.buildSingleRelationshipData(data[key])
                    };
                }
            } else if (data[key] instanceof Array) {
                const entity = hasManyMetadata.find((it: any) => it.propertyName === key);
                if (entity && this.isValidToManyRelation(data[key])) {
                    relationships = relationships || {};

                    const relationshipKey = entity.relationship;
                    const relationshipData = data[key]
                    .filter((model: JsonApiModel) => model.id)
                    .map((model: JsonApiModel) => this.buildSingleRelationshipData(model));

                    relationships[relationshipKey] = {
                        data: relationshipData
                    };
                }
            }  else if (data[key] === null) {
                const entity = belongsToMetadata.find((entity: any) => entity.propertyName === key);

                if (entity) {
                    relationships = relationships || {};

                    relationships[entity.relationship] = {
                    data: null
                    };
                }
            }
        }
        }

        return relationships;
    }

    protected isValidToManyRelation(objects: Array<any>): boolean {
        if (!objects.length) {
            return true;
        }
        const isJsonApiModel = objects.every((item) => item instanceof JsonApiModel);
        if (!isJsonApiModel) {
            return false;
        }
        const types = objects.map((item: JsonApiModel) => item.modelConfig.modelEndpointUrl || item.modelConfig.type);
        return types
        .filter((type: string, index: number, self: string[]) => self.indexOf(type) === index)
        .length === 1;
    }

    protected buildSingleRelationshipData(model: JsonApiModel): any {
        const relationshipType: string = model.modelConfig.type;
        const relationShipData: { type: string, id?: string, attributes?: any } = {type: relationshipType};

        if (model.id) {
            relationShipData.id = model.id;
        } else {
            const attributesMetadata: any = Reflect.getMetadata('Attribute', model);
            relationShipData.attributes = this.getDirtyAttributes(attributesMetadata, model);
        }

        return relationShipData;
    }

    protected extractQueryData<T extends JsonApiModel>(
        response: HttpResponse<object>,
        modelType: ModelType<T>,
        withMeta = false
    ): Array<T> | JsonApiQueryData<T> {
        const body: any = response.body;
        const models: T[] = [];

        body.data.forEach((data: any) => {
            const model: T = this.deserializeModel(modelType, data);
            this.addToStore(model);

            if (body.included) {
                model.syncRelationships(data, body.included.concat(data));
                this.addToStore(model);
            }

            models.push(model);
        });

        if (withMeta && withMeta === true) {
            return new JsonApiQueryData(models, this.parseMeta(body, modelType));
        }

        return models;
    }

    protected extractRecordData<T extends JsonApiModel>(
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

        if (!body.data) {
            if (res.status === 201 || !model) {
                throw new Error('expected data in response');
            }
            return model;
        }

        if (model) {
            model.modelInitialization = true;
            model.id = body.data.id;
            Object.assign(model, body.data.attributes);
            model.modelInitialization = false;
        }

        const deserializedModel = model || this.deserializeModel(modelType, body.data);
        this.addToStore(deserializedModel);
        if (body.included) {
            deserializedModel.syncRelationships(body.data, body.included);
            this.addToStore(deserializedModel);
        }

        return deserializedModel;
    }

    /**
     * @deprecated use buildHttpHeaders method to build request headers
     */
    protected getOptions(customHeaders?: HttpHeaders): any {
        return {
            headers: this.buildHttpHeaders(customHeaders),
        };
    }

    protected resetMetadataAttributes<T extends JsonApiModel>(res: T, attributesMetadata: any, modelType: ModelType<T>) {
        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                const metadata: any = attributesMetadata[propertyName];

                if (metadata.hasDirtyAttributes) {
                    metadata.hasDirtyAttributes = false;
                }
            }
        }

        // @ts-ignore
        res[AttributeMetadataIndex] = attributesMetadata;
        return res;
    }

    protected updateRelationships<T extends JsonApiModel>(model: T, relationships: any): T {
        const modelsTypes: any = Reflect.getMetadata('JsonApiDatastoreConfig', this.constructor).models;

        for (const relationship in relationships) {
            if (relationships.hasOwnProperty(relationship) && model.hasOwnProperty(relationship) && model[relationship]) {
                const relationshipModel: JsonApiModel = model[relationship];
                const hasMany: any[] = Reflect.getMetadata('HasMany', relationshipModel);
                const propertyHasMany: any = find(hasMany, (property: any) => {
                    return modelsTypes[property.relationship] === model.constructor;
                });

                if (propertyHasMany) {
                    relationshipModel[propertyHasMany.propertyName] = relationshipModel[propertyHasMany.propertyName] || [];

                    const indexOfModel = relationshipModel[propertyHasMany.propertyName].indexOf(model);

                    if (indexOfModel === -1) {
                        relationshipModel[propertyHasMany.propertyName].push(model);
                    } else {
                        relationshipModel[propertyHasMany.propertyName][indexOfModel] = model;
                    }
                }
            }
        }

        return model;
    }
}
