```typescript
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    JsonApiQueryData,
    JsonDatastore as BaseJsonDatastore,
    ModelType
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from '../models/json.model';

@Injectable()
export class JsonDatastore extends BaseJsonDatastore {

    constructor(protected override httpClient: HttpClient) {
        super();
    }

    public deserializeModel<T extends JsonModel>(modelType: ModelType<T>, data: any): T {
        data = this.transformSerializedNamesToPropertyNames(modelType, data);
        return new modelType(this, data);
    }

    public serializeModel(model: any, attributesMetadata: any, transition?: string): any {
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
        modelType: ModelType<T>,
        withMeta = false
    ): Array<T> | JsonApiQueryData<T> {
        const body: any = response.body;
        const models: T[] = [];

        body.data.forEach((data: any) => {
            const model: T = this.deserializeModel(modelType, data);
            models.push(model);
        });

        if (withMeta && withMeta === true) {
            return new JsonApiQueryData(models, this.parseMeta(body, modelType));
        }

        return models;
    }

    protected extractRecordData<T extends JsonModel>(
        res: HttpResponse<object>,
        modelType: ModelType<T>,
        model?: T
    ): T {
        const body: any = res.body;

        if (model) {
            model.modelInitialization = true;
            model.id = body.id;
            Object.assign(model, body);
            model.modelInitialization = false;
        }

        const deserializedModel = model || this.deserializeModel(modelType, body.data);
        return deserializedModel;
    }
}
```
