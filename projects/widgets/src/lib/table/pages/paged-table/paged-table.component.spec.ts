import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonDatastore, JsonModel } from '@ngx-material-dashboard/base-json';
import { CheckboxElement, Datastore, DummyObject, PagedTableElement, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';

import { Button } from '../../../collection/interfaces/button.interface';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../../collection/shared/buttons';
import { RemoteDataSource } from '../../../collection/services/remote-data-source.service';
import { PagedTableComponent } from './paged-table.component';
import { TableComponent } from '../../components/table/table.component';
import { CollectionComponent } from '../../../collection/components/collection/collection.component';
import { PagedCollectionComponent } from '../../../collection/components/paged-collection/paged-collection.component';
import { RemoteDataSourceMock } from '@ngx-material-dashboard/widgets/test/mocks/remote-data-source.service';

const pageSize = 5;
const testData: DummyObject[] = TEST_DATA;

@Component({
    template: `
    <ngx-material-dashboard-paged-table
        matSort
        [collectionButtons]="collectionButtons"
        [dataSource$]="data"
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
    </ngx-material-dashboard-paged-table>
    `
}) class TestPagedTableComponent {
    @ViewChild(PagedTableComponent) table!: PagedTableComponent<DummyObject>;
    collectionButtons: Button[] = [{...EDIT_BUTTON}, {...DELETE_BUTTON}];
    data: JsonModel[] = [];
    displayedColumns: string[] = ['select', 'id', 'actions'];
    multiple = true;
}

@Component({
    template: `
    <ngx-material-dashboard-paged-table 
        matSort
        [collectionButtons]="collectionButtons"
        [dataSource$]="dataSource"
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
    </ngx-material-dashboard-paged-table>
    `
}) class TestRemotePagedTableComponent {
    @ViewChild(PagedTableComponent) table!: PagedTableComponent<DummyObject>;
    collectionButtons: Button[] = [{...EDIT_BUTTON}, {...DELETE_BUTTON}];
    dataSource: RemoteDataSourceMock<DummyObject>;
    displayedColumns: string[] = ['select', 'id', 'actions'];
    multiple = true;

    constructor(private jsonApiDatastore: JsonDatastore) {
        this.dataSource = new RemoteDataSourceMock<DummyObject>(DummyObject, this.jsonApiDatastore);
    }
}

describe('PagedTableComponent', () => {

    describe('Local data source', () => {
        let page: PagedTableElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    CollectionComponent,
                    TableComponent,
                    PagedCollectionComponent,
                    PagedTableComponent,
                    TestPagedTableComponent
                ],
                imports: [
                    HttpClientTestingModule,
                    MatButtonModule,
                    MatCheckboxModule,
                    MatPaginatorModule,
                    MatSortModule,
                    MatTableModule,
                    NoopAnimationsModule,
                    MockModule(FlexLayoutModule),
                    MockModule(FontAwesomeModule)
                ],
                providers: [
                    { provide: JsonDatastore, useClass: Datastore }
                ],
                teardown: { destroyAfterEach: false }
            });
        });
    
        describe('No Table Data', () => {
    
            beforeEach(() => {
                // initialize component without any data
                page = init();
            });
    
            it('should not have any rows selected by default', () => {
                expect(page.component.table.collection$.selection.selected.length).toEqual(0);
                expect(page.component.table.collection$.isAllSelected()).toEqual(false);
            });
    
            it('should display no data row', () => {
                // given: the no data row
                const noDataRow: HTMLElement = page.noDataRow;
    
                // expect: the row to be defined
                expect(noDataRow).toBeDefined();
    
                // and: the text of the row to be 'No data found'
                expect(noDataRow.innerText).toEqual('No data found');
            });
    
            it('should display "0 of 0" in paginator range label', () => {
                expect(page.paginator.pagingatorRange.innerText).toEqual('0 of 0');
            });
        });
    
        describe('With Table Data', () => {
            const data: DummyObject[] = testData;
    
            // tests where it doesn't matter whether multi-select is allowed
            describe('Mulit-select Independent', () => {
    
                beforeEach(() => {
                    // initialize the component with dummy data and allow multi-select
                    page = init(data);
                });
    
                it('should emit buttonClick event when action button clicked in row', () => {
                    // given: a spy on the tableButtonClick
                    const spy = spyOn(page.component.table.buttonClick, 'emit');
    
                    // when: a button is clicked in one of the rows
                    page.clickItemButton('edit', 0);
    
                    // then: the tableButtonClick emit method should have been called
                    expect(spy).toHaveBeenCalledWith({ click: 'edit', row: data[0] });
                });
    
                it('should not display no data row', () => {
                    // given: the no data row and it's parent
                    const noDataRow = page.noDataRow;
                    const noDataRowParent = noDataRow.parentElement;
    
                    // expect: the parent should have "hide" class to hide row
                    expect(noDataRowParent?.className).toContain('hide');
                });
    
                it(`should display "1 – ${pageSize} of ${testData.length}" in paginator range label`, () => {
                    expect(page.paginator.pagingatorRange.innerText).toEqual(`1 – ${pageSize} of ${testData.length}`);
                });
    
                it(`should display "${pageSize + 1} - ${pageSize + pageSize} of ${testData.length}" in paginator range label when next page button clicked`, () => {
                    // when: next page button is clicked
                    page.paginator.clickNextButton();
    
                    // then: the paginator range label should update to next page
                    expect(page.paginator.pagingatorRange.innerText).toEqual(`${pageSize + 1} – ${pageSize + pageSize} of ${testData.length}`);
                });
            });
    
            describe('Multi-select Enabled', () => {
    
                beforeEach(() => {
                    // initialize the component with dummy data and allow multi-select
                    page = init(data);
                });
    
                describe('No rows selected initially', () => {
                    it('should not have any rows selected by default', () => {
                        expect(page.component.table.collection$.selection.selected.length).toEqual(0);
                        expect(page.component.table.collection$.isAllSelected()).toEqual(false);
                    });
    
                    it('should select all rows when checkbox in header checked', () => {
                        // when: the select all checkbox is checked
                        page.selectAll();
    
                        // then: the component should return true for isAllSelected()
                        expect(page.component.table.collection$.isAllSelected()).toEqual(true);
    
                        // and: all rows should have their checkboxes checked
                        const checkBoxes: CheckboxElement[] = page.itemCheckboxes;
                        checkBoxes.forEach((checkbox: CheckboxElement) => {
                            expect(checkbox.checked).toBeTrue();
                        });
                    });
    
                    it('should clear selection from all rows when checkbox in header checked if all rows selected', () => {
                        // setup: select all rows
                        page.selectAll();
    
                        // when: the select all rows button is clicked again
                        page.selectAll();
    
                        // then: no rows should have their checkboxes checked
                        const checkBoxes: CheckboxElement[] = page.itemCheckboxes;
                        checkBoxes.forEach((checkbox: CheckboxElement) => {
                            expect(checkbox.checked).toBeFalse();
                        });
                    });
                });
            });
    
            describe('Multi-select Disabled', () => {
                beforeEach(() => {
                    // initialize the component with dummy data and disable multi-select
                    page = init(data, false);
                });
    
                it('should allow row to be selected and deselected', () => {
                    // when: the checkbox is checked in first row
                    page.selectItem(0);
    
                    // then: the checkbox should be checked
                    expect(page.isItemSelected(0)).toBeTrue();
    
                    // when: the checkbox is unchecked
                    page.selectItem(0);
    
                    // then: checkbox should be unchecked
                    expect(page.isItemSelected(0)).toBeFalse();
                });
    
                it('should only select one row at a time', () => {
                    // when: the first checkbox is checked
                    page.selectItem(0); //.clickCheckbox(checkbox1InputElement);
    
                    // and: the second checkbox is checked
                    page.selectItem(1); //age.clickCheckbox(checkbox2InputElement);
    
                    // then: the second checkbox should be the only checkbox checked
                    expect(page.isItemSelected(0)).toBeFalse();
                    expect(page.isItemSelected(1)).toBeTrue();
                });
            });
        });
    });

    describe('Remote data source', () => {

        let page: PagedTableElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    CollectionComponent,
                    TableComponent,
                    PagedCollectionComponent,
                    PagedTableComponent,
                    TestRemotePagedTableComponent
                ],
                imports: [
                    HttpClientTestingModule,
                    MatButtonModule,
                    MatCheckboxModule,
                    MatPaginatorModule,
                    MatSortModule,
                    MatTableModule,
                    NoopAnimationsModule,
                    MockModule(FlexLayoutModule),
                    MockModule(FontAwesomeModule)
                ],
                providers: [
                    { provide: RemoteDataSource, userClass: RemoteDataSourceMock, deps: [Datastore] },
                    { provide: Datastore, deps: [HttpClient] },
                    { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
                ],
                teardown: { destroyAfterEach: false }
            });
        });

        describe('No Table data', () => {
            beforeEach(() => {
                page = initRemote();
            });

            it('should display no data row', () => {
                // given: the no data row
                const noDataRow: HTMLElement = page.noDataRow;
    
                // expect: the row to be defined
                expect(noDataRow).toBeDefined();
    
                // and: the text of the row to be 'No data found'
                expect(noDataRow.innerText).toEqual('No data found');
            });
    
            it('should display "0 of 0" in paginator range label', () => {
                expect(page.paginator.pagingatorRange.innerText).toEqual('0 of 0');
            });
        });

        describe('With Table data', () => {

            beforeEach(() => {
                page = initRemote(testData);
            });

            it('should not display no data row', () => {
                // given: the no data row and it's parent
                const noDataRow = page.noDataRow;
                const noDataRowParent = noDataRow.parentElement;

                // expect: the parent should have "hide" class to hide row
                expect(noDataRowParent?.className).toContain('hide');
            });

            it(`should display "1 – ${pageSize} of ${testData.length}" in paginator range label`, () => {
                expect(page.paginator.pagingatorRange.innerText).toEqual(`1 – ${pageSize} of ${testData.length}`);
            });

            it(`should display "${pageSize + 1} – ${pageSize + pageSize} of ${testData.length}" in paginator range label when next page button clicked`, () => {
                // when: next page button is clicked
                page.paginator.clickNextButton();

                // then: the paginator range label should update to next page
                expect(page.paginator.pagingatorRange.innerText).toEqual(`${pageSize + 1} – ${pageSize + pageSize} of ${testData.length}`);
            });
        });
    });
});

