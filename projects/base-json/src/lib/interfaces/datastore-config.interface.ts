import { Overrides } from './overrides.interface';

/**
 * The DatastoreConfig defines options available for the DatastoreConfig
 * decorator used when defining the datastore in your application. This is
 * where you define things like the base URL to use when making HTTP requests
 * to your server side API as well as the models you want to include with those
 * requests.
 * 
 * @overviewDetails
 * ## Basic Usage Example
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
 * included. See the [API](/base-json/interfaces/datastore-config/api) docs
 * for a list of all options available.
 */
export interface DatastoreConfig {
    /** 
     * The version for the API if you use that as part of your URL. If included
     * in configuration, then version is included after baseUrl when generating
     * URL value for API calls (i.e. `.../api/${apiVersion}/...`).
     */
    apiVersion?: string;
    /** 
     * Base URL to use when generating URLs for API calls; something like the
     * following http://localhost:8080/api.
     */
    baseUrl?: string;
    /** ContentType to use in requests (defaults to 'application/json'). */
    contentType?: string;
    /** Map of model types to model classes for models to include in JSON API. */
    models?: object;
    /** Custom overrides for getDirtyAttributes or toQueryString functions. */
    overrides?: Overrides;
}
