/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

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
