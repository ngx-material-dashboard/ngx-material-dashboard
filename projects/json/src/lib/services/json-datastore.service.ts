/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    JsonApiQueryData,
    JsonDatastore as BaseJsonDatastore,
    ModelType
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from '../models/json.model';

/**
 * Implements methods necessary to perform all CRUD operations as defined in
 * base-json [JsonDatastore](/base-json/overview#json-datastore). See the `json`
 * [usage](/json/readme#usage) documentation for more details on configuring and the
 * [Datastore](/json/readme#datastore) for more details on using this datastore.
 */
@Injectable()
export class JsonDatastore extends BaseJsonDatastore {
    public createRecord<T extends JsonModel>(
        modelType: ModelType<T>,
        data: Partial<T>
    ): T {
        return new modelType(this, data);
    }

    public deserializeModel<T extends JsonModel>(
        modelType: ModelType<T>,
        data: any
    ): T {
        data = this.transformSerializedNamesToPropertyNames(modelType, data);
        return new modelType(this, data);
    }

    public serializeModel(
        model: any,
        attributesMetadata: any,
        transition?: string
    ): any {
        const data: any = this.getDirtyAttributes(attributesMetadata, model);

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

        return body;
    }

    protected extractQueryData<T extends JsonModel>(
        response: HttpResponse<object>,
        modelType: ModelType<T>
    ): JsonApiQueryData<T> {
        const body: any = response.body;
        const models: T[] = [];

        body.data.forEach((data: any) => {
            const model: T = this.deserializeModel(modelType, data);
            this.addToStore(model);
            models.push(model);
        });

        return new JsonApiQueryData(models, this.parseMeta(body, modelType));
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

        const deserializedModel =
            model || this.deserializeModel(modelType, body);
        this.addToStore(deserializedModel);
        // if (body.included) {
        //     deserializedModel.syncRelationships(body.data, body.included);
        //     this.addToStore(deserializedModel);
        // }

        return deserializedModel;
    }
}
