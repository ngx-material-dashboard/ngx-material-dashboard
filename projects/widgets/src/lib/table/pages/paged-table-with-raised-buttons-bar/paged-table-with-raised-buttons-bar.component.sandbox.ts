/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, getTaskData } from '@ngx-material-dashboard/testing';
import { sandboxOf } from 'angular-playground';
import { CollectionModule } from '../../../collection/collection.module';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../../collection/shared/buttons';
import {
    CREATE_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON
} from '../../../toolbar/shared/toolbar-buttons';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { TableComponent } from '../../components/table/table.component';
import { PagedTableComponent } from '../paged-table/paged-table.component';
import { PagedTableWithRaisedButtonsBarComponent } from './paged-table-with-raised-buttons-bar.component';
import { IconModule } from '../../../icon/icon.module';

// const pageSize = 5;

export default sandboxOf(PagedTableWithRaisedButtonsBarComponent, {
    declarations: [PagedTableComponent, TableComponent],
    imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        CollectionModule,
        IconModule,
        ToolbarModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
})
    .add('multi-select', {
        template: `
    <ngx-mat-paged-table-with-raised-buttons-bar
        [toolbarButtons]="toolbarButtons">
        <ngx-mat-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-mat-filter-drop-down>
        <ngx-mat-paged-table
            matSort 
            [collectionButtons]="collectionButtons"
            [dataSource]="data"
            [displayedColumns]="displayedColumns"
            [multiple]="multiple"
            class="marker-paged-table"
            collection
            #collection>
            <ng-container matColumnDef="id">
                <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
                <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="noData">
                <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                    No data found
                </mat-footer-cell>
            </ng-container>
        </ngx-mat-paged-table>
    </ngx-mat-paged-table-with-raised-buttons-bar>`,
        context: {
            collectionButtons: [EDIT_BUTTON, DELETE_BUTTON],
            toolbarButtons: [
                CREATE_TOOLBAR_BUTTON,
                EDIT_TOOLBAR_BUTTON,
                DELETE_TOOLBAR_BUTTON
            ],
            data: getTaskData(20),
            displayedColumns: ['select', 'id', 'actions'],
            multiple: true
        }
    })
    .add('without multi-select', {
        template: `
    <ngx-mat-paged-table-with-toolbar [toolbarButtons]="toolbarButtons">
        <ngx-mat-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-mat-filter-drop-down>
        <ngx-mat-paged-table
            matSort
            [collectionButtons]="collectionButtons"
            [dataSource]="data"
            [displayedColumns]="displayedColumns"
            [multiple]="multiple"
            class="marker-paged-table"
            collection
            #collection>
            <ng-container matColumnDef="id">
                <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
                <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="noData">
                <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                    No data found
                </mat-footer-cell>
            </ng-container>
        </ngx-mat-paged-table>
    </ngx-mat-paged-table-with-toolbar>`,
        context: {
            collectionButtons: [EDIT_BUTTON, DELETE_BUTTON],
            toolbarButtons: [
                CREATE_TOOLBAR_BUTTON,
                EDIT_TOOLBAR_BUTTON,
                DELETE_TOOLBAR_BUTTON
            ],
            data: getTaskData(20),
            displayedColumns: ['select', 'id', 'actions'],
            multiple: false
        }
    });
