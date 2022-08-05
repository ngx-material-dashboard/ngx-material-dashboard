import { JsonApiDatastoreConfig } from '../../src/lib';

import { JsonDatastore } from './json-datastore.service';
import { Task } from '../models/task.model';

export const BASE_URL = 'http://localhost:8080';
export const API_VERSION = 'v1';

@JsonApiDatastoreConfig({
    baseUrl: BASE_URL,
    apiVersion: API_VERSION,
    models: {
        tasks: Task
    }
})
export class Datastore extends JsonDatastore {}
