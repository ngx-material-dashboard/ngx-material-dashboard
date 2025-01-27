/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormService } from './services/form.service';
import { FieldErrorComponent } from './pages/field-error/field-error.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { TabStopPropagationDirective } from './directives/tab-stop-propagation.directive';

@NgModule({
    declarations: [
        FieldErrorComponent,
        ClickStopPropagationDirective,
        TabStopPropagationDirective
    ],
    exports: [
        ClickStopPropagationDirective,
        TabStopPropagationDirective,
        FieldErrorComponent
    ],
    imports: [CommonModule, MatFormFieldModule],
    providers: [FormService]
})
export class FormModule {}
