import { Injectable } from '@angular/core';
import {
    DatastoreConfig,
    JsonApiDatastoreConfig
} from '@ngx-material-dashboard/base-json';
import { JsonDatastore } from '@ngx-material-dashboard/json';

import { environment } from '../../../environments/environment';
import { Task } from '../models/task.model';
import { Priority } from '../models/priority.model';

const config: DatastoreConfig = {
    baseUrl: environment.api.baseUrl,
    models: {
        priorities: Priority,
        tasks: Task
    }
};

@Injectable()
@JsonApiDatastoreConfig(config)
export class JsonApiService extends JsonDatastore {}
