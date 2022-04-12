import { HttpClient } from "@angular/common/http";
import { DatastoreConfig, JsonApiDatastore, JsonApiDatastoreConfig } from "@ngx-material-dashboard/json-api";
import { DummyObject } from "./dummy-object.mock";

const BASE_URL = 'http://localhost:8080/api'

@JsonApiDatastoreConfig({
    baseUrl: BASE_URL,
    models: {
        'dummy-object': DummyObject
    }
})
export class Datastore extends JsonApiDatastore {
    protected override config: DatastoreConfig = {
        baseUrl: BASE_URL,
        apiVersion: 'v1'
    };

    constructor(http: HttpClient) {
        super(http);
    }
}
