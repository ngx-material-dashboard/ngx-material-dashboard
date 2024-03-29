/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import {
    faArrowDownShortWide,
    faArrowUpWideShort,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';

/**
 * A custom component meant to allow user to change sort order for paged
 * collections. This is basically just a wrapper around `MatSelect` providing
 * some additional display details and an @Output emitter for the field to
 * sort on and order selected needed in the parent component to handle the
 * sort change for the collection.
 */
@Component({
    selector: 'ngx-mat-sorter',
    templateUrl: './sorter.component.html',
    styleUrls: ['./sorter.component.css']
})
export class SorterComponent extends MatSort implements OnInit {
    /** The icon used for displaying current sort order. */
    faSort: IconDefinition = faArrowUpWideShort;
    /** The options to display in the select drop down. */
    selectOptions: {
        field: string;
        icon: IconDefinition;
        order: string;
        text: string;
    }[] = [];
    /** The list of fields to include in the sort. */
    @Input() options: { field: string; text: string }[] | string[] = [];

    constructor() {
        super();
    }

    /**
     * Lifecycle method automatically called by angular when the component is
     * initialized.
     */
    override ngOnInit(): void {
        super.ngOnInit();
        for (const option of this.options) {
            this.selectOptions.push({
                field: typeof option === 'string' ? option : option.field,
                icon: faArrowUpWideShort,
                order: 'asc',
                text: typeof option === 'string' ? option : option.text
            });
            this.selectOptions.push({
                field: typeof option === 'string' ? option : option.field,
                icon: faArrowDownShortWide,
                order: 'desc',
                text: typeof option === 'string' ? option : option.text
            });
            this.sortables.set(
                typeof option === 'string' ? option : option.text,
                {
                    id: typeof option === 'string' ? option : option.text,
                    start: 'asc',
                    disableClear: true
                }
            );
        }
    }

    /**
     * Handler for when the user selects an option in the drop down. Emits the
     * needed sort event to the parent so it can handle changing the sort
     * order for the data in the collection.
     *
     * @param event The event containing the value selected in the drop down.
     */
    onSelectionChange(event: MatSelectChange): void {
        this.active = event.value.text;
        this.faSort = event.value.icon;
        this.direction = event.value.order;
        this.sortChange.emit({
            active: event.value.field,
            direction: this.direction
        });
    }
}
