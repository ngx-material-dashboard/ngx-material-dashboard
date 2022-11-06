import { ComponentFixture } from '@angular/core/testing';

import { CollectionElement } from '../collection/collection.element';
import { PaginatorElement } from '../paginator/paginator.element';

/**
 * The `PagedCollection` adds paging capabilities to the `CollectionElement`
 * by adding a `Paginator` property. See the documentation for the
 * [Collection](/testing/elements/collection) and the
 * [Paginator](/testing/elements/paginator).
 */
export class PagedCollectionElement extends CollectionElement {
    
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
        itemSelector: string,
        itemCheckboxSelector: string,
        selectable = true
    ) {
        super(fixture, selector, itemSelector, itemCheckboxSelector, selectable);

        this.component = fixture.componentInstance;
        this.collectionElement = this.query<HTMLElement>(selector);
        this.paginator = new PaginatorElement(fixture, this.collectionElement);
    }
}