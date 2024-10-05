/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { ComponentFixture } from '@angular/core/testing';
import { CheckboxElement } from '../checkbox/checkbox.element';
import { PaginatorElement } from '../paginator/paginator.element';
import { SelectElement } from '../select/select.element';
import { ToolbarElement } from '../toolbar/toolbar.element';

export class IconButtonsWithPaginatorBarElement extends ToolbarElement {
    paginator: PaginatorElement;
    /** Boolean value indicating whether collection has items that are sortable (defaults to true). */
    sortable: boolean;
    /** Optional sorter element found in fixture (if collection is sortable). */
    sorter?: SelectElement;

    constructor(
        fixture: ComponentFixture<any>,
        buttonSelectors?: string[],
        toolbarSelector: string = '.marker-collection-toolbar',
        sortable = true
    ) {
        super(fixture, buttonSelectors, toolbarSelector);
        this.sortable = sortable;
        this.paginator = new PaginatorElement(
            fixture,
            this.fixture.nativeElement
        );

        if (this.sortable) {
            try {
                this.sorter = new SelectElement(
                    fixture,
                    this.query<HTMLElement>('.mat-sort', this.toolbar)
                );
            } catch (error) {
                console.error('.mat-sort not found in paginator bar element');
            }
        }
    }

    /**
     * Returns the checkbox for selecting all items.
     */
    get selectAllCheckbox(): CheckboxElement | undefined {
        try {
            const element: HTMLElement = this.query<HTMLElement>(
                '.marker-checkbox-select-all',
                this.fixture.nativeElement
            );
            return new CheckboxElement(this.fixture, element);
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Returns true if select all checkbox is checked.
     *
     * @returns True if select all checkbox is checked.
     */
    isAllSelected(): boolean {
        if (this.selectAllCheckbox) {
            return this.selectAllCheckbox.checked;
        } else {
            throw Error('Select all checkbox undefined');
        }
    }
}
