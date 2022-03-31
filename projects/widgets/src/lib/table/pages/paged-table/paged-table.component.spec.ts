import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockModule } from 'ng-mocks';

import { JsonApiModel } from '@ngx-material-dashboard/json-api';
import { TableButton } from '../../interfaces/table-button.interface';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../shared/table-buttons';
import { TablePageHelper } from '../../../../../test/helpers/table-page.helper';
import { DummyObject } from '../../../../../test/mocks/dummy-object.mock';
import { PagedTableComponent } from './paged-table.component';
import { JsonApiDatastore } from '@ngx-material-dashboard/json-api';
import { RemoteDataSource } from '../../shared/services/remote-data-source.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModelType } from '@ngx-material-dashboard/json-api';
import { JsonApiQueryData } from '@ngx-material-dashboard/json-api';

const pageSize = 5;
const testData: DummyObject[] = [];

@Component({
    template: `
    <app-paged-table matSort [buttons]="buttons" [data]="data" [displayedColumns]="displayedColumns" [multiple]="multiple">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
            <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="isActive">
            <mat-header-cell *matHeaderCellDef mat-sort-header>Active</mat-header-cell>
            <mat-cell class="col2-cell" *matCellDef="let obj">{{obj.isActive}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="noData">
            <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                No data found
            </mat-footer-cell>
        </ng-container>
    </app-paged-table>
    `
}) class TestPagedTableComponent {
    @ViewChild(PagedTableComponent) table!: PagedTableComponent<JsonApiModel>;
    buttons: TableButton[] = [EDIT_BUTTON, DELETE_BUTTON];
    data: JsonApiModel[] = [];
    displayedColumns: string[] = ['select', 'id', 'isActive', 'actions'];
    multiple = true;
}

@Component({
    template: `
    <app-paged-table matSort [buttons]="buttons" [dataSource]="dataSource" [displayedColumns]="displayedColumns" [multiple]="multiple">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
            <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="isActive">
            <mat-header-cell *matHeaderCellDef mat-sort-header>Active</mat-header-cell>
            <mat-cell class="col2-cell" *matCellDef="let obj">{{obj.isActive}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="noData">
            <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                No data found
            </mat-footer-cell>
        </ng-container>
    </app-paged-table>
    `
}) class TestRemotePagedTableComponent {
    @ViewChild(PagedTableComponent) table!: PagedTableComponent<JsonApiModel>;
    buttons: TableButton[] = [EDIT_BUTTON, DELETE_BUTTON];
    dataSource: RemoteDataSource<JsonApiModel>;
    displayedColumns: string[] = ['select', 'id', 'isActive', 'actions'];
    multiple = true;

    constructor(private JsonApiDatastore: JsonApiDatastore) {
        this.dataSource = new RemoteDataSource<JsonApiModel>(JsonApiModel, this.JsonApiDatastore);
    }
}

