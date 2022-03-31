import { ValidationMessage } from './validation-message.interface';

/**
 * A simple interface that represents a map of validation messages from field
 * name (i.e. the name of the field on the form where validation should occur)
 * to an array of each ValidationMessage for the field.
 */
export interface ValidationMessages {
    [field: string]: ValidationMessage[];
}
