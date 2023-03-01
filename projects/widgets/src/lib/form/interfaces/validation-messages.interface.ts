/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { ValidationMessage } from './validation-message.interface';

/**
 * A simple interface that represents a map of validation messages from field
 * name (i.e. the name of the field on the form where validation should occur)
 * to an array of each ValidationMessage for the field. This can be used any
 * place you define forms that require validation. See
 * [FieldError](/widgets/components/field-error) for more details on where you
 * can use objects of this type.
 *
 * #### Basic Usage Example
 * ```typescript
 * import {ValidationMessages} from '@ngx-material-dashboard/widgets';
 *
 * const validationMessages: ValidationMessage = {
 *     username: [
 *         { type: 'required', message: 'Username is required' }
 *     ],
 *     password: [
 *         { type: 'required', message: 'Password is required' }
 *     ]
 * };
 * ```
 */
export interface ValidationMessages {
    /**
     * A map of a field name to list of `ValidationMessage`s associated with
     * that field.
     */
    [field: string]: ValidationMessage[];
}
