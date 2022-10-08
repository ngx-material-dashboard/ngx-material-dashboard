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
import { PagedTableWithToolbarComponent } from './pages/paged-table-with-toolbar/paged-table-with-toolbar.component';
import { CollectionModule } from '../collection/collection.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { CompactPagedTableComponent } from './pages/compact-paged-table/compact-paged-table.component';

@NgModule({
    declarations: [PagedTableComponent, PagedTableWithToolbarComponent, CompactPagedTableComponent],
    exports: [
        CompactPagedTableComponent,
        PagedTableComponent,
        PagedTableWithToolbarComponent
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
export class TableModule { }
