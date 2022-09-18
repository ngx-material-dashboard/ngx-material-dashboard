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
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { sandboxOf } from 'angular-playground';
import { FilterDropDownComponent } from '../../components/filter-drop-down/filter-drop-down.component';
import { TableToolbarComponent } from '../../components/table-toolbar/table-toolbar.component';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../../shared/buttons';
import { CREATE_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON } from '../../shared/table-toolbar-buttons';
import { PagedTableComponent } from '../paged-table/paged-table.component';
import { PagedTableWithToolbarComponent } from './paged-table-with-toolbar.component';

const pageSize = 5;

export default sandboxOf(PagedTableWithToolbarComponent, {
    declarations: [
        FilterDropDownComponent,
        TableToolbarComponent,
        PagedTableComponent
    ],
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
        FontAwesomeModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
})
.add('table with toolbar with multi-select', {
    template: `
    <ngx-material-dashboard-paged-table-with-toolbar [toolbarButtons]="toolbarButtons">
        <ngx-material-dashboard-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-material-dashboard-filter-drop-down>
        <ngx-material-dashboard-paged-table matSort [buttons]="tableButtons" [data]="data" [displayedColumns]="displayedColumns" [multiple]="multiple" table class="marker-paged-table">
            <ng-container matColumnDef="id">
                <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
                <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="noData">
                <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                    No data found
                </mat-footer-cell>
            </ng-container>
        </ngx-material-dashboard-paged-table>
    </ngx-material-dashboard-paged-table-with-toolbar>`,
    context: {
        tableButtons: [EDIT_BUTTON, DELETE_BUTTON],
        toolbarButtons: [CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON],
        data: TEST_DATA,
        displayedColumns: ['select', 'id', 'actions'],
        multiple: true
    }
})
.add('table with toolbar without multi-select', {
    template: `
    <ngx-material-dashboard-paged-table-with-toolbar [toolbarButtons]="toolbarButtons">
        <ngx-material-dashboard-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-material-dashboard-filter-drop-down>
        <ngx-material-dashboard-paged-table matSort [buttons]="tableButtons" [data]="data" [displayedColumns]="displayedColumns" [multiple]="multiple" table class="marker-paged-table">
            <ng-container matColumnDef="id">
                <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
                <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="noData">
                <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                    No data found
                </mat-footer-cell>
            </ng-container>
        </ngx-material-dashboard-paged-table>
    </ngx-material-dashboard-paged-table-with-toolbar>`,
    context: {
        tableButtons: [EDIT_BUTTON, DELETE_BUTTON],
        toolbarButtons: [CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON],
        data: TEST_DATA,
        displayedColumns: ['select', 'id', 'actions'],
        multiple: false
    }
});
