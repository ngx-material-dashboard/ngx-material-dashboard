import { JsonApiError } from "../interfaces/json-api-error.interface";

export class ErrorResponse {
    errors?: JsonApiError[] = [];

    constructor(errors ?: JsonApiError[]) {
        if (errors) {
            this.errors = errors;
        }
    }
}
