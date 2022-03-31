/**
 * A simple interface that represents a validation type and custom error message.
 */
export interface ValidationMessage {
    /**
     * The type of validation; should match validation types as defined in
     * in angular (i.e. required, pattern, etc.) or any custom validation
     * type created.
     */
    type: string;
    /**
     * The custom error message to display to the user for the type of
     * validation.
     */
    message: string;
}
