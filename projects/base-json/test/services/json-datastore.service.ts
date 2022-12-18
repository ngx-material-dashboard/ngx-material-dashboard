import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
    JsonApiQueryData,
    JsonDatastore as BaseJsonDatastore,
    ModelType
} from '../../src/lib';
import { JsonModel } from '../models/json.model';

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

        const body = data;
        body.id = model.id;

        if (transition) {
            body.meta = {
                transition
            };
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

        if (model) {
            model.modelInitialization = true;
            model.id = body.id;
            Object.assign(model, body);
            model.modelInitialization = false;
        }

        const deserializedModel =
            model || this.deserializeModel(modelType, body);
        this.addToStore(deserializedModel);

        return deserializedModel;
    }
}
