/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { ComponentFixture } from '@angular/core/testing';

import { PagedCollectionWithToolbarElement } from '../paged-collection-with-toolbar/paged-collection-with-toolbar.element';
import { PagedTableElement } from '../paged-table/paged-table.element';

/**
 * The `PagedTableWithToolbarElement` defines properties and functions useful
 * for testing components with one or more paged table with toolbar components.
 * It effectively provides a wrapper for the `PagedTableElement` and
 * `ToolbarElement`, so you can treat it as a single object and just reference
 * the table or toolbar as needed in your tests.
 *
 * If you define a `PagedTableWithToolbarElement`, the element will
 * automatically configure the `PagedTableElement` and `ToolbarElement` needed.
 * See the [PagedTableElement](/testing/page-elements/paged-table) and
 * [ToolbarElement](/testing/page-elements/toolbar) for more details.
 */
export class PagedTableWithToolbarElement extends PagedCollectionWithToolbarElement {
    /** The paged table element. */
    override collection: PagedTableElement;
    /** The toolbar element. */
    //override toolbar: ToolbarElement;

    /**
     * Creates a new PagedTableElement.
     *
     * @param fixture Fixture for component under test.
     * @param tableSelector CSS selector for table (this should be unique for each table in case of multiple).
     * @param buttonSelectors List of CSS selectors for all buttons on toolbar (if it has toolbar there should be buttons).
     * @param selectable Boolean value indicating whether table has rows that are selectable (defaults to true).
     * @param noDataColumnSelector Optional CSS selector for no data column definition (defaults to 'noData').
     */
    constructor(
        fixture: ComponentFixture<any>,
        tableSelector: string,
        buttonSelectors: string[],
        selectable = true,
        toolbarType: string = 'raised-buttons',
        noDataColumnSelector = 'noData'
    ) {
        super(
            fixture,
            tableSelector,
            'mat-row',
            '.marker-checkbox-row-select',
            buttonSelectors,
            selectable,
            toolbarType
        );

        this.collection = new PagedTableElement(
            fixture,
            tableSelector,
            selectable,
            noDataColumnSelector
        );
        //this.toolbar = new ToolbarElement(fixture, buttonSelectors);
    }
}