describe('PagedTableComponent', () => {

    let datastore: JsonApiDatastore;

    describe('Local data source', () => {
        let page: TablePageHelper<TestPagedTableComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [ PagedTableComponent, TestPagedTableComponent ],
                imports: [
                    MatButtonModule,
                    MatCheckboxModule,
                    MatPaginatorModule,
                    MatSortModule,
                    MatTableModule,
                    NoopAnimationsModule,
                    MockModule(FlexLayoutModule),
                    MockModule(FontAwesomeModule)
                ]
            });

            datastore = TestBed.inject(JsonApiDatastore);
            for (let i = 0; i < 20; i++) {
                testData.push(new DummyObject(datastore, { id: i.toString() }));
            }
        });
    
        describe('No Table Data', () => {
    
            beforeEach(() => {
                // initialize component without any data
                page = init();
            });
    
            it('should not have any rows selected by default', () => {
                expect(page.component.table.selection.selected.length).toEqual(0);
                expect(page.component.table.isAllSelected()).toEqual(false);
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
                expect(page.pagingatorRange.innerText).toEqual('0 of 0');
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
                    const spy = spyOn(page.component.table.tableButtonClick, 'emit');
    
                    // when: a button is clicked in one of the rows
                    page.clickTableButton('edit', 0);
    
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
                    expect(page.pagingatorRange.innerText).toEqual(`1 – ${pageSize} of ${testData.length}`);
                });
    
                it(`should display "${pageSize + 1} - ${pageSize + pageSize} of ${testData.length}" in paginator range label when next page button clicked`, () => {
                    // when: next page button is clicked
                    page.clickNextPageButton();
    
                    // then: the paginator range label should update to next page
                    expect(page.pagingatorRange.innerText).toEqual(`${pageSize + 1} – ${pageSize + pageSize} of ${testData.length}`);
                });
            });
    
            describe('Multi-select Enabled', () => {
    
                beforeEach(() => {
                    // initialize the component with dummy data and allow multi-select
                    page = init(data);
                });
    
                describe('No rows selected initially', () => {
                    it('should not have any rows selected by default', () => {
                        expect(page.component.table.selection.selected.length).toEqual(0);
                        expect(page.component.table.isAllSelected()).toEqual(false);
                    });
    
                    it('should select all rows when checkbox in header checked', () => {
                        // when: the select all checkbox is checked
                        page.selectAll();
    
                        // then: the component should return true for isAllSelected()
                        expect(page.component.table.isAllSelected()).toEqual(true);
    
                        // and: all rows should have their checkboxes checked
                        const checkBoxes: HTMLElement[] = page.rowCheckboxes;
                        checkBoxes.forEach((checkbox: HTMLElement) => {
                            const input: HTMLInputElement = page.getCheckboxInput(checkbox);
                            expect(input.checked).toBeTrue();
                        });
                    });
    
                    it('should clear selection from all rows when checkbox in header checked if all rows selected', () => {
                        // setup: select all rows
                        page.selectAll();
    
                        // when: the select all rows button is clicked again
                        page.selectAll();
    
                        // then: no rows should have their checkboxes checked
                        const checkBoxes: HTMLElement[] = page.rowCheckboxes;
                        checkBoxes.forEach((checkbox: HTMLElement) => {
                            const input: HTMLInputElement = page.getCheckboxInput(checkbox);
                            expect(input.checked).toBeFalse();
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
                    // setup: get the checkbox from the first row
                    const checkbox: HTMLElement = page.getRowCheckboxByIndex(0);
                    const input: HTMLInputElement = page.getCheckboxInput(checkbox);
    
                    // when: the checkbox is checked
                    page.clickCheckbox(input);
    
                    // then: the checkbox should have the mat-checkbox-checked attribute
                    expect(input.checked).toBeTrue();
    
                    // when: the checkbox is unchecked
                    page.clickCheckbox(input);
    
                    // then: checkbox should be unchecked
                    expect(input.checked).toBeFalse();
                });
    
                it('should only select one row at a time', () => {
                    // setup: get all of the checkboxes in the component
                    const checkboxes: HTMLElement[] = page.rowCheckboxes;
    
                    // and: get the input elements for the first 2 checkboxes
                    const checkbox1InputElement: HTMLInputElement = page.getCheckboxInput(checkboxes[0]);
                    const checkbox2InputElement: HTMLInputElement = page.getCheckboxInput(checkboxes[1]);
    
                    // when: the first checkbox is checked
                    page.clickCheckbox(checkbox1InputElement);
    
                    // and: the second checkbox is checked
                    page.clickCheckbox(checkbox2InputElement);
    
                    // then: the second checkbox should be the only checkbox checked
                    expect(checkbox1InputElement.checked).toBeFalse();
                    expect(checkbox2InputElement.checked).toBeTrue();
                });
            });
        });
    });

    describe('Remote data source', () => {
        let jsonApiDatastore: JsonApiDatastore;
        let page: TablePageHelper<TestRemotePagedTableComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [ PagedTableComponent, TestRemotePagedTableComponent ],
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
                    JsonApiDatastore
                ]
            });

            jsonApiDatastore = TestBed.inject(JsonApiDatastore);
            for (let i = 0; i < 20; i++) {
                testData.push(new DummyObject(jsonApiDatastore, { id: i.toString() }));
            }
        });

        describe('No Table data', () => {
            beforeEach(() => {
                const queryData = new JsonApiQueryData<DummyObject>([]);
                const metaModel: any = Reflect.getMetadata('JsonApiModelConfig', DummyObject).meta;
                const mm = new metaModel({});
                spyOn(jsonApiDatastore, 'findAll').and.returnValue(of(queryData, mm));
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
                expect(page.pagingatorRange.innerText).toEqual('0 of 0');
            });
        });

        describe('With Table data', () => {
            beforeEach(() => {
                const metaModel: any = Reflect.getMetadata('JsonApiModelConfig', DummyObject).meta;
                const mm = new metaModel({});

                spyOn(jsonApiDatastore, 'findAll').and.callFake((modelType: ModelType<DummyObject>, params: any) => {
                    const mT = modelType;
                    const pageNum = parseInt(params.page, 10);
                    const pageSize = parseInt(params.page_size, 10);
                    const queryData = new JsonApiQueryData<DummyObject>(testData.slice(pageNum * pageSize, (pageNum * pageSize) + pageSize));
                    return of(queryData, mm);
                });
                page = initRemote();
            });

            it('should not display no data row', () => {
                // given: the no data row and it's parent
                const noDataRow = page.noDataRow;
                const noDataRowParent = noDataRow.parentElement;

                // expect: the parent should have "hide" class to hide row
                expect(noDataRowParent?.className).toContain('hide');
            });

            it(`should display "1 – ${pageSize} of ${testData.length}" in paginator range label`, () => {
                expect(page.pagingatorRange.innerText).toEqual(`1 – ${pageSize} of ${testData.length}`);
            });

            it(`should display "${pageSize + 1} – ${pageSize + pageSize} of ${testData.length}" in paginator range label when next page button clicked`, () => {
                // when: next page button is clicked
                page.clickNextPageButton();

                // then: the paginator range label should update to next page
                expect(page.pagingatorRange.innerText).toEqual(`${pageSize + 1} – ${pageSize + pageSize} of ${testData.length}`);
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
    data: JsonApiModel[] = [],
    multiple = true
): TablePageHelper<TestPagedTableComponent> {
    const fixture: ComponentFixture<TestPagedTableComponent> = TestBed.createComponent(TestPagedTableComponent);
    const component = fixture.componentInstance;
    component.data = data;
    component.multiple = multiple;
    fixture.detectChanges();

    // set pageSize after change detection cycle to ensure component initialized
    // and child PagedTableComponent exists
    component.table.pageSize = pageSize;
    fixture.detectChanges();

    return new TablePageHelper<TestPagedTableComponent>(fixture);
}

/**
 * Helper function to setup the Component for tests using remote data.
 *
 * @param multiple Boolean value to set whether table allows multiple selection.
 * @param pageSize The page size for data in the table.
 * @returns A page helper to aid in tests.
 */
function initRemote(
    multiple = true,
    pageSize = 5
): TablePageHelper<TestRemotePagedTableComponent> {
    const fixture: ComponentFixture<TestRemotePagedTableComponent> = TestBed.createComponent(TestRemotePagedTableComponent);
    const component = fixture.componentInstance;
    component.multiple = multiple;
    fixture.detectChanges();

    // set pageSize after change detection cycle to ensure component initialized
    // and child PagedTableComponent exists
    component.table.pageSize = pageSize;
    if (component.table.dataSource$ instanceof RemoteDataSource) {
        // also set pageSize on table datasource and refresh; need instanceof
        // RemoteDataSource since table.dataSource$ has multiple types even
        // though it should be RemoteDataSource type for these tests 
        component.table.dataSource$.pageSize = pageSize;
        component.table.dataSource$.refresh();
    }
    fixture.detectChanges();

    return new TablePageHelper<TestRemotePagedTableComponent>(fixture);
}
