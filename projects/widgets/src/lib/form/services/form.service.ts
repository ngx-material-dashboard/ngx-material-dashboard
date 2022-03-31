import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

/**
 * A simple service that provides convenience methods for forms.
 */
@Injectable({
    providedIn: 'root'
})
export class FormService {

    /**
     * Iterates through the controls of the given form and marks them as touched.
     * Mainly intended to display error messages on form. Allows for nested
     * FormGroups and FormArrays. Taken from below stackoverflow response.
     * https://stackoverflow.com/a/50992362
     *
     * @param form The form group or array to mark as touched.
     */
    markAsTouched(form: FormGroup | FormArray): void {
        Object.keys(form.controls).forEach(controlName => {
            const control = form.get(controlName);
            if (control instanceof FormGroup || control instanceof FormArray) {
                // recurse and handle nested FormGroups/FormArrays
                this.markAsTouched(control);
            } else if (control) {
                // mark the control as touched
                control.markAsTouched();
            }
        });
    }
}
