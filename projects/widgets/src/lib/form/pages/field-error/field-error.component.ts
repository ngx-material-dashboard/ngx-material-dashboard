import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationMessage } from '../../interfaces/validation-message.interface';

/**
 * A component for rendering errors for a single form field. This simplifies
 * rendering errors on forms and helps DRY up code so the checkFieldError
 * method does not have to be copied into every component that needs to display
 * field errors for forms. This component should be rendered inside of a mat-error
 * tag so it displays correctly below a form field.
 */
@Component({
    selector: 'ngx-material-dashboard-field-error',
    templateUrl: './field-error.component.html',
    styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent {

    /** The name of the field the errors should be displayed for. */
    @Input() field = '';
    /**
     * The form that contains the field (defaults to new formGroup to prevent
     * errors and having to define field as nullable).
     */
    @Input() form: FormGroup = this.formBuilder.group({});
    /** The array of validation messages that correspond with the field. */
    @Input() validationMessages: ValidationMessage[] = [];

    constructor(private formBuilder: FormBuilder) {}

    /**
     * Returns true if the given field on the form has an error of the
     * given validation type.
     *
     * @param field The name of the field on the form.
     * @param validationType The type of validation (i.e. 'required', 'pattern', etc.).
     */
     checkFieldError(validationType: string): boolean {
        if (this.form.get(this.field)?.hasError(validationType)) {
            return true;
        } else {
            return false;
        }
    }
}
