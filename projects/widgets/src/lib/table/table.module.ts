/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormModule } from '../form/form.module';
import { PagedTableComponent } from './pages/paged-table/paged-table.component';
import { CollectionModule } from '../collection/collection.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { PagedTableWithRaisedButtonsBarComponent } from './pages/paged-table-with-raised-buttons-bar/paged-table-with-raised-buttons-bar.component';
import { TableWithIconButtonsPaginatorBarComponent } from './pages/table-with-icon-buttons-paginator-bar/table-with-icon-buttons-paginator-bar.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
    declarations: [
        PagedTableComponent,
        PagedTableWithRaisedButtonsBarComponent,
        TableComponent,
        TableWithIconButtonsPaginatorBarComponent
    ],
    exports: [
        PagedTableComponent,
        PagedTableWithRaisedButtonsBarComponent,
        TableComponent,
        TableWithIconButtonsPaginatorBarComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatMenuModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        CollectionModule,
        FormModule,
        ToolbarModule
    ]
})
export class TableModule {}
