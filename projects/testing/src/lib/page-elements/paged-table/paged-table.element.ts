import { ComponentFixture } from "@angular/core/testing";
import { JsonModel } from "@ngx-material-dashboard/base-json";
import { CheckboxElement } from "../checkbox/checkbox.element";
import { PageElement } from "../page/page.element";
import { PaginatorElement } from "../paginator/paginator.element";

/**
 * The `PagedTableElement` defines properties and functions useful for testing
 * components with one or more paged table components. This can be used for
 * tables where rows can be selected or not (tables that include a checkbox
 * column vs. tables that do not include a checkbox column). It defaults to
 * tables that can have one or more rows selected, but you may define a
 * table that does not have a checkbox column when you create a
 * `PagedTableElement` (simply pass `false` for the `selectable` parameter for
 * the constructor).
 * 
 * > NOTE: If you configure a PagedTableElement as not selectable, then
 * > functions that relate to selection capabilities will throw an error and
 * > should result in failures in your tests.
 * 
 * @overviewDetails
 * ## Basic Usage Example
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
 * ## Features
 * 
 * `PagedTableElements` have multiple features built in, including the ability
 * to get all displayed column header values, get the row displayed when there
 * is not table data (if it is being displayed), click buttons in any row of
 * the table, get the contents of any cell given row and column, check if all
 * rows are selected, check if a single row is selected, select all rows, and
 * select individual rows.
 * 
 * ### Displayed Columns
 * 
 * The `displayedColumns` getter will return an array of `HTMLElements` header
 * cells from the table. The contents of the `HTMLElements` should be the
 * column header text.
 * 
 * ### No Data Row
 * 
 * The `noDataRow` getter returns the `HTMLElement` containing the no data row.
 * If there is data in the table the element's parent should have the `hide`
 * class.
 * 
 * ### Click Table Button
 * 
 * The `clickTableButton` method clicks the button with the given text in the
 * given row and column. If your actions column is defined last you can omit
 * the column as this defaults to the last column in the table.
 * 
 * ### Get Cell Contents
 * 
 * The `getCellByColumnIndex` returns an HTMLElement with the cell contents at
 * the given row and column. Now that I'm writing the documentation the name of
 * this method is a bit of a misnomer. Should be by row and column index.
 * 
 * ### All Rows Selected
 * 
 * The `isAllSelected` method returns true if all rows in the table are
 * selected. Otherwise returns false.
 * 
 * ### Is Row Selected
 * 
 * The `isRowSelected` method returns true if the row at the given index is
 * selected.
 * 
 * ### Select All Rows
 * 
 * The `selectAll` function clicks the checkbox in the header which should
 * select all rows in the table (or deselect all rows if all selected). This
 * method is asynchronous, so you should use async/await when calling this
 * in your code.
 * 
 * ### Select Row
 * 
 * The `selectRow` function clicks the checkbox at the given row. This method
 * is asynchronouse, sou you should use async/await when calling this in your
 * code.
 */
export class PagedTableElement extends PageElement {

