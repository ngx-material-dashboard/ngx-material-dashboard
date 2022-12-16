import { DatastoreConfig, JsonApiDatastoreConfig } from '../../src/lib';

import { JsonDatastore } from './json-datastore.service';
import { Task } from '../models/task.model';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:8080';
const API_VERSION = 'v1';

export const BASE_URL_FROM_CONFIG = 'http://localhost:8888';
export const API_VERSION_FROM_CONFIG = 'v2';

@Injectable()
@JsonApiDatastoreConfig({
    baseUrl: BASE_URL,
    apiVersion: API_VERSION,
    models: {
        tasks: Task
    }
})
export class DatastoreWithConfig extends JsonDatastore {
    protected override config: DatastoreConfig = {
        baseUrl: BASE_URL_FROM_CONFIG,
        apiVersion: API_VERSION_FROM_CONFIG
    };
}
