import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';

import { TableComponent } from './table.component';

@Component({
    template: `
    <ngx-material-dashboard-table 
        matSort
        [data]="data"
        [displayedColumns]="displayedColumns">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
            <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="noData">
            <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                No data found
            </mat-footer-cell>
        </ng-container>
    </ngx-material-dashboard-table>
    `
}) class TestTableComponent {
    data: DummyObject[] = TEST_DATA;
    displayedColumns: string[] = ['select', 'id', 'actions'];
}

describe('TableComponent', () => {
    let component: TestTableComponent;
    let fixture: ComponentFixture<TestTableComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ TableComponent ],
            imports: [
                MatSortModule,
                MatTableModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
