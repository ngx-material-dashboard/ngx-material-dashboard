import { SelectionModel } from '@angular/cdk/collections';
import {
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
 * ### Features
 *
 * You may optional exclude a select checkbox and `Sorter`. These default to
 * automatically be included. Simply set the corresponding `display` input
 * value to `false` if you want to exclude either feature.
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
 * ##### Sorter
 *
 * The optional `Sorter` is rendered before the `MatPaginator` and is meant
 * to sort contents of the collection. Like the masterToggle, this is optional
 * so this toolbar can be used above the `PagedTable`, which already includes
 * sorting in the header row.
 */
@Component({
    selector: 'ngx-material-dashboard-icon-buttons-with-paginator',
    templateUrl: './icon-buttons-with-paginator.component.html',
    styleUrls: ['./icon-buttons-with-paginator.component.css']
})
export class IconButtonsWithPaginatorComponent<T extends JsonModel> {
    /** The management buttons to display in the toolbar. */
    @Input() buttons: ToolbarButton[] = [];
    /** Boolean to indicate whether to render the select all checkbox. */
    @Input() displaySelectAll: boolean = true;
    /** Boolean to indicate whether to render the sort drop down. */
    @Input() displaySort: boolean = true;
    /** The fields to render in the sort drop down. */
    @Input() fields: string[] = [];
    /** Boolean to indicate whether all items are selected. */
    @Input() isAllSelected: boolean = false;
    /** The total number of items in the collection. */
    @Input() length: number = 0;
    /** Boolean to indicate whether multiple items can be selected. */
    @Input() multiple: boolean = true;
    /** The number of items to render in the page. */
    @Input() pageSize: number = 25;
    /** The model to track items selected in the table. */
    @Input() selection: SelectionModel<T> = new SelectionModel<T>(
        this.multiple,
        []
    );
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

    constructor() {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.masterToggle = new EventEmitter<boolean>();
        this.sub = new Subscription();
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
