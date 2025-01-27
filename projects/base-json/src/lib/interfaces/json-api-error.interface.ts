/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

/**
 * An error object that provides information about problems encountered while
 * performing an operation. Based on the error object as defined in the
 * [JSON:API](https://jsonapi.org/format/#error-objects) Spec. The JSON:API
 * Spec states that Error objects MUST be returned as an array keyed by errors
 * in the top level of a JSON:API document, which means the `HttpErrorResponse`
 * returned from the API should contain an array of these types of objects.
 *
 * The [JsonDatastore](/base-json/overview#json-datastore) handles parsing
 * `HttpErrorResponse`s into an `ErrorResponse` object, which contains an
 * array of `JsonApiError`s. See the documentation for the
 * [ErrorResponse](/base-json/overview#error-response) model for more details.
 */
export interface JsonApiError {
    /** A unique identifier for this particular occurrance of the problem. */
    id?: string;
    /**
     * A [links object](https://jsonapi.org/format/#document-links) containing
     * an `about` link that leads to futher details about this particular
     * occurrence of the problem.
     */
    links?: Array<any>;
    /**
     * The HTTP status code applicable to this problem, expressed as a string
     * value.
     */
    status?: string;
    /** An applicaiton-specific error code, expressed as a string value. */
    code?: string;
    /**
     * A short, human-readable summary of the problem that SHOULD NOT change
     * from occurrence to occurrence of the problem, except for purposes of
     * localization.
     */
    title?: string;
    /**
     * A human-readable explanation specific to this occurrence of the problem.
     * Like `title`, this field's value can be localized.
     */
    detail?: string;
    /**
     * An object containing references to the source of the error, optionally
     * including a JSON Pointer [[RFC6901](https://tools.ietf.org/html/rfc6901)]
     * to the associated entity in the request document [e.g. `"/data"` for a
     * primary data object, or  `"/data/attributes/title"` for a specific
     * attribute], and a `parameter` string indicating which URI query parameter
     * caused the error.
     */
    source?: {
        pointer?: string;
        parameter?: string;
    };
    /**
     * A [meta object](https://jsonapi.org/format/#document-meta) containing
     * non-standard meta-information about the error.
     */
    meta?: any;
}
