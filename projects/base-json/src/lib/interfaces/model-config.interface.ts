import { MetaModelType } from '../models/json-api-meta.model';

/**
 * ModelConfig defines options available for {@link JsonApiModelConfig}
 * decorator. Options provided here can override datastore config options. So
 * if you have certain data models that are included in a different version of
 * your API you can set that here, and the datastore should use the overriding
 * options.
 */
export interface ModelConfig<T = any> {
    /** The type for the model (included in API endpoints). */
    type: string;
    /**
     * API version specific to the model where this is defined; should only be
     * included if different from global api version when defined in datastore
     * config.
     */
    apiVersion?: string;
    /**
     * Base URL specific to model where this is defined; should only be included
     * if different from global base URL for your JSON API.
     */
    baseUrl?: string;
    /** Model endpoint to use in URLs (if different from type). */
    modelEndpointUrl?: string;
    /** Object meta data. */
    meta?: MetaModelType<T>;
}
