import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TEST_DATA } from '../../fixtures/dummy-object.fixture';
import { DummyObject } from '../../mocks/dummy-object.mock';
import { TableElement } from './table.element';

@Component({
    template: `
    <mat-table 
        class="marker-table"
        matSort
        [dataSource]="dataSource"
        (matSortChange)="onSortChange()">
        <!-- Checkbox Column -->
        <ng-container matColumnDef="select">
            <mat-header-cell *matHeaderCellDef>
                <mat-checkbox
                    class="marker-checkbox-select-all"
                    (change)="masterToggle()">
                </mat-checkbox>
            </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <mat-checkbox 
                    class="marker-checkbox-row-select"
                    (change)="onRowSelected(row);">
                </mat-checkbox>
            </mat-cell>
        </ng-container>
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
            <mat-cell *matCellDef="let obj">{{obj.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="noData">
            <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                No data found
            </mat-footer-cell>
        </ng-container>

        <!-- row definitions -->
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns" class="pointer"></mat-row>
        <mat-footer-row *matFooterRowDef="['noData']" [ngClass]="{'hide': length > 0}"></mat-footer-row>
    </mat-table>`
}) class Table implements AfterViewInit {
    @ViewChild(MatSort) sort!: MatSort;
    dataSource: MatTableDataSource<DummyObject> = new MatTableDataSource<DummyObject>(TEST_DATA);
    displayedColumns: string[] = ['select', 'id'];

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    onRowSelected(): void {}

    onSortChange(): void {}

    masterToggle(): void {}
}

describe('TableElement', () => {

    let fixture: ComponentFixture<Table>;
    let component: Table;
    let table: TableElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ Table ],
            imports: [
                MatCheckboxModule,
                MatSortModule,
                MatTableModule,
                NoopAnimationsModule
            ]
        });

        fixture = TestBed.createComponent(Table);
        component = fixture.componentInstance;
        fixture.detectChanges();

        table = new TableElement(fixture, '.marker-table');
    });

    it('should sort data when sortable column header clicked', () => {
        // given: a spy on the sortChange
        const spy = spyOn(component, 'onSortChange');

        // when: the id column header is clicked
        table.clickColumnHeader('id');

        // expect: the sortChange to have been called 
        expect(spy).toHaveBeenCalled();
    });

    it('should throw an error when trying to click column that does not exist', () => {
        try {
            table.clickColumnHeader('nonExistentColumn');
        } catch(error) {
            expect(error).toBeDefined();
        }
    });
});
