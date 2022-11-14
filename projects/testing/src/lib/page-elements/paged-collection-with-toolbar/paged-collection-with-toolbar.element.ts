import { ComponentFixture } from '@angular/core/testing';

import { PagedCollectionElement } from '../paged-collection/paged-collection.element';
import { ToolbarElement } from '../toolbar/toolbar.element';

export class PagedCollectionWithToolbarElement extends PagedCollectionElement {

    toolbar: ToolbarElement;

    constructor(fixture: ComponentFixture<any>,
        selector: string,
        itemSelector: string,
        itemCheckboxSelector: string,
        buttonSelectors: string[],
        selectable = true
    ) {
        super(fixture, selector, itemSelector, itemCheckboxSelector, selectable);
        this.toolbar = new ToolbarElement(fixture, buttonSelectors);
    }
}
