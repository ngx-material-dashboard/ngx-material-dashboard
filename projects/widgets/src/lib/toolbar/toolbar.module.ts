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
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormModule } from '../form/form.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { FilterDropDownComponent } from './components/filter-drop-down/filter-drop-down.component';
import { SearchFilterDirective } from './directives/search-filter.directive';
import { ButtonToolbarComponent } from './pages/button-toolbar/button-toolbar.component';
import { IconButtonsComponent } from './components/icon-buttons/icon-buttons.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SorterComponent } from './pages/sorter/sorter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RaisedButtonToolbarComponent } from './pages/raised-button-toolbar/raised-button-toolbar.component';
import { IconButtonsWithPaginatorComponent } from './pages/icon-buttons-with-paginator/icon-buttons-with-paginator.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';

@NgModule({
    declarations: [
        ButtonsComponent,
        ButtonToolbarComponent,
        FilterDropDownComponent,
        IconButtonsComponent,
        IconButtonsWithPaginatorComponent,
        RaisedButtonToolbarComponent,
        SearchFilterDirective,
        SorterComponent
    ],
    exports: [
        ButtonToolbarComponent,
        FilterDropDownComponent,
        IconButtonsWithPaginatorComponent,
        RaisedButtonToolbarComponent,
        SearchFilterDirective,
        SorterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        MatToolbarModule,
        MatTooltipModule,
        OverlayModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormModule,
        IconModule
    ]
})
export class ToolbarModule {}
