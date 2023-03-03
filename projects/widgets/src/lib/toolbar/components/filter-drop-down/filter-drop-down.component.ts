/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewChild
} from '@angular/core';
import {
    faCaretDown,
    faSearch,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';

/**
 * A drop down component for filtering data. The component includes all tags
 * and buttons necessary to render the drop down menu and filter data. This is
 * included with the `PagedTableWithToolbar`, and all logic is included to
 * handle filtering your data when the user clicks the `Search` button. The only
 * thing you must provide is a form with one or more fields to filter your data.
 * See the [PagedTableWithToolbar](/widgets/table/overview#paged-table-with-toolbar-component)
 * for more details.
 *
 * > NOTE: The key for each control included in the form should match up with
 * > expected filter values to be included in query parameters sent to your API.
 * > This allows a map to be generated dynamically by looping over controls,
 * > rather than requiring parent component to define filter map (which can get
 * > repetative).
 */
@Component({
    selector: 'ngx-mat-filter-drop-down',
    templateUrl: './filter-drop-down.component.html',
    styleUrls: ['./filter-drop-down.component.scss']
})
export class FilterDropDownComponent implements AfterViewInit {
    @Output() clearSearchForm: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    /** The event emitted when the user clicks the search button. */
    @Output() searchClick: EventEmitter<boolean> = new EventEmitter<boolean>();
    /** A reference to the search field in the component. */
    @ViewChild('searchField', { static: true, read: ElementRef })
    field!: ElementRef<HTMLElement>;
    /** The icon used to open the drop down. */
    faCaretDown: IconDefinition = faCaretDown;
    /** The icon to display next to search text. */
    faSearch: IconDefinition = faSearch;
    /** The width of the menu. */
    menuWidth: any;

    constructor() {}

    ngAfterViewInit(): void {
        // wait a tick to avoid expressionchangedafterithasbeencheckederror;
        // then set menuWidth to width of search field where drop down is
        // rendered from
        setTimeout(
            () => (this.menuWidth = this.field.nativeElement.clientWidth)
        );
    }

    clear(): void {
        this.clearSearchForm.emit(true);
    }

    search(): void {
        this.searchClick.emit(true);
    }
}
