/**
 * The JsonApiQueryData defines how the library maps JSON results to client
 * side data models when querying the server side API for lists of models.
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
