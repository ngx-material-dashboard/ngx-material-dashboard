/**
 * Functions that can be overriden in the `DatastoreConfig`.
 */
export interface Overrides {
    /**
     * Returns a map of dirty attributes.
     */
    getDirtyAttributes?: (attributedMetadata: any, model?: any) => object;
    /**
     * Returns query parameters that are formatted to be inserted into URL for
     * HTTP requests.
     */
    toQueryString?: (params: any) => string;
}
