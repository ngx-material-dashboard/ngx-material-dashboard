import { AfterContentInit, AfterViewInit, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

import { FilterDropDownComponent } from '../../components/filter-drop-down/filter-drop-down.component';
import { TableToolbarComponent } from '../../components/table-toolbar/table-toolbar.component';
import { ButtonClick } from '../../interfaces/button-click.interface';
import { SearchFilterMap } from '../../interfaces/search-filter-map.interface';
import { TableToolbarButton } from '../../interfaces/table-toolbar-button.interface';
import { SelectionService } from '../../shared/services/selection.service';
import { RemoteDataSource } from '../../shared/services/remote-data-source.service';
import { PagedTableComponent } from '../paged-table/paged-table.component';
import { JsonModel } from '@ngx-material-dashboard/base-json';

/**
 * The PagedTableWithToolbarComponent represents a paged table with toolbar
 * above it. The table and toolbar should include buttons to manage data in
 * table (i.e. create, edit, delete). This component emits an event when the
 * user clicks a button in either the table or toolbar. The parent to this
 * component should subscribe to that and handle event from there.
 *
 * @usageNotes
 * ### Using PagedTableWithToolbarComponent
 * To use the component:
 * ```html
 * <app-paged-table-with-toolbar [toolbarButtons]="toolbarButtons" (buttonClick)="onButtonClick($event)">
 *     <app-paged-table ...></app-paged-table>
 * </app-paged-table-with-toolbar>
 * ```
 */
@Component({
    selector: 'app-paged-table-with-toolbar',
    templateUrl: './paged-table-with-toolbar.component.html',
    styleUrls: ['./paged-table-with-toolbar.component.scss']
})
export class PagedTableWithToolbarComponent<T extends JsonModel> implements AfterContentInit, OnDestroy, OnInit {

    @ContentChild(FilterDropDownComponent) filter!: FilterDropDownComponent;
    @ContentChild(MatSort) sort!: MatSort;
    /** A reference to the PageTable that should be included inside the selector for this component. */
    @ContentChild(PagedTableComponent) table!: PagedTableComponent<T>;
    /** The buttons to render in the toolbar. */
    @Input() form!: FormGroup;
    @Input() toolbarButtons: TableToolbarButton[] = [];
    /** The event to emit when button is clicked in toolbar or table. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** A reference to the TableToolbarComponent in the template. */
    @ViewChild(TableToolbarComponent) tableToolbar!: TableToolbarComponent;
    /**
     * These are the buttons in the toolbar that can be disabled. Just a filtered
     * subset of toolbarButtons that have canDisable=true.
     */
    disableableToolbarButtons: TableToolbarButton[] = [];
    /** The subscriptions for the component. */
    sub: Subscription;

    constructor(private selectionService: SelectionService<T>) {
        this.sub = new Subscription();
        this.buttonClick = new EventEmitter<ButtonClick>();
    }

    /**
     * Set up a subscription to button clicks from rows in table after all
     * content initialiazed and emit as buttonClick to parent using this
     * component (since parent shouldn't care about whether table button
     * or toolbar button was clicked; as long as it has all info i.e. row(s)
     * and action to perform). This needs to be done in AfterContentInit
     * hook since the component should include an app-paged-table selector
     * which should be inside the selector for this component.
     */
    ngAfterContentInit(): void {
        const sub = this.table.tableButtonClick.subscribe((buttonClick: ButtonClick) => {
            this.buttonClick.emit(buttonClick);
        });
        this.sub.add(sub);

        // set up subscription for when user clicks search button on filter
        this.filter.searchClick.subscribe(() => {
            // set dataSource filter based on values entered on searchFilter
            const searchFilterData = this.form.get('searchFilter') as FormGroup;
            this.table.dataSource$.filter = this.buildSearchFilter(searchFilterData);

            if (this.table.dataSource$ instanceof RemoteDataSource) {
                // refresh the data with updated filter
                this.table.dataSource$.refresh();
            }
        });

        // set the sort property on the PagedTable similar to how it is set on
        // the dataSource for a regular MatTable
        this.table.sort = this.sort;
    }

    /**
     * Builds a map of search filter data based on controls from given FormGroup,
     * which should be form used in FilterDropDown component defined for the
     * toolbar. The key for each control should match up with expected filter 
     * values to be included in query parameters sent to server API. This allows 
     * map to be generated dynamically by looping over controls, rather than 
     * requiring parent component to define filter map (which can get repetative). 
     * Code to loop over form controls taken from answer to stackoverflow below:
     * https://stackoverflow.com/a/42235220/.
     * 
     * @param searchFilterData FormGroup defined for filter drop down.
     * @returns A map of search filters to send to server API.
     */
    private buildSearchFilter(searchFilterData: FormGroup): SearchFilterMap {
        const searchFilter: SearchFilterMap = {};
        Object.keys(searchFilterData.controls).forEach((key: string) => {
            searchFilter[key] = searchFilterData.get(key)?.value
        });
        return searchFilter;
    }

    /**
     * Destroy all subscriptions in the component.
     */
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        // get buttons that can be disabled from given list of buttons
        this.disableableToolbarButtons = this.toolbarButtons.filter((button: TableToolbarButton) => button.canDisable);
        this.sub = new Subscription();
        const sub = this.selectionService.selectionChange.subscribe((disabled: boolean) => {
            this.selectionService.toggleButtons(disabled, this.disableableToolbarButtons);
        });
        this.sub.add(sub);
    }

    /**
     * Adds current table selection to given buttonClick and emits event to
     * parent. TODO handle multiple selections
     *
     * @param buttonClick A buttonClick event from the tableToolbar.
     */
    onTableToolbarButtonClick(buttonClick: ButtonClick): void {
        if (!this.table.selection.isEmpty()) {
            // make sure selection is not empty before adding selected row(s)
            buttonClick.row = this.table.selection.selected[0];
        }
        this.buttonClick.emit(buttonClick);
    }

    /**
     * Filters the table data.
     *
     * @param filter The filter value entered by the user.
     */
    // onTableToolbarFilterChange(filter: string): void {
    //     this.filter.filter = filter;
    //     if (this.table.dataSource$ instanceof RemoteDataSource) {
    //         this.table.dataSource$.filter = filter;
    //         this.table.dataSource$.refresh();
    //     } else {
    //         this.table.dataSource$.filter = this.filter.filter;
    //     }
    // }
}
