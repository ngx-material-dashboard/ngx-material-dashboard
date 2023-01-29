import { JsonApiError } from '../interfaces/json-api-error.interface';

/**
 * An array of error objects that provide information about problems encountered
 * while performing an operation. This is used by the
 * [JsonDatastore](/base-json/services/json-datastore) to handle errors that
 * occur on the server.
 *
 * If the server returns a `HttpErrorResponse` that follows the
 * [JSON:API](https://jsonapi.org/format/#error-objects) Spec format for error
 * responses, the `JsonDatastore` parses the response and creates an
 * `ErrorResponse` object that is then thrown so you can handle rendering the
 * error message for your users. If the `HttpErrorResponse` does not follow the
 * [JSON:API] spec format, then the error response is thrown as is. This means
 * that even if your server API does not follow the [JSON:API] spec, you should
 * still be able to handle error responses from your server; you will just have
 * to handle the logic to parse the error response yourself.
 *
 * @overviewDetails
 * #### Basic Usage Example
 * ```typescript
 * protected handleError(error: any): Observable<any> {
 *     if (
 *         error instanceof HttpErrorResponse &&
 *         error.error instanceof Object &&
 *         error.error.errors &&
 *         error.error.errors instanceof Array
 *     ) {
 *         // create the ErrorResponse if it follows JSON:API spec format
 *         const errors: ErrorResponse = new ErrorResponse(error.error.errors);
 *         // throw the ErrorResponse so you can render error to users
 *         return throwError(() => errors);
 *     }
 *
 *     // the error response doesn't follow JSON:API spec format, so just
 *     // throw as is; you will need to handle parsing response yourself
 *     return throwError(() => error);
 * }
 * ```
 *
 * > NOTE: The above example comes straight from the `JsonDatastore`.
 */
export class ErrorResponse {
    /**
     * The array of errors that provide information about problems encountered
     * while performing an operation.
     */
    errors?: JsonApiError[] = [];

    constructor(errors?: JsonApiError[]) {
        if (errors) {
            this.errors = errors;
        }
    }
}
