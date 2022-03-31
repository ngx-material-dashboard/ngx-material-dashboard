import { ComponentFixture } from '@angular/core/testing';
import { JsonApiModel } from '@ngx-material-dashboard/json-api';
import { Page } from './page.helper';

/**
 * The TablePageHelper class is meant to be a base class that provides helper
 * functions for unit testing components with MatTable elements.
 */
export class TablePageHelper<T> extends Page<T> {

    /** The instance of the root component class for the fixture. */
    component: any;
    noDataColumn: string;

    constructor(fixture: ComponentFixture<T>, noDataColumn = 'noData') {
        super(fixture);
        this.component = fixture.componentInstance;
        this.noDataColumn = noDataColumn;
    }

    /**
     * Returns an array of all HTMLElement header cells from the table.
     *
     * @returns An array of header cells displayed in the table.
     */
    get displayedColumns(): HTMLElement[] {
        return this.queryAll<HTMLElement>('mat-header-cell');
    }

    /**
     * Returns the no data row.
     * 
     * @returns The row displayed when there is no data in the table.
     */
    get noDataRow(): HTMLElement {
        return this.query<HTMLElement>(`.mat-column-${this.noDataColumn}`);
    }

    get pagingatorRange(): HTMLElement {
        return this.query<HTMLElement>('.mat-paginator-range-label');
    }

    /**
     * Returns an array of all HTMLElement rows from the table.
     *
     * @returns An array of rows from the table.
     */
    get rows(): HTMLElement[] {
        return this.queryAll<HTMLElement>('mat-row');
    }

    /**
     * Returns an array of all HTMLElement checkboxes from the rows in the
     * table (excludes the select all checkbox from the header).
     *
     * @returns An array of checkboxes from the rows in the table.
     */
    get rowCheckboxes(): HTMLElement[] {
        return this.queryAll<HTMLElement>('.marker-checkbox-row-select');
    }

    /**
     * Returns the checkbox in the header for selecting all visible rows.
     */
    get selectAllCheckbox(): HTMLElement {
        return this.query<HTMLElement>('.marker-checkbox-select-all');
    }

    /**
     * Sets the data for the table.
     */
    set data(data: JsonApiModel[]) {
        this.component.data = data;
        this.fixture.detectChanges();
    }

    /**
     * Clicks the next page button.
     */
    clickNextPageButton(): void {
        this.clickPageButtonHelper('.mat-paginator-navigation-next');
    }

    /**
     * Clicks the previous button.
     */
    clickPreviousPageButton(): void {
        this.clickPageButtonHelper('.mat-paginator-navigation-previous');
    }

    /**
     * Finds and clicks the button with the given class marker.
     *
     * @param marker The class to query for the button.
     */
    private clickPageButtonHelper(marker: string): void {
        const button = this.query<HTMLElement>(marker);
        button.click();
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
        const cells = Array.from(this.getRowByIndex(rowIndex).querySelectorAll('mat-cell') as NodeListOf<HTMLElement>);
        return cells[colIndex];
    }

    /**
     * Returns an HTMLElement of the row at the given index.
     *
     * @param index The index of the row to return.
     * @returns An HTMLElement of the row at the given index.
     */
    getRowByIndex(index: number): HTMLElement {
        return this.rows[index];
    }

    /**
     * Returns an HTMLElement of the row checkbox at the given index.
     *
     * @param index The index of the row's checkbox to return.
     * @returns An HTMLElement of the row's checkbox at the given index.
     */
    getRowCheckboxByIndex(index: number): HTMLElement {
        return this.rowCheckboxes[index];
    }

    /**
     * Selects the select all checkbox in the header of the table to mark all
     * visible checkboxes as selected (i.e. checked).
     */
    selectAll(): void {
        const checkbox: HTMLElement = this.selectAllCheckbox;
        const input: HTMLInputElement = this.getCheckboxInput(checkbox);
        this.clickCheckbox(input);
    }

    /**
     * Selects the checkbox in the row at the given index.
     *
     * @param index The row to click the checkbox in.
     */
    selectRow(index: number): void {
        const checkbox: HTMLElement = this.getRowCheckboxByIndex(index);
        const input: HTMLInputElement = this.getCheckboxInput(checkbox);
        this.clickCheckbox(input);
    }
}
