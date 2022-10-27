import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { PagedTableComponent } from '../paged-table/paged-table.component';

import { PagedTableWithRaisedButtonsBarComponent } from './paged-table-with-raised-buttons-bar.component';

@Component({
    template: `
    <ngx-material-dashboard-paged-table-with-raised-buttons-bar 
        matSort
        class="marker-paged-table">
        <ngx-material-dashboard-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-material-dashboard-filter-drop-down>
        <ngx-material-dashboard-paged-table
            [data]="data"
            [displayedColumns]="displayedColumns"
            collection
            #pagedCollection>    
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
    </ngx-material-dashboard-paged-table-with-raised-buttons-bar>
    `
}) class TestPagedTableWithRaisedButtonsBarComponent {
    //collectionButtons: Button[] = [EDIT_BUTTON, DELETE_BUTTON];
    data: DummyObject[] = [];
    displayedColumns: string[] = ['select', 'id', 'actions'];
}

describe('PagedTableWithRaisedButtonsBarComponent', () => {
    let component: TestPagedTableWithRaisedButtonsBarComponent;
    let fixture: ComponentFixture<TestPagedTableWithRaisedButtonsBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PagedTableComponent,
                PagedTableWithRaisedButtonsBarComponent,
                TestPagedTableWithRaisedButtonsBarComponent
            ],
            imports: [
                NoopAnimationsModule,
                MockModule(MatButtonModule),
                MockModule(MatCheckboxModule),
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                MockModule(FlexLayoutModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPagedTableWithRaisedButtonsBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
