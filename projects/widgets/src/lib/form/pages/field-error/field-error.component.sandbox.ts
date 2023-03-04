/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import {
    UntypedFormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { ValidationMessage } from '../../interfaces/validation-message.interface';
import { FieldErrorComponent } from './field-error.component';

const formBuilder = new UntypedFormBuilder();
const form = formBuilder.group({
    field: [null, Validators.required]
});
const validationMessages: ValidationMessage[] = [
    { type: 'required', message: 'Field is required' }
];

export default sandboxOf(FieldErrorComponent, {
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule]
}).add('default', {
    template: `<ngx-mat-field-error [field]="field" [form]="form" [validationMessages]="validationMessages"></ngx-mat-field-error>`,
    context: {
        field: 'field',
        form: form,
        validationMessages: validationMessages
    }
});
