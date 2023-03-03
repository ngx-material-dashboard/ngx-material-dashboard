/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { MetaModelType } from '../models/json-api-meta.model';

/**
 * ModelConfig defines options available for `JsonApiModelConfig` decorator.
 * Options provided here can override `DatastoreConfig` options. For example,
 * if you have certain data models that are included in a different version of
 * your API you can set that here, and the datastore should use the overriding
 * options.
 *
 * The `type` is the only required property for `JsonApiModelConfig`. All other
 * properties are optional. If only `type` is included, then that is used when
 * generating URLs for API endpoints in the `JsonDatastore`. You can use the
 * `modelEndpointUrl` property, which if included will take precedent over the
 * `type` value.
 *
 * See [JsonApiModelConfig](/base-json/overview#json-api-model-config) for
 * more details on using this interface.
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
