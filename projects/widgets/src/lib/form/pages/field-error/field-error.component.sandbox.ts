import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { ValidationMessage } from '../../interfaces/validation-message.interface';
import { FieldErrorComponent } from './field-error.component';

const formBuilder = new FormBuilder();
const form = formBuilder.group({
    field: [null, Validators.required]
});
const validationMessages: ValidationMessage[] = [
    { type: 'required', message: 'Field is required' }
];

export default sandboxOf(FieldErrorComponent, {
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule]
}).add('default', {
    template: `<ngx-material-dashboard-field-error [field]="field" [form]="form" [validationMessages]="validationMessages"></ngx-material-dashboard-field-error>`,
    context: {
        field: 'field',
        form: form,
        validationMessages: validationMessages
    }
});
