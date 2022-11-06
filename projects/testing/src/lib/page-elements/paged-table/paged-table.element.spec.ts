import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DummyObject, DUMMY_OBJECT_DATA } from '../../mocks/dummy-object.mock';
import { PagedTableElement } from './paged-table.element';

@Component({
    styles: ['.hide { display: none; }'],
    template: `
        <div class="marker-pagedTable">
            <mat-table [dataSource]="dataSource">
                <!-- Checkbox Column -->
                <ng-container matColumnDef="select">
                    <mat-header-cell *matHeaderCellDef>
                        <mat-checkbox class="marker-checkbox-select-all">
                        </mat-checkbox>
                    </mat-header-cell>
                    <mat-cell *matCellDef="let row">
                        <mat-checkbox class="marker-checkbox-row-select">
                        </mat-checkbox>
                    </mat-cell>
                </ng-container>
                <!-- Additional columns defined in tag where this component is used -->
                <ng-container matColumnDef="id">
                    <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
                    <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
                </ng-container>
                <ng-container matColumnDef="noData">
                    <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                        No data found
                    </mat-footer-cell>
                </ng-container>

                <!-- Actions Column (where buttons go) -->
                <ng-container matColumnDef="actions">
                    <mat-header-cell *matHeaderCellDef></mat-header-cell>
                    <mat-cell class="actions-cell mat-row-buttons" *matCellDef="let row">
                        <button class="marker-button-edit" (click)="onActionButtonClick('edit', row)">
                            Edit
                        </button>
                        <button class="marker-button-delete" (click)="onActionButtonClick('delete', row)">
                            Delete
                        </button>
                    </mat-cell>
                </ng-container>

                <!-- row definitions -->
                <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                <mat-row *matRowDef="let row; columns: displayedColumns" class="pointer"></mat-row>
                <mat-footer-row *matFooterRowDef="['noData']" [ngClass]="{'hide': length > 0}"></mat-footer-row>
            </mat-table>
            <mat-paginator [length]="length" 
                            [pageSize]="pageSize" 
                            [pageSizeOptions]="[15, 25, 50, 75, 100]">
            </mat-paginator>
        </div>
    `
}) class PagedTableComponent {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource: MatTableDataSource<DummyObject> = new MatTableDataSource();
    displayedColumns: string[] = ['select', 'id', 'actions'];
    length = 0;
    pageSize = 25; 

    set data(data: DummyObject[]) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.length = data.length;
    }

    onActionButtonClick(action: string, row: DummyObject): void {}
}

describe('PagedTableElement', () => {

    let actionButtonSpy: jasmine.Spy;
    let pagedTableElement: PagedTableElement;

    describe('Table With Data', () => {

        beforeEach(() => {
            pagedTableElement = init(DUMMY_OBJECT_DATA);
            actionButtonSpy = spyOn(pagedTableElement.component, 'onActionButtonClick');
        });

        it('should return "1 – 25 of 200" for paginator range when length=200 and pageSize=25', () => {
            expect(pagedTableElement.paginator.pagingatorRange.innerText).toEqual('1 – 25 of 200');
        });

        it('should return "No data found" for noData row', () => {
            expect(pagedTableElement.noDataRow.innerText.trim()).toEqual("No data found");
        });

        it('should check the checkbox in the first row', async() => {
            // when: the checkbox in the first row is checked
            await pagedTableElement.selectItem(0);

            // then: the checkbox in the first row should be marked as checked
            expect(pagedTableElement.isItemSelected(0)).toBeTrue();
        });

        it('should be able to select all checkboxes using header', async() => {
            // when: the checkbox is checked in the header
            await pagedTableElement.selectAll();

            // then: the header checkbox should be selected
            expect(pagedTableElement.isAllSelected()).toBeTrue();
        });

        it('should have 3 columns displayed', () => {
            // given: displayed columns
            const columns: HTMLElement[] = pagedTableElement.displayedColumns;
            
            // expect: there should be 3 of them
            expect(columns.length).toEqual(3);
        });

        it('should click the edit action button in first row', () => {
            // when: the action button is clicked in first row
            pagedTableElement.clickItemButton('edit', 0);

            // expect: the onActionButtonClick should have been called
            expect(actionButtonSpy).toHaveBeenCalledWith('edit', DUMMY_OBJECT_DATA[0]);
        });

        it('should click the delete action button in first row', () => {
            // when: the action button is clicked in first row
            pagedTableElement.clickItemButton('delete', 0);

            // expect: the onActionButtonClick should have been called
            expect(actionButtonSpy).toHaveBeenCalledWith('delete', DUMMY_OBJECT_DATA[0]);
        });

        it('should throw an error when trying click button that does not exist in first row', () => {
            expect(() => { pagedTableElement.clickItemButton('undefined', 0) }).toThrowError('Expected HTMLButtonElement with CSS selector ".marker-button-undefined" in collection item buttons')
        });
    });

    describe('Table Without Data', () => {
        beforeEach(() => {
            pagedTableElement = init();
        });

        it('should return "0 of 0" for paginator range when length=0', () => {
            expect(pagedTableElement.paginator.pagingatorRange.innerText).toEqual('0 of 0');
        });

        it('should return "No data found" for noData row', () => {
            expect(pagedTableElement.noDataRow.innerText).toEqual("No data found");
        });

        it('should add data to table when data setter method called', () => {
            // when: the data setter is called
            pagedTableElement.data = DUMMY_OBJECT_DATA;

            // then: there should be data now (simplest test I can think of is check paginatorRange)
            expect(pagedTableElement.paginator.pagingatorRange.innerText).toEqual('1 – 25 of 200');
        });

        it('should throw an error when something other than mat-row not found in occurs when querying for mat-rows', () => {
            // given: a spy on the queryAll method for PageElement (currently best way I can think of to test random error)
            const spy: jasmine.Spy = spyOn(pagedTableElement, 'queryAll').and.callFake(() => { throw Error('I am a random error') });

            // expect: random error to be thrown when set data method called (which should trigger row init function)
            expect(() => { pagedTableElement.data = DUMMY_OBJECT_DATA }).toThrowError('I am a random error');
        });
    });
});

function init(data: DummyObject[] = []) {
    TestBed.configureTestingModule({
        declarations: [PagedTableComponent],
        imports: [
            MatCheckboxModule,
            MatTableModule,
            MatPaginatorModule,
            NoopAnimationsModule
        ]
    });

    const fixture = TestBed.createComponent(PagedTableComponent);
    fixture.componentInstance.data = data;
    fixture.detectChanges();

    return new PagedTableElement(fixture, '.marker-pagedTable'); 
}
