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
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, getTaskData } from '@ngx-material-dashboard/testing';
import { sandboxOf } from 'angular-playground';

import { DELETE_BUTTON, EDIT_BUTTON } from '../../../collection/shared/buttons';
import { TableComponent } from '../../components/table/table.component';
import { PagedTableComponent } from './paged-table.component';
import { IconModule } from '../../../icon/icon.module';

export default sandboxOf(PagedTableComponent, {
    declarations: [TableComponent],
    imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        IconModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
})
    .add('multi-select', {
        template: `
    <ngx-mat-paged-table 
        matSort 
        [collectionButtons]="buttons"
        [dataSource]="data"
        [displayedColumns]="displayedColumns"
        [multiple]="multiple"
        class="marker-paged-table">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
            <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="noData">
            <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                No data found
            </mat-footer-cell>
        </ng-container>
    </ngx-mat-paged-table>`,
        context: {
            buttons: [EDIT_BUTTON, DELETE_BUTTON],
            data: getTaskData(20),
            displayedColumns: ['select', 'id', 'actions'],
            multiple: true
        }
    })
    .add('without multi-select', {
        template: `
    <ngx-mat-paged-table
        matSort
        [collectionButtons]="buttons"
        [dataSource]="data"
        [displayedColumns]="displayedColumns"
        [multiple]="multiple"
        class="marker-paged-table">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
            <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="noData">
            <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                No data found
            </mat-footer-cell>
        </ng-container>
    </ngx-mat-paged-table>`,
        context: {
            buttons: [EDIT_BUTTON, DELETE_BUTTON],
            data: getTaskData(20),
            displayedColumns: ['select', 'id', 'actions'],
            multiple: false
        }
    })
    .add('customize paginator', {
        template: `
    <ngx-mat-paged-table 
        matSort
        [collectionButtons]="buttons"
        [dataSource]="data"
        [displayedColumns]="displayedColumns"
        [hidePageSize]="hidePageSize"
        [pageSizeOptions]="pageSizeOptions"
        [multiple]="multiple"
        [showFirstLastButtons]="showFirstLastButtons"
        class="marker-paged-table">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
            <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="noData">
            <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                No data found
            </mat-footer-cell>
        </ng-container>
    </ngx-mat-paged-table>`,
        context: {
            buttons: [EDIT_BUTTON, DELETE_BUTTON],
            data: getTaskData(20),
            displayedColumns: ['select', 'id', 'actions'],
            hidePageSize: true,
            multiple: true,
            pageSizeOptions: [10, 20, 30, 40, 50],
            showFirstLastButtons: false
        }
    });
