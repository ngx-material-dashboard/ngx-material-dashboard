import { ComponentFixture } from '@angular/core/testing';

import { PaginatorElement } from '../paginator/paginator.element';
import { TableElement } from '../table/table.element';

/**
 * The `PagedTable` addes paging capabilities to the `Table` by adding a
 * `Paginator` property.
 *
 * @overviewDetails
 * #### Basic Usage Example
 * ```typescript
 * // other imports...
 * import { PagedTableElement, TEST_DATA } from '@ngx-material-dashboard/testing'
 * import { ExamplePagedTableComponent } from './example-paged-table.component'
 *
 * describe('ExamplePagedTableComponent', () => {
 *
 *     let pagedTable: PagedTableElement;
 *
 *     beforeEach(() => {
 *         TestBed.configureTestingModule({...});
 *         const fixture = TestBed.createComponent(ExamplePagedTableComponent);
 *
 *         // set pageSize after change detection cycle to ensure component
 *         // initialized and PagedTableComponent (which should be child of
 *         // ExamplePagedTableComponent) exists
 *         component.table.pageSize = pageSize;
 *         fixture.detectChanges();
 *
 *         // create the PagedTable PageElement (NOTE: this assumes you defined a
 *         // CSS selector marker for the table as defined below; this is in case
 *         // you have a component with more than 1 PagedTable, each table should
 *         // have their own CSS selector for the PagedTable element to work
 *         // correctly)
 *         pagedTable = new PagedTable(fixture, '.marker-example-paged-table');
 *     });
 *
 *     describe('No Table Data', () => {
 *
 *         it('should display no data row', () => {
 *             // given: the no data row
 *             const noDataRow: HTMLElement = pagedTable.noDataRow;
 *
 *             // expect: the row to be defined
 *             expect(noDataRow).toBeDefined();
 *
 *             // and: the text of the row to be 'No data found'
 *             expect(noDataRow.innerText).toEqual('No data found');
 *         });
 *
 *         it('should display "0 of 0" in paginator range label', () => {
 *             expect(pagedTable.paginator.pagingatorRange.innerText).toEqual('0 of 0');
 *         });
 *     });
 *
 *     describe('With Table Data', () => {
 *
 *         beforeEach(() => {
 *             pagedTable.data = TEST_DATA // set some test data for the table
 *         });
 *
 *         it('should not display no data row', () => {
 *             // given: the no data row and it's parent
 *             const noDataRow = pagedTable.noDataRow;
 *             const noDataRowParent = noDataRow.parentElement;
 *
 *             // expect: the parent should have "hide" class to hide row
 *             expect(noDataRowParent?.className).toContain('hide');
 *         });
 *
 *         it(`should display "1 – ${pageSize} of ${TEST_DATA.length}" in paginator range label`, () => {
 *             expect(pageTable.paginator.pagingatorRange.innerText).toEqual(`1 – ${pageSize} of ${TEST_DATA.length}`);
 *         });
 *     });
 * });
 * ```
 *
 * #### Features
 *
 * `PagedTableElements` have multiple features built in, including the ability
 * to get all displayed column header values, get the row displayed when there
 * is not table data (if it is being displayed), click buttons in any row of
 * the table, get the contents of any cell given row and column, check if all
 * rows are selected, check if a single row is selected, select all rows, and
 * select individual rows.
 *
 * ##### Displayed Columns
 *
 * The `displayedColumns` getter will return an array of `HTMLElements` header
 * cells from the table. The contents of the `HTMLElements` should be the
 * column header text.
 *
 * ##### No Data Row
 *
 * The `noDataRow` getter returns the `HTMLElement` containing the no data row.
 * If there is data in the table the element's parent should have the `hide`
 * class.
 *
 * ##### Get Cell Contents
 *
 * The `getCellByColumnIndex` returns an HTMLElement with the cell contents at
 * the given row and column. Now that I'm writing the documentation the name of
 * this method is a bit of a misnomer. Should be by row and column index.
 */
export class PagedTableElement extends TableElement {
    /** The paginator element included with the table. */
    paginator: PaginatorElement;

    /**
     * Creates a new PagedTableElement.
     *
     * @param fixture Fixture for component under test.
     * @param selector CSS selector for table (this should be unique for each table in case of multiple).
     * @param selectable Boolean value indicating whether table has rows that are selectable (defaults to true).
     * @param noDataColumnSelector Optional CSS selector for no data column definition (defaults to 'noData').
     */
    constructor(
        fixture: ComponentFixture<any>,
        selector: string,
        selectable = true,
        noDataColumnSelector = 'noData'
    ) {
        super(fixture, selector, selectable, noDataColumnSelector);

        this.component = fixture.componentInstance;
        this.columnHeaders = Array.from(
            this.queryAll<HTMLElement>(
                'mat-header-cell',
                this.collectionElement
            )
        );
        this.paginator = new PaginatorElement(fixture, this.collectionElement);
    }
}
