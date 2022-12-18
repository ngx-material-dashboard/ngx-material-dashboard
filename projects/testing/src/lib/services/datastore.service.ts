import { JsonApiDatastoreConfig } from '@ngx-material-dashboard/base-json';

import { JsonDatastore } from './json-datastore.service';
import { Task } from '../models/task.model';
import { Injectable } from '@angular/core';

export const BASE_URL = 'http://localhost:8080';
export const API_VERSION = 'v1';

@Injectable()
@JsonApiDatastoreConfig({
    baseUrl: BASE_URL,
    apiVersion: API_VERSION,
    models: {
        tasks: Task
    }
})
export class Datastore extends JsonDatastore {}
