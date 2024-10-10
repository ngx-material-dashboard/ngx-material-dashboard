/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { Component, Input, OnInit } from '@angular/core';
import { MatSort, SortDirection } from '@angular/material/sort';
import {
    faArrowDownShortWide,
    faArrowUpWideShort,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { SortOption } from '../../interfaces/sort-option.interface';
import { FormControl, FormGroup } from '@angular/forms';

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
    /** Text displayed for active selection in select drop down. */
    activeDisplay?: string;
    /** The icon used for displaying current sort order. */
    faSort: IconDefinition = faArrowUpWideShort;
    /** The form with the sort select drop down. */
    form!: FormGroup;
    /** The options to display in the select drop down. */
    selectOptions: {
        field: string;
        icon: IconDefinition;
        order: SortDirection;
        text: string;
    }[] = [];
    /** The control for the sort select drop down. */
    sortControl: FormControl = new FormControl();
    /** The list of fields to include in the sort. */
    @Input() options: SortOption[] | string[] = [];

    constructor() {
        super();
        this.form = new FormGroup({
            sort: this.sortControl
        });
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
            this.register({
                id: typeof option === 'string' ? option : option.field,
                start: 'asc',
                disableClear: true
            });
        }

        if (this.active) {
            const sortValue = this.selectOptions.findIndex((it) => {
                return it.field === this.active && it.order === this.direction;
            });

            if (sortValue >= 0) {
                // ensure sortValue is defined (i.e. >= 0)
                this.sortControl.setValue(sortValue);
                const option = this.selectOptions[sortValue];
                this.active = option.field;
                this.activeDisplay = option.text;
                this.faSort = option.icon;
            }
        }

        this.sortControl.valueChanges.subscribe((val) => {
            this.onSelectionChange(val);
        });
    }

    /**
     * Handler for when the user selects an option in the drop down. Emits the
     * needed sort event to the parent so it can handle changing the sort
     * order for the data in the collection.
     *
     * @param event The value selected in the drop down.
     */
    onSelectionChange(val: number): void {
        const option = this.selectOptions[val];
        this.active = option.field;
        this.activeDisplay = option.text;
        this.faSort = option.icon;
        this.direction = option.order;
        this.sortChange.emit({
            active: this.active,
            direction: this.direction
        });
    }
}
