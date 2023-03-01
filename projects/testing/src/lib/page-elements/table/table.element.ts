/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { ComponentFixture } from '@angular/core/testing';
import { CollectionElement } from '../collection/collection.element';

/**
 * The `Table` addes properties and functions to the `Collection` specific to
 * testing components with tables. Things specific to table components are
 * column headers, ability to click column headers (for sorting), displaying a
 * noData row, and getting the contents of a particular cell in the table.
 */
export class TableElement extends CollectionElement {
    columnHeaders: HTMLElement[];

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
        super(
            fixture,
            selector,
            'mat-row',
            '.marker-checkbox-row-select',
            selectable
        );

        this.component = fixture.componentInstance;
        this.columnHeaders = Array.from(
            this.queryAll<HTMLElement>(
                'mat-header-cell',
                this.collectionElement
            )
        );
    }

    /**
     * Returns an array of all HTMLElement header cells from the table.
     *
     * @returns An array of header cells displayed in the table.
     */
    get displayedColumns(): HTMLElement[] {
        return this.queryAll<HTMLElement>(
            'mat-header-cell',
            this.collectionElement
        );
    }

    /**
     * Returns the no data row.
     *
     * @returns The row displayed when there is no data in the table.
     */
    get noDataRow(): HTMLElement {
        return this.query<HTMLElement>(
            `.mat-column-${this.noDataColumnSelector}`,
            this.collectionElement
        );
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
            throw new Error(
                `Expected mat-header-cell with name "${columnName}"`
            );
        } else {
            headerCell.click();
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
        const cells = Array.from(
            this.items[rowIndex].querySelectorAll(
                'mat-cell'
            ) as NodeListOf<HTMLElement>
        );
        return cells[colIndex];
    }
}
