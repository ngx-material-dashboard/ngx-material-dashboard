import { ComponentFixture } from "@angular/core/testing";
import { PageElement } from "./page/page.element";
import { PagedTableElement } from "./paged-table.element";
import { ToolbarElement } from "./toolbar.element";

/**
 * The PagedTableWithToolbarElement defines properties and functions useful for
 * testing components with one or more paged table with toolbar components.
 */
export class PagedTableWithToolbarElement extends PageElement {

    /** The paged table element. */
    table: PagedTableElement;
    /** The toolbar element. */
    toolbar: ToolbarElement;

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
        private noDataColumnSelector = 'noData'
    ) {
        super(fixture);

        this.table = new PagedTableElement(fixture, tableSelector, selectable, noDataColumnSelector);
        this.toolbar = new ToolbarElement(fixture, buttonSelectors);
    }
}