    /** The HTML element containing the table. */
    private tableElement: HTMLElement;
    columnHeaders: HTMLElement[];
    /** The component instance containing the table. */
    component: any;
    /** The paginator element included with the table. */
    paginator: PaginatorElement;
    /** An array of all HTMLElement rows from the table. */
    rows!: HTMLElement[];
    /** Array of all checkboxes in table (excludes header checkbox).*/
    rowCheckboxes!: CheckboxElement[];

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
        private selectable = true,
        private noDataColumnSelector = 'noData'
    ) {
        super(fixture);

        this.component = fixture.componentInstance;
        this.tableElement = this.query<HTMLElement>(selector);
        this.columnHeaders = Array.from(this.queryAll<HTMLElement>('mat-header-cell', this.tableElement));
        this.paginator = new PaginatorElement(fixture, this.tableElement);
        this.initRowsAndCheckboxes();
    }

    /**
     * Returns an array of all HTMLElement header cells from the table.
     *
     * @returns An array of header cells displayed in the table.
     */
    get displayedColumns(): HTMLElement[] {
        return this.queryAll<HTMLElement>('mat-header-cell', this.tableElement);
    }

    /**
     * Returns the no data row.
     * 
     * @returns The row displayed when there is no data in the table.
     */
    get noDataRow(): HTMLElement {
        return this.query<HTMLElement>(`.mat-column-${this.noDataColumnSelector}`, this.tableElement);
    }

    /**
     * Returns the checkbox in the header for selecting all visible rows.
     */
    get selectAllCheckbox(): CheckboxElement {
        const element: HTMLElement = this.query<HTMLElement>('.marker-checkbox-select-all', this.tableElement);
        return new CheckboxElement(this.fixture, element);
    }

    /**
     * Sets the data for the table.
     */
    set data(data: JsonModel[]) {
        this.component.data = data;
        this.fixture.detectChanges();
        this.initRowsAndCheckboxes();
    }

    /**
     * Initializes the rows and row checkboxes. Called when element initially
     * created, and when data set for element (so rows and corresponding
     * checkboxes are updated accordingly).
     */
    private initRowsAndCheckboxes() {
        try {
            this.rows = this.queryAll<HTMLElement>('mat-row', this.tableElement);
        } catch(error: any) {
            if (error.message.toString().includes('mat-row not found in')) {
                // this should happen when no data loaded in table; might be
                // possible that mat-row just not defined though...
                this.rows = [];
            } else {
                // something else happened; throw error so user can see (not
                // really sure what this would be but throw error just in case)
                throw error;
            }
        }

        // re-initialize row checkboxes and query for CSS selectors if applicable
        this.rowCheckboxes = [];
        if (this.rows.length > 0 && this.selectable) {
            // only query for row checkboxes if rows available and table selectable 
            const checkboxes: HTMLElement[] = this.queryAll<HTMLElement>('.marker-checkbox-row-select', this.tableElement);

            // add each checkbox HTML element to row checkboxes
            checkboxes.forEach((checkbox: HTMLElement) => {
                this.rowCheckboxes.push(new CheckboxElement(this.fixture, checkbox));
            })
        }
    }

    /**
     * Clicks the header for the column with the given name. This is meant to
     * help with simulating a click to sort the column with the given name.
     * The given name should match the value defined in matColumnDef.
     *
     * @param columnName The name of the column defined in matColumnDef.
     */
    clickColumnHeader(columnName: string): void {
        const headerCell = this.columnHeaders.find((it: HTMLElement) =>
            it.classList.contains(`mat-column-${columnName}`)
        );
        if (headerCell == null) {
            // throw an error if the header column is not found
            throw new Error(`Expected mat-header-cell with name "${columnName}"`);
        } else {
            headerCell.click();
        }
    }

    /**
     * Clicks a button in the table actions column of the given row.
     *
     * @param click The button to click.
     * @param rowIndex The row where the button should be clicked.
     * @param colIndex The column where the button should be (defaults to the last column in table).
     */
    clickTableButton(click: string, rowIndex: number, colIndex = this.displayedColumns.length - 1): void {
        const buttonCell: HTMLElement = this.getCellByColumnIndex(rowIndex, colIndex);
        const button: HTMLButtonElement | null = buttonCell.querySelector(`.button-marker-${click}`);
        if (button == null) {
            // throw an error if the button is not found
            throw new Error(`Expected HTMLButtonElement with CSS selector ".button-marker-${click}" in table actions column`);
        } else {
            // click the button if it is not null
            button.click();
        }
    }

    /**
     * Returns an HTMLElement of the cell by the given row and column index.
     *
     * @param rowIndex The index of the row that contains the desired cell.
     * @param colIndex The index of the column that contains the desired cell.
     * @returns An HTMLElement of the cell in the row at the given column index.
     */
    getCellByColumnIndex(rowIndex: number, colIndex: number): HTMLElement {
        const cells = Array.from(this.rows[rowIndex].querySelectorAll('mat-cell') as NodeListOf<HTMLElement>);
        return cells[colIndex];
    }

    /**
     * Returns true if header checkbox is checked.
     *
     * @returns True if header checkbox is checked. 
     */
    isAllSelected(): boolean {
        if (this.selectable) {
        return this.selectAllCheckbox.checked;
        } else {
            throw Error('Table is not selectable');
        }
    }

    /**
     * Returns true if the row with the given index is selected (i.e. that it's
     * checkbox is checked).
     *
     * @param index The index of the row to test.
     * @returns True if the row with the given index is selected.
     */
    isRowSelected(index: number): boolean {
        if (this.selectable) {
            return this.rowCheckboxes[index].checked;
        } else {
            throw Error('Table is not selectable');
        }
    }

    /**
     * Selects the checkbox in the row at the given index.
     *
     * @param index The row to click the checkbox in.
     */
    public async selectRow(index: number): Promise<void> {
        if (this.selectable) {
            await this.rowCheckboxes[index].click();
        } else {
            throw Error('Table is not selectable');
        }
    }

    /**
     * Selects the select all checkbox in the header of the table to mark all
     * visible checkboxes as selected (i.e. checked).
     */
     public async selectAll(): Promise<void> {
        if (this.selectable) {
            await this.selectAllCheckbox.click();
        } else {
            throw Error('Table is not selectable');
        }
    }
}
