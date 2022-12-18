/**
 * A simple object that is used to render validation messages for field errors
 * used by the `FieldError` component. A `ValidationMessage` is defined by the
 * type of validation, and the error message associated with that type of
 * validation. The type of validation should match validation types as defined
 * in angular (i.e. required, pattern, etc.) or any custom validation.
 *
 * ## Basic Usage Example
 * ```typescript
 * import {ValidationMessage} from '@ngx-material-dashboard/widgets';
 *
 * const validationMessage: ValidationMessage = {
 *     type: 'required',
 *     message: 'This field is required'
 * };
 * ```
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
