/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { sandboxOf } from 'angular-playground';
import { FilterDropDownComponent } from './filter-drop-down.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export default sandboxOf(FilterDropDownComponent, {
    imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        OverlayModule,
        FontAwesomeModule
    ]
}).add('default', {
    template: `
    <mat-toolbar color="primary">
        <div fxFlex></div>
        <ngx-mat-filter-drop-down fxFlex="0 0 50">
            <form fxFlex>
                <mat-form-field fxFlex>
                    <mat-label>Filter Something</mat-label>
                    <input matInput placeholder="Placeholder">
                </mat-form-field>
            </form>
        </ngx-mat-filter-drop-down>
        <div fxFlex></div>
    </mat-toolbar>`
});
