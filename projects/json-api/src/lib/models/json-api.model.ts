import { JsonModel, ModelType } from '@ngx-material-dashboard/base-json';
import { find, includes } from 'lodash-es';
import * as _ from 'lodash-es';

import { JsonApiDatastore } from '../services/json-api-datastore.service';

/**
 * The `JsonApiModel` defines how to initialize all your client side data models
 * and includes the ability to define and track to-one and to-many relationships
 * as defined in the json:api specification. All of your client side data models
 * should extend this class.
 *
 * ### Basic Usage Example
 * ```typescript
 * import {Attribute, JsonApiModelConfig} from '@ngx-material-dashboard/base-json';
 * import {BelongsTo, JsonApiModel} from '@ngx-material-dashboard/json-api';
 * import {User} from './user';
 *
 * @JsonApiModelConfig({
 *     type: 'tasks'
 * })
 * export class Task extends JsonApiModel {
 *     @Attribute() name?: string;
 *     @Attribute() dueDate?: string;
 *     @BelongsTo() user?: User;
 * }
 * ```
 */
export class JsonApiModel extends JsonModel {
    lastSyncModels: Array<any> = [];

    constructor(internalDatastore: JsonApiDatastore, data?: any) {
        super(internalDatastore);

        if (data) {
            this.modelInitialization = true;
            this.id = data.id;
            Object.assign(this, data.attributes);
            this.modelInitialization = false;
        }
    }

    public syncRelationships(
        data: any,
        included: any,
        remainingModels?: Array<any>
    ): void {
        if (this.lastSyncModels === included) {
            return;
        }

        if (data) {
            let modelsForProcessing = remainingModels;

            if (modelsForProcessing === undefined) {
                modelsForProcessing = [].concat(included);
            }

            this.parseHasMany(data, included, modelsForProcessing);
            this.parseBelongsTo(data, included, modelsForProcessing);
        }

        this.lastSyncModels = included;
    }

    private parseHasMany(
        data: any,
        included: any,
        remainingModels: Array<any>
    ): void {
        const hasMany: any = Reflect.getMetadata('HasMany', this);

        if (hasMany) {
            for (const metadata of hasMany) {
                const relationship: any = data.relationships
                    ? data.relationships[metadata.relationship]
                    : null;

                if (
                    relationship &&
                    relationship.data &&
                    Array.isArray(relationship.data)
                ) {
                    let allModels: JsonApiModel[] = [];
                    const modelTypesFetched: any = [];

                    for (const typeIndex of Object.keys(relationship.data)) {
                        const typeName: string =
                            relationship.data[typeIndex].type;

                        if (!includes(modelTypesFetched, typeName)) {
                            modelTypesFetched.push(typeName);
                            // tslint:disable-next-line:max-line-length
                            const modelType: ModelType<this> =
                                Reflect.getMetadata(
                                    'JsonApiDatastoreConfig',
                                    this.internalDatastore.constructor
                                ).models[typeName];

                            if (modelType) {
                                const relationshipModels: JsonApiModel[] =
                                    this.getHasManyRelationship(
                                        modelType,
                                        relationship.data,
                                        included,
                                        typeName,
                                        remainingModels
                                    );

                                if (relationshipModels.length > 0) {
                                    allModels =
                                        allModels.concat(relationshipModels);
                                }
                            } else {
                                throw {
                                    message: `parseHasMany - Model type for relationship ${typeName} not found.`
                                };
                            }
                        }
                    }

                    this[metadata.propertyName] = allModels;
                }
            }
        }
    }

    private parseBelongsTo(
        data: any,
        included: Array<any>,
        remainingModels: Array<any>
    ): void {
        const belongsTo: any = Reflect.getMetadata('BelongsTo', this);

        if (belongsTo) {
            for (const metadata of belongsTo) {
                const relationship: any = data.relationships
                    ? data.relationships[metadata.relationship]
                    : null;
                if (relationship && relationship.data) {
                    const dataRelationship: any =
                        relationship.data instanceof Array
                            ? relationship.data[0]
                            : relationship.data;
                    if (dataRelationship) {
                        const typeName: string = dataRelationship.type;
                        // tslint:disable-next-line:max-line-length
                        const modelType: ModelType<this> = Reflect.getMetadata(
                            'JsonApiDatastoreConfig',
                            this.internalDatastore.constructor
                        ).models[typeName];

                        if (modelType) {
                            const relationshipModel =
                                this.getBelongsToRelationship(
                                    modelType,
                                    dataRelationship,
                                    included,
                                    typeName,
                                    remainingModels
                                );

                            if (relationshipModel) {
                                this[metadata.propertyName] = relationshipModel;
                            }
                        } else {
                            throw {
                                message: `parseBelongsTo - Model type for relationship ${typeName} not found.`
                            };
                        }
                    }
                }
            }
        }
    }

    private getHasManyRelationship<T extends JsonApiModel>(
        modelType: ModelType<T>,
        data: any,
        included: any,
        typeName: string,
        remainingModels: Array<any>
    ): Array<T> {
        const relationshipList: Array<T> = [];

        data.forEach((item: any) => {
            const relationshipData: any = find(included, {
                id: item.id,
                type: typeName
            } as any);

            if (relationshipData) {
                const newObject: T = this.createOrPeek(
                    modelType,
                    relationshipData
                );

                const indexOfNewlyFoundModel =
                    remainingModels.indexOf(relationshipData);
                const modelsForProcessing = remainingModels.concat([]);

                if (indexOfNewlyFoundModel !== -1) {
                    modelsForProcessing.splice(indexOfNewlyFoundModel, 1);
                    newObject.syncRelationships(
                        relationshipData,
                        included,
                        modelsForProcessing
                    );
                }

                relationshipList.push(newObject);
            }
        });

        return relationshipList;
    }

    private getBelongsToRelationship<T extends JsonApiModel>(
        modelType: ModelType<T>,
        data: any,
        included: Array<any>,
        typeName: string,
        remainingModels: Array<any>
    ): T | null {
        const id: string = data.id;

        const relationshipData: any = find(included, {
            id,
            type: typeName
        } as any);

        if (relationshipData) {
            const newObject: T = this.createOrPeek(modelType, relationshipData);

            const indexOfNewlyFoundModel =
                remainingModels.indexOf(relationshipData);
            const modelsForProcessing = remainingModels.concat([]);

            if (indexOfNewlyFoundModel !== -1) {
                modelsForProcessing.splice(indexOfNewlyFoundModel, 1);
                newObject.syncRelationships(
                    relationshipData,
                    included,
                    modelsForProcessing
                );
            }

            return newObject;
        }

        return this.internalDatastore.peekRecord(modelType, id);
    }

    private createOrPeek<T extends JsonApiModel>(
        modelType: ModelType<T>,
        data: any
    ): T {
        const peek = this.internalDatastore.peekRecord(modelType, data.id);

        if (peek) {
            _.extend(
                peek,
                this.internalDatastore.transformSerializedNamesToPropertyNames(
                    modelType,
                    data.attributes
                )
            );
            return peek;
        }

        const newObject: T = this.internalDatastore.deserializeModel(
            modelType,
            data
        );
        this.internalDatastore.addToStore(newObject);

        return newObject;
    }
}
