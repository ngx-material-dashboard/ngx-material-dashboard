import { HttpClient, HttpHeaders } from "@angular/common/http";
import { 
    DatastoreConfig,
    JsonApiDatastoreConfig,
    JsonApiQueryData,
    JsonDatastore,
    ModelType
} from "@ngx-material-dashboard/base-json";
import { Observable, of } from "rxjs";
import { DummyObject } from "./dummy-object.mock";

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

    constructor(http: HttpClient) {
        super();
    }

    findAll(
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

    deleteRecord(
        modelType: ModelType<any>,
        id: string,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<any> {
        return of();
    }
}
