import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormService } from './services/form.service';
import { FieldErrorComponent } from './pages/field-error/field-error.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { TabStopPropagationDirective } from './directives/tab-stop-propagation.directive';

@NgModule({
    declarations: [FieldErrorComponent, ClickStopPropagationDirective, TabStopPropagationDirective],
    exports: [
        ClickStopPropagationDirective,
        TabStopPropagationDirective,
        FieldErrorComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule
    ],
    providers: [
        FormService
    ]
})
export class FormModule { }
