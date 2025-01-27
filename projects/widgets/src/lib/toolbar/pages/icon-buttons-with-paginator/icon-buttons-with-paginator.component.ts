/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { ButtonClick } from '../../interfaces/button-click.interface';
import { ToolbarButton } from '../../interfaces/toolbar-button.interface';
import { SorterComponent } from '../sorter/sorter.component';

/**
 * A toolbar that renders `mat-icon-button`s and a paginator with optional
 * select checkbox and sorting capability. It is designed to be rendered above
 * paged collections since the paginator is automatically included on the right
 * side of the toolbar. Unlike the `RaisedButtonToolbar you cannot control the
 * button alignment; buttons are aligned left, after the optional select
 * checkbox, and the paginator is aligned to the right side of the page, after
 * the optional `Sorter`.
 *
 * #### Features
 *
 * You may optionally exclude a select checkbox and `Sorter`. These default to
 * automatically be included. Simply set the corresponding `display` input
 * value to `false` if you want to exclude either feature. You can also
 * customize the paginator using the same paramters as `mat-paginator`.
 *
 * ##### Optional Select Checkbox
 *
 * The optional select checkbox is meant to act as a master toggle for
 * collections, similar to the master toggle rendered in the header row above
 * a table with select option. See the material
 * [docs](https://material.angular.io/components/table/examples#table-selection)
 * for what I'm talking about. If included it is the first thing rendered in
 * the toolbar so it can line up with collection content rendered as a list. If
 * you use the PagedListWithRaisedButtonToolbar, you should see the checkbox
 * line up with the checkbox rendered for each row in the list (just like it is
 * in the table with select). This was made optional so this toolbar can be used
 * above the `PagedTable` that already includes the master toggle select in the
 * header row (there is no reason to include multiple master toggles).
 *
 * To handle when the user (de)selects the checkbox you can use the
 * `masterToggle` output event emitter in the parent component.
 *
 * ##### Paginator
 *
 * The paginator used is the `mat-paginator` provided by Angular Material, and
 * you can use the same properties you would use to control the component as if
 * you were using `mat-paginator` directly. This means you can hide the page
 * size options as well as configure the list of avaialable options if not
 * hidden, set the current page size, and control if the first/last buttons
 * should be rendered. You may also control the prefix for the page label
 * when the range is included which defaults to the empty string resulting in
 * "x - y of z". Setting the `rangeLabelPrefix` to 'Page' will result in
 * "Page x - y of z". See the
 * [API](/widgets/toolbar/api#icon-buttons-with-paginator-component), for more
 * details.
 *
 * ##### Sorter
 *
 * The optional `Sorter` is rendered before the `MatPaginator` and is meant
 * to sort contents of the collection. Like the masterToggle, this is optional
 * so this toolbar can be used above the `PagedTable`, which already includes
 * sorting in the header row.
 */
@Component({
    selector: 'ngx-mat-icon-buttons-with-paginator',
    templateUrl: './icon-buttons-with-paginator.component.html',
    styleUrls: ['./icon-buttons-with-paginator.component.scss']
})
export class IconButtonsWithPaginatorComponent<T extends JsonModel>
    implements AfterViewInit
{
    /** The management buttons to display in the toolbar. */
    @Input() buttons: ToolbarButton[] = [];
    /** Boolean to indicate whether to render the select all checkbox. */
    @Input() displaySelectAll: boolean = true;
    /** Boolean to indicate whether to render the sort drop down. */
    @Input() displaySort: boolean = true;
    /** The fields to render in the sort drop down. */
    @Input() fields: { field: string; text: string }[] | string[] = [];
    /** Boolean to indicate if page size should be hidden. */
    @Input() hidePageSize: boolean = false;
    /** Boolean to indicate whether all items are selected. */
    @Input() isAllSelected: boolean = false;
    /** The total number of items in the collection. */
    @Input() length: number = 0;
    /** Boolean to indicate whether multiple items can be selected. */
    @Input() multiple: boolean = true;
    /** The number of items to render in the page. */
    @Input() pageSize: number = 25;
    /** Page size options. */
    @Input() pageSizeOptions: number[] = [15, 25, 50, 75, 100];
    /** Prefix to render with range label (defaults to empty string). */
    @Input() set rangeLabelPrefix(val: string) {
        if (val && val != '') {
            // automatically add a space at the end (after trimming input)
            // in case user adds space at the end...
            this.rangeLabelPrefix$ = `${val.trim()} `;
        }
    }
    /** The model to track items selected in the table. */
    @Input() selection: SelectionModel<T> = new SelectionModel<T>(
        this.multiple,
        []
    );
    /**
     * Boolean to indicate whether first/last buttons should be included in
     * paginator.
     */
    @Input() showFirstLastButtons: boolean = true;
    /** Event emitted when user clicks button in toolbar. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** Event emitted when user clicks the select all checkbox. */
    @Output() masterToggle: EventEmitter<boolean>;
    /** A reference to the paginator in the component. */
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    /** A reference to the sorter in the component. */
    @ViewChild(SorterComponent) sort!: SorterComponent;
    /** The subscriptions for the component. */
    sub: Subscription;

    private rangeLabelPrefix$: string = '';

    constructor() {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.masterToggle = new EventEmitter<boolean>();
        this.sub = new Subscription();
    }

    ngAfterViewInit(): void {
        this.paginator._intl.getRangeLabel = (
            page: number,
            pageSize: number,
            length: number
        ) => {
            const start = page * pageSize + 1;
            let end = (page + 1) * pageSize;
            if (length === 0) {
                return `${this.rangeLabelPrefix$}0 of 0`;
            } else if (start === end) {
                // only render start value if start === end (i.e. if pageSize=1)
                return `${this.rangeLabelPrefix$}${start} of ${length}`;
            } else {
                // render range if start and end are different
                if (end > length) {
                    // ensure end value of range is not greater than length
                    end = length;
                }
                return `${this.rangeLabelPrefix$}${start} – ${end} of ${length}`;
            }
        };
    }

    /**
     * Emits a buttonClick event to the parent.
     *
     * @param buttonClick The action from the button that was clicked by the user.
     */
    emitButtonClick(buttonClick: ButtonClick): void {
        this.buttonClick.emit(buttonClick);
    }

    /**
     * Emits a masterToggle event to the parent with the latest value for the
     * master toggle checkbox.
     *
     * @param check The checkbox change event.
     */
    emitMasterToggle(check: MatCheckboxChange): void {
        this.masterToggle.emit(check.checked);
    }
}
