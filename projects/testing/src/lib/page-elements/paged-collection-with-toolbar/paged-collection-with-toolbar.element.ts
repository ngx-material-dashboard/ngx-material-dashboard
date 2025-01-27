/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { ComponentFixture } from '@angular/core/testing';
import { CollectionElement } from '../collection/collection.element';
import { IconButtonsWithPaginatorBarElement } from '../icon-buttons-with-paginator-bar/icon-buttons-with-paginator-bar.element';

import { PagedCollectionElement } from '../paged-collection/paged-collection.element';
import { ToolbarElement } from '../toolbar/toolbar.element';

export class PagedCollectionWithToolbarElement {
    collection: CollectionElement | PagedCollectionElement;
    toolbar: ToolbarElement | IconButtonsWithPaginatorBarElement;

    constructor(
        fixture: ComponentFixture<any>,
        selector: string,
        itemSelector: string,
        itemCheckboxSelector: string,
        buttonSelectors: string[],
        selectable: boolean = true,
        toolbarType: string = 'raised-buttons'
    ) {
        if (toolbarType === 'raised-buttons') {
            this.collection = new PagedCollectionElement(
                fixture,
                selector,
                itemSelector,
                itemCheckboxSelector,
                selectable
            );
            this.toolbar = new ToolbarElement(fixture, buttonSelectors);
        } else {
            this.collection = new CollectionElement(
                fixture,
                selector,
                itemSelector,
                itemCheckboxSelector,
                selectable
            );
            this.toolbar = new IconButtonsWithPaginatorBarElement(
                fixture,
                buttonSelectors
            );
        }
    }
}
