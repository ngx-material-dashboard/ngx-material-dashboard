import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ValidationMessage } from '../../interfaces/validation-message.interface';

/**
 * A component for rendering errors for a single form field. This simplifies
 * rendering errors on forms so you don't need to have more than one `mat-error`
 * per form field (if your fields have multiple validators). This component
 * should be rendered inside of a mat-error tag so it displays correctly below
 * a form field.
 * 
 * The component requires 3 input values, (1) the name of the field to render
 * errors for, (2) the `FormGroup` where the field is defined, (3) and an array
 * of `ValidationMessage`s which define the error messages for their respective
 * validator type. You should use the `ValidationMessages` type to define your
 * validation messages in your typescript, which is a map of field names to
 * arrays of `ValidationMessage`s. See
 * [ValidationMessages](/widgets/interfaces/validation-messages) for more
 * info about the `ValidationMessages` type.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <form [formGroup]="form" fxLayout="column" fxLayoutGap="10px">
 *     <mat-form-field fxFlex>
 *         <mat-label>Username</mat-label>
 *         <input matInput type="text" formControlName="username">
 *         <mat-error>
 *             <ngx-material-dashboard-field-error 
 *                 field='username'
 *                 [form]="form"
 *                 [validationMessages]="validationMessages.username">
 *             </ngx-material-dashboard-field-error>
 *         </mat-error>
 *     </mat-form-field>
 *     <mat-form-field fxFlex>
 *         <mat-label>Password</mat-label>
 *         <input matInput type="password" formControlName="password">
 *         <mat-error>
 *             <ngx-material-dashboard-field-error 
 *                 field='password'
 *                 [form]="form"
 *                 [validationMessages]="validationMessages.password">
 *             </ngx-material-dashboard-field-error>
 *         </mat-error>
 *     </mat-form-field>
 * </form>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {FormControl, FormGroup} from '@angular/forms';
 * import {ValidationMessages} from '@ngx-material-dashboard/widgets';
 * 
 * @Component({
 *     selector: 'field-error-basic-usage-example',
 *     templateUrl: './field-error-basic-usage-example.html'
 * }) export class FieldErrorBasicUsageExample {
 *     form: FormGroup = new FormGroup({
 *         username: new FormControl('', [Validators.required]),
 *         password: new FormControl('', [Validators.required])
 *     });
 *     validationMessages: ValidationMessages = {
 *         username: [
 *             { type: 'username', message: 'Username is required' }
 *         ],
 *         password: [
 *             { type: 'password', message: 'Password is required' }
 *         ]
 *     };
 * }
 * ```
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
