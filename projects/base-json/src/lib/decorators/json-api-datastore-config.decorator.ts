/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import 'reflect-metadata';

/**
 * The JsonApiDatastoreConfig decorator defines a custom class decorator that
 * should be included with the datastore service implementation included in
 * your application.
 *
 * @param config Custom options included in decorator.
 * @returns Custom class decorator for JSON datastore service.
 *
 * @overviewDetails
 * #### Basic Usage Example
 * ```typescript
 * import {JsonApiDatastoreConfig} from '@ngx-material-dashboard/base-json';
 * import {JsonDatastore} from '@ngx-material-dashboard/json';
 * import {Task} from './task.model';
 * import {User} from './user.model';
 *
 * @JsonApiDatastoreConfig({
 *     baseUrl: 'http://localhost:8080/api',
 *     models: {
 *         tasks: Task,
 *         users: User
 *     }
 * })
 * export class JsonApiService extends JsonDatastore {}
 * ```
 *
 * The example above shows the minimum properties you should include with the
 * `JsonApiDatastoreConfig` `decorator`. Additional properties can be
 * included. See the [API](/base-json/api#datastore-config) docs
 * for a list of all options available.
 */
export function JsonApiDatastoreConfig(config: any = {}): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata('JsonApiDatastoreConfig', config, target);
    };
}
