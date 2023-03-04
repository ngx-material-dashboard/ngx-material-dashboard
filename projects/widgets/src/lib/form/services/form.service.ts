/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray } from '@angular/forms';

/**
 * A simple service that provides convenience methods for forms.
 *
 * @overviewDetails
 * #### Features
 *
 * Currently the only method available is `markAsTouched`. This will iterate
 * through the controls of given form and mark them all as touched. Mainly
 * intended to cause change detection so potential error messages are rendered
 * for all controls on the given form where appropriate, allowing for nested
 * FormGroups and FormArrays.
 *
 * #### Basic Usage Example
 * ```typescript
 * // ...
 * import {FormService} from '@ngx-material-dashboard/widgets';
 * // ...
 * constructor(private formService: FormService) {}
 *
 * submit(form: FormGroup | FormArray): void {
 *     this.formService.markAsTouched(form);
 * }
 * ```
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
    markAsTouched(form: UntypedFormGroup | UntypedFormArray): void {
        Object.keys(form.controls).forEach((controlName) => {
            const control = form.get(controlName);
            if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
                // recurse and handle nested FormGroups/FormArrays
                this.markAsTouched(control);
            } else if (control) {
                // mark the control as touched
                control.markAsTouched();
            }
        });
    }
}
