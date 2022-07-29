/**
 * Functions that can be overriden in the `DatastoreConfig`. Currently you can
 * override the `getDirtyAttributes` and `toQueryString` functions. This option
 * was in the [angular2-jsonapi](https://github.com/ghidoz/angular2-jsonapi)
 * library, so I just kept it here.
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
