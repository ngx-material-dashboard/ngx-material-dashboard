import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {
    AttributeMetadata,
    JsonApiQueryData,
    JsonDatastore,
    ModelConfig,
    ModelType
} from '@ngx-material-dashboard/base-json';
import { find } from 'lodash-es';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import 'reflect-metadata';

import { JsonApiModel } from '../models/json-api.model';

const AttributeMetadataIndex: string = AttributeMetadata as any;

/**
 * Implements methods necessary to perform all CRUD operations as defined in
 * base-json [JsonDatastore](/base-json/services/json-datastore). See the
 * `json-api` [usage](/json-api#usage) documentation for more details on
 * configuring and the [Datastore](/json-api#datastore) for more details on
 * using this datastore.
 */
@Injectable()
export class JsonApiDatastore extends JsonDatastore {
    public createRecord<T extends JsonApiModel>(
        modelType: ModelType<T>,
        data?: any
    ): T {
        return new modelType(this, { attributes: data });
    }

    // override default implementation to include call to updateRelationships
    // since that is not done by default
    public override saveRecord<T extends JsonApiModel>(
        attributesMetadata: any,
        model: T,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<T> {
        return super
            .saveRecord(attributesMetadata, model, params, headers, customUrl)
            .pipe(
                map((res) =>
                    this.updateRelationships(res, this.getRelationships(model))
                )
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

        const body: any = this.serializeModel(
            model,
            model[AttributeMetadataIndex],
            undefined,
            true
        );
        body.meta = meta;

        const httpCall: Observable<HttpResponse<object>> =
            this.httpClient.post<object>(url, body, {
                observe: 'response'
            }) as Observable<HttpResponse<object>>;
        return httpCall.pipe(
            map((res) =>
                [200, 201].indexOf(res.status) !== -1
                    ? this.extractRecordData(res, modelType, model)
                    : model
            ),
            catchError((res) => {
                if (res == null) {
                    return of(model);
                }
                return this.handleError(res);
            }),
            map((res) => this.updateRelationships(res, relationships))
        );
    }

    public deserializeModel<T extends JsonApiModel>(
        modelType: ModelType<T>,
        data: any
    ): T {
        data.attributes = this.transformSerializedNamesToPropertyNames(
            modelType,
            data.attributes
        );
        return new modelType(this, data);
    }

    public serializeModel(
        model: any,
        attributesMetadata: any,
        transition?: string,
        includeRelationships?: boolean
    ): any {
        const modelConfig: ModelConfig = model.modelConfig;
        const typeName: string = modelConfig.type;
        const relationships: any = this.getRelationships(model);

        let body: any;
        if (includeRelationships) {
            // create data with relationships
            body = {
                data: {
                    relationships,
                    type: typeName,
                    id: model.id,
                    attributes: this.getDirtyAttributes(
                        attributesMetadata,
                        model
                    )
                }
            };
        } else {
            // create data with just attributes
            body = {
                data: {
                    type: typeName,
                    id: model.id,
                    attributes: this.getDirtyAttributes(
                        attributesMetadata,
                        model
                    )
                }
            };
        }

        // add the meta data to the body if included
        if (transition) {
            body.meta = {
                transition
            };
        }

        return body;
    }

    protected getRelationships(data: any): any {
        let relationships: any;

        const belongsToMetadata: any[] =
            Reflect.getMetadata('BelongsTo', data) || [];
        const hasManyMetadata: any[] =
            Reflect.getMetadata('HasMany', data) || [];

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (data[key] instanceof JsonApiModel) {
                    relationships = relationships || {};

                    if (data[key].id) {
                        const entity = belongsToMetadata.find(
                            (it: any) => it.propertyName === key
                        );
                        const relationshipKey = entity.relationship;
                        relationships[relationshipKey] = {
                            data: this.buildSingleRelationshipData(data[key])
                        };
                    }
                } else if (data[key] instanceof Array) {
                    const entity = hasManyMetadata.find(
                        (it: any) => it.propertyName === key
                    );
                    if (entity && this.isValidToManyRelation(data[key])) {
                        relationships = relationships || {};

                        const relationshipKey = entity.relationship;
                        const relationshipData = data[key]
                            .filter((model: JsonApiModel) => model.id)
                            .map((model: JsonApiModel) =>
                                this.buildSingleRelationshipData(model)
                            );

                        relationships[relationshipKey] = {
                            data: relationshipData
                        };
                    }
                } else if (data[key] === null) {
                    const entity = belongsToMetadata.find(
                        (entity: any) => entity.propertyName === key
                    );

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
        const isJsonApiModel = objects.every(
            (item) => item instanceof JsonApiModel
        );
        if (!isJsonApiModel) {
            return false;
        }
        const types = objects.map(
            (item: JsonApiModel) =>
                item.modelConfig.modelEndpointUrl || item.modelConfig.type
        );
        return (
            types.filter(
                (type: string, index: number, self: string[]) =>
                    self.indexOf(type) === index
            ).length === 1
        );
    }

    protected buildSingleRelationshipData(model: JsonApiModel): any {
        const relationshipType: string = model.modelConfig.type;
        const relationShipData: {
            type: string;
            id?: string;
            attributes?: any;
        } = { type: relationshipType };

        if (model.id) {
            relationShipData.id = model.id;
        } else {
            const attributesMetadata: any = Reflect.getMetadata(
                'Attribute',
                model
            );
            relationShipData.attributes = this.getDirtyAttributes(
                attributesMetadata,
                model
            );
        }

        return relationShipData;
    }

    protected extractQueryData<T extends JsonApiModel>(
        response: HttpResponse<object>,
        modelType: ModelType<T>
    ): JsonApiQueryData<T> {
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

        return new JsonApiQueryData(models, this.parseMeta(body, modelType));
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

        const deserializedModel =
            model || this.deserializeModel(modelType, body.data);
        this.addToStore(deserializedModel);
        if (body.included) {
            deserializedModel.syncRelationships(body.data, body.included);
            this.addToStore(deserializedModel);
        }

        return deserializedModel;
    }

    protected updateRelationships<T extends JsonApiModel>(
        model: T,
        relationships: any
    ): T {
        const modelsTypes: any = Reflect.getMetadata(
            'JsonApiDatastoreConfig',
            this.constructor
        ).models;

        for (const relationship in relationships) {
            if (
                Object.prototype.hasOwnProperty.call(
                    relationships,
                    relationship
                ) &&
                Object.prototype.hasOwnProperty.call(model, relationship) &&
                model[relationship]
            ) {
                const relationshipModel: JsonApiModel = model[relationship];
                const hasMany: any[] = Reflect.getMetadata(
                    'HasMany',
                    relationshipModel
                );
                const propertyHasMany: any = find(hasMany, (property: any) => {
                    return (
                        modelsTypes[property.relationship] === model.constructor
                    );
                });

                if (propertyHasMany) {
                    relationshipModel[propertyHasMany.propertyName] =
                        relationshipModel[propertyHasMany.propertyName] || [];

                    const indexOfModel =
                        relationshipModel[propertyHasMany.propertyName].indexOf(
                            model
                        );

                    if (indexOfModel === -1) {
                        relationshipModel[propertyHasMany.propertyName].push(
                            model
                        );
                    } else {
                        relationshipModel[propertyHasMany.propertyName][
                            indexOfModel
                        ] = model;
                    }
                }
            }
        }

        return model;
    }
}
