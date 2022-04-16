import { ComponentFixture } from "@angular/core/testing";
import { JsonApiModel } from "@ngx-material-dashboard/json-api";
import { CheckboxElement } from "./checkbox.element";
import { PageElement } from "./page/page.element";
import { PaginatorElement } from "./paginator.element";

/**
 * The PagedTableElement defines properties and functions useful for testing
 * components with one or more paged table components. This can be used for
 * tables where rows can be selected or not (tables that include a checkbox
 * column vs. tables that do not include a checkbox column). Obviously if rows
 * cannot be selected then you should avoid calling functions that depend on 
 * the table including the checkbox column.
 * TODO create separate "selectable" paged table element to avoid issues?
 */
export class PagedTableElement extends PageElement {

    /** The HTML element containing the table. */
    private tableElement: HTMLElement;
    /** The component instance containing the table. */
    component: any;
    /** The paginator element included with the table. */
    paginator: PaginatorElement;
    /** An array of all HTMLElement rows from the table. */
    rows: HTMLElement[];
    /** 
     * An array of all HTMLElement checkboxes from the rows in the table
     * (excludes the select all checkbox from the header).
     */
    rowCheckboxes: HTMLElement[];

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
        private noDataColumnSelector = 'noData'
    ) {
        super(fixture);

        this.component = fixture.componentInstance;
        this.tableElement = this.query<HTMLElement>(selector);
        this.paginator = new PaginatorElement(fixture, this.tableElement);
        this.rows = this.queryAll<HTMLElement>('mat-row', this.tableElement);

        if (selectable) {
            // only query for row checkboxes if table is selectable
            this.rowCheckboxes = this.queryAll<HTMLElement>('.marker-checkbox-row-select', this.tableElement);
        } else {
            this.rowCheckboxes = [];
        }
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
    get selectAllCheckbox(): HTMLElement {
        return this.query<HTMLElement>('.marker-checkbox-select-all', this.tableElement);
    }

    /**
     * Sets the data for the table.
     */
    set data(data: JsonApiModel[]) {
        this.component.data = data;
        this.fixture.detectChanges();
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
            throw new Error('Expected HTMLButtonElement in table actions column');
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
     * Returns true if the row with the given index is selected (i.e. that it's
     * checkbox is checked).
     *
     * @param index The index of the row to test.
     * @returns True if the row with the given index is selected.
     */
    isRowSelected(index: number): boolean {
        const checkboxHTMLElement: HTMLElement = this.rowCheckboxes[index];
        const checkBox: CheckboxElement = new CheckboxElement(this.fixture, checkboxHTMLElement);
        return checkBox.checked;
    }

    /**
     * Selects the checkbox in the row at the given index.
     *
     * @param index The row to click the checkbox in.
     */
    public async selectRow(index: number): Promise<void> {
        const checkboxHTMLElement: HTMLElement = this.rowCheckboxes[index];
        const checkBox: CheckboxElement = new CheckboxElement(this.fixture, checkboxHTMLElement);
        await checkBox.click();
    }

    /**
     * Selects the select all checkbox in the header of the table to mark all
     * visible checkboxes as selected (i.e. checked).
     */
     public async selectAll(): Promise<void> {
        const checkboxHTMLElement: HTMLElement = this.selectAllCheckbox;
        const checkBox: CheckboxElement = new CheckboxElement(this.fixture, checkboxHTMLElement);
        await checkBox.click();
    }
}
