import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { getTaskData } from '../../fixtures/task.fixture';
import { TableElement } from './table.element';

const TEST_DATA = getTaskData(20);

@Component({
    template: ` <mat-table
        class="marker-table"
        matSort
        [dataSource]="dataSource"
        (matSortChange)="onSortChange()"
    >
        <!-- Checkbox Column -->
        <ng-container matColumnDef="select">
            <mat-header-cell *matHeaderCellDef>
                <mat-checkbox
                    class="marker-checkbox-select-all"
                    (change)="masterToggle()"
                >
                </mat-checkbox>
            </mat-header-cell>
            <mat-cell *matCellDef="let row">
                <mat-checkbox
                    class="marker-checkbox-row-select"
                    (change)="onRowSelected(row)"
                >
                </mat-checkbox>
            </mat-cell>
        </ng-container>
        <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef mat-sort-header
                >Name</mat-header-cell
            >
            <mat-cell *matCellDef="let obj">{{ obj.name }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="description">
            <mat-header-cell *matHeaderCellDef mat-sort-header
                >Description</mat-header-cell
            >
            <mat-cell *matCellDef="let obj">{{ obj.description }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="noData">
            <mat-footer-cell
                *matFooterCellDef
                colspan="displayedColumns.length"
                fxLayoutAlign="center center"
            >
                No data found
            </mat-footer-cell>
        </ng-container>

        <!-- row definitions -->
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row
            *matRowDef="let row; columns: displayedColumns"
            class="pointer"
        ></mat-row>
        <mat-footer-row
            *matFooterRowDef="['noData']"
            [ngClass]="{ hide: length > 0 }"
        ></mat-footer-row>
    </mat-table>`
})
class Table implements AfterViewInit {
    @ViewChild(MatSort) sort!: MatSort;
    dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>(
        TEST_DATA
    );
    displayedColumns: string[] = ['select', 'name', 'description'];

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
            declarations: [Table],
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
        table.clickColumnHeader('name');

        // expect: the sortChange to have been called
        expect(spy).toHaveBeenCalled();
    });

    it('should throw an error when trying to click column that does not exist', () => {
        try {
            table.clickColumnHeader('nonExistentColumn');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should return cell element by row and column index', () => {
        // when: the getCellByColumnIndex method is called
        const cell = table.getCellByColumnIndex(0, 1);

        // expect: the cell element to be defined
        expect(cell).toBeDefined();

        // and: the innerText should match expected value
        expect(cell.innerText).toEqual(TEST_DATA[0].name);
    });
});