/**
 * Helper function to setup the Component for tests using local data.
 *
 * @param data The data to load in the table.
 * @param multiple Boolean value to set whether table allows multiple selection.
 * @return A page helper to aid in tests.
 */
function init(
    data: JsonModel[] = [],
    multiple = true
): PagedTableElement {
    const fixture: ComponentFixture<TestPagedTableComponent> = TestBed.createComponent(TestPagedTableComponent);
    const component = fixture.componentInstance;
    component.data = data;
    component.multiple = multiple;
    fixture.detectChanges();

    // set pageSize after change detection cycle to ensure component initialized
    // and child PagedTableComponent exists
    component.table.pageSize = pageSize;
    fixture.detectChanges();

    return new PagedTableElement(fixture, '.marker-paged-table');
}

/**
 * Helper function to setup the Component for tests using remote data.
 *
 * @param multiple Boolean value to set whether table allows multiple selection.
 * @param pageSize The page size for data in the table.
 * @returns A page helper to aid in tests.
 */
function initRemote(
    data: DummyObject[] = [],
    multiple = true,
    pageSize = 5
): PagedTableElement {
    const fixture: ComponentFixture<TestRemotePagedTableComponent> = TestBed.createComponent(TestRemotePagedTableComponent);
    const component = fixture.componentInstance;
    component.multiple = multiple;
    component.dataSource.setTestData(data);
    fixture.detectChanges();

    // set pageSize after change detection cycle to ensure component initialized
    // and child PagedTableComponent exists
    component.table.pageSize = pageSize;
    if (component.table.collection$.dataSource$ instanceof RemoteDataSource) {
        // const remoteDataSource: RemoteDataSource<DummyObject> = component.table.collection$.dataSource$;
        // spyOn(remoteDataSource, 'load').and.callFake(
        //     (
        //         filter?: {},
        //         sort?: string,
        //         order?: string,
        //         pageIndex: number = 0,
        //         pageSize: number = 5,
        //         include?: string,
        //         headers?: HttpHeaders
        //     ) => {
        //         remoteDataSource.total = data.length;
        //         remoteDataSource.totalPages = remoteDataSource.total / pageSize;
        //         if (data.length > 0) {
        //             remoteDataSource.data = data.slice(pageIndex * pageSize, (pageIndex * pageSize) + pageSize);
        //         }
        //         console.log(remoteDataSource.data);
        //     }
        // )

        //if (component.table.collection$.dataSource$ instanceof RemoteDataSource) {
            // also set pageSize on table datasource and refresh; need instanceof
            // RemoteDataSource since table.dataSource$ has multiple types even
            // though it should be RemoteDataSource type for these tests
            component.table.collection$.dataSource$.pageSize = pageSize;
            component.table.collection$.dataSource$.refresh();
        //}
    }
    fixture.detectChanges();

    return new PagedTableElement(fixture, '.marker-paged-table');
}
