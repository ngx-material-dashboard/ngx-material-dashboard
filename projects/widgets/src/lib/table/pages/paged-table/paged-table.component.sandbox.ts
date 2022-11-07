import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { sandboxOf } from 'angular-playground';

import { DELETE_BUTTON, EDIT_BUTTON } from '../../../collection/shared/buttons';
import { TableComponent } from '../../components/table/table.component';
import { PagedTableComponent } from './paged-table.component';

export default sandboxOf(PagedTableComponent, {
    declarations: [TableComponent],
    imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        FontAwesomeModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
})
.add('table with multi-select', {
    template: `
    <ngx-material-dashboard-paged-table 
        matSort 
        [collectionButtons]="buttons"
        [data]="data"
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
    </ngx-material-dashboard-paged-table>`,
    context: {
        buttons: [EDIT_BUTTON, DELETE_BUTTON],
        data: TEST_DATA,
        displayedColumns: ['select', 'id', 'actions'],
        multiple: true
    }
})
.add('table without multi-select', {
    template: `
    <ngx-material-dashboard-paged-table
        matSort
        [collectionButtons]="buttons"
        [data]="data"
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
    </ngx-material-dashboard-paged-table>`,
    context: {
        buttons: [EDIT_BUTTON, DELETE_BUTTON],
        data: TEST_DATA,
        displayedColumns: ['select', 'id', 'actions'],
        multiple: false
    }
});
