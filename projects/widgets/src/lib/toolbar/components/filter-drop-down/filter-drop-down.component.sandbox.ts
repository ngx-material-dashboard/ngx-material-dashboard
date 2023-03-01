/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { sandboxOf } from 'angular-playground';
import { FilterDropDownComponent } from './filter-drop-down.component';

export default sandboxOf(FilterDropDownComponent, {
    imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatMenuModule,
        MatToolbarModule,
        FontAwesomeModule
    ]
}).add('default', {
    template: `
    <mat-toolbar>
        <div fxFlex></div>
        <ngx-mat-filter-drop-down fxFlex="0 0 50">
            <!-- filter form goes here -->
        </ngx-mat-filter-drop-down>
        <div fxFlex></div>
    </mat-toolbar>`
});
