/**
 * The JsonApiQueryData defines how the library maps JSON results to client
 * side data models when querying the server side API for lists of models.
 * 
 * @overviewDetails
 * ## Basic Usage Example
 * ```typescript
 * import {JsonApiQueryData} from '@ngx-material-dashboard/base-json';
 * import {JsonModel} from './json.model';
 *
 * function readData(data: JsonApiQueryData<JsonModel>) {
 *     const data: JsonModel[] = data.getModels();
 *     const meta: any = data.getMeta();
 *     // do something with data and meta
 * }
 * ```
 */
export class JsonApiQueryData<T> {

    constructor(protected jsonApiModels: Array<T>, protected metaData?: any) {}

    /**
     * Returns the list of models included in the HTTP response.
     *
     * @returns The list of models included in the HTTP response. 
     */
    public getModels(): T[] {
        return this.jsonApiModels;
    }

    /**
     * The meta data to include with the results (i.e. total number of results).
     *
     * @returns Meta data to include with results. 
     */
    public getMeta(): any {
        return this.metaData;
    }
}
