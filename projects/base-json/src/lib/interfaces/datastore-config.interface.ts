import { Overrides } from './overrides.interface';

/**
 * The DatastoreConfig defines options available for the DatastoreConfig
 * decorator used when defining the datastore in your application.
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