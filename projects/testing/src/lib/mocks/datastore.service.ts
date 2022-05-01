import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DatastoreConfig, JsonDatastore, JsonApiDatastoreConfig, ModelType, JsonApiQueryData } from '@ngx-material-dashboard/base-json';
import { Observable, of } from 'rxjs';
import { DummyObject } from './dummy-object.mock';

const BASE_URL = 'http://localhost:8080/api'

@JsonApiDatastoreConfig({
    baseUrl: BASE_URL,
    models: {
        'dummy-object': DummyObject
    }
})
export class Datastore extends JsonDatastore {
    protected override config: DatastoreConfig = {
        baseUrl: BASE_URL,
        apiVersion: 'v1'
    };

    public override findAll(
        modelType: ModelType<any>,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<JsonApiQueryData<any>> {
        return of(new JsonApiQueryData([]));
    }

    createRecord(modelType: ModelType<any>, data?: any): any {
        return new modelType(data);
    }

    public override deleteRecord(
        modelType: ModelType<any>,
        id: string,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<any> {
        return of();
    }

    public override saveRecord(
        attributesMetadata: any,
        model: any,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<any> {
        return of(model);
    }

    deserializeModel(modelType: ModelType<any>, data: any) {
        data = this.transformSerializedNamesToPropertyNames(modelType, data);
        return new modelType(this, data);
    }

    serializeModel(model: any, attributesMetadata: any, transition?: string, includeRelationships?: boolean) {
        
    }

    protected extractQueryData(response: HttpResponse<object>, modelType: ModelType<any>, withMeta?: boolean): any[] | JsonApiQueryData<any> {
        return [];
    }

    protected extractRecordData(res: HttpResponse<object>, modelType: ModelType<any>, model?: any) {
        
    }
}
