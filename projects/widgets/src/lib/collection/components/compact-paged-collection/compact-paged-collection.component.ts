import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { RemoteDataSource } from '../../../shared/services/remote-data-source.service';
import { Button } from '../../../shared/interfaces/button.interface';
import { SelectionService } from '../../../shared/services/selection.service';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import { CompactPagedToolbarComponent } from '../../../toolbar/pages/compact-paged-toolbar/compact-paged-toolbar.component';

/**
 * The `CompactPagedCollection` combines a paginator and management buttons in
 * a single `toolbar` above a collection. This component is more compact than
 * the original paged collection with toolbar components since those components
 * separate out the CRUD capabilities and the paging capabilities (both function
 * wise and display wise). Additionally, filter forms are intended to be used
 * outside of this component, and the buttons that are included in the
 * compact toolbar are icon buttons (i.e. they don't include text, and as a
 * result you should be able to include more buttons). 
 */
@Component({
    template: ''
})
export class CompactPagedCollectionComponent<T extends JsonModel>
    implements AfterViewInit, OnDestroy {

    /**
     * A reference to the model template for each element in the collection.
     * This is mainly used for any collection other than a table.
     */
    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
    /** The buttons to render with each element in the collection. */
    @Input() collectionButtons: Button[] = [];
    /** List of fields included in each element of list that can be sorted on. */
    @Input() fields: string[] = [];
    /** The buttons to render in the toolbar. */
    @Input() toolbarButtons: ToolbarButton[] = [];
    /**
     * Setter for paged data. This re-initializes the dataSource everytime data changes.
     * TODO: only re-initialize when necessary; just update data otherwise
     */
    @Input() set data(data: T[] | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    /** The dataSource for the paged data. */
    @Input() set dataSource(data: MatTableDataSource<T> | RemoteDataSource<T> | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    /** Any values that should be selected when collection initially renders. */
    @Input() initiallySelectedValues: T[] = [];
    /** 
     * The max number of pages to display in the paginator. Defaults to 10
     * (does not include 'First', 'Prev', 'Next', 'Last').
     */
    @Input() maxPages: number = 10;
    /** Boolean value to indicate whether multiple rows can be selected (defaults to true i.e. multiple can be selected). */
    @Input() set multiple(multiple: boolean) {
        this.multiple$ = multiple;
        this.selection = new SelectionModel<T>(multiple, this.initiallySelectedValues);
        this.selectionService.selectionSubject.next(this.selection);
    }
    /** Number of items to display on a page. Defaults to 25. */
    @Input() pageSize: number = 25;
    /** The event to emit when button is clicked in toolbar or collection. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** A reference to the toolbar in the template. */
    @ViewChild(CompactPagedToolbarComponent) toolbar!: CompactPagedToolbarComponent<T>;
    /** The source for the collection data. */
    dataSource$!: RemoteDataSource<T> | MatTableDataSource<T>;
    /**
     * These are the buttons in the toolbar that can be disabled. Just a filtered
     * subset of toolbarButtons that have canDisable=true.
     */
    disableableToolbarButtons: ToolbarButton[] = [];
    /** Boolean value indicating whether multiple rows can be selected. */
    multiple$: boolean = true;
    /** The model to track items selected in the collection. */
    selection: SelectionModel<T>;
    /** The subscriptions for the component. */
    sub: Subscription;

    /**
     * Returns the total number of items in the dataSource.
     */
    get length(): number {
        if (this.dataSource$ instanceof RemoteDataSource) {
            return this.dataSource$.total;
        } else if (this.dataSource$?.data) {
            return this.dataSource$.data.length;
        } else {
            return 0;
        }
    }

    constructor(
        private selectionService: SelectionService<T>
    ) {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.selection = new SelectionModel<T>(this.multiple$, []);
        this.selectionService.selectionSubject.next(this.selection);
        this.sub = new Subscription();
    }

    ngAfterViewInit(): void {
        // get buttons that can be disabled from given list of buttons
        this.disableableToolbarButtons = this.toolbarButtons.filter((button: ToolbarButton) => button.canDisable);
        this.sub = new Subscription();
        const sub = this.selectionService.selectionChange.subscribe((disabled: boolean) => {
            this.selectionService.toggleButtons(disabled, this.disableableToolbarButtons);
        });
        this.sub.add(sub);

        this.initPageSub();
        this.initSortSubs();
    }

    /**
     * Destroy all subscriptions in the component.
     */
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Adds current collection selection to given buttonClick and emits event
     * to parent. TODO handle multiple selections
     *
     * @param buttonClick A buttonClick event from the tableToolbar.
     */
    onToolbarButtonClick(buttonClick: ButtonClick): void {
        if (!this.selection.isEmpty()) {
            // make sure selection is not empty before adding selected row(s)
            buttonClick.row = this.selection.selected[0];
        }
        this.buttonClick.emit(buttonClick);
    }

    /**
     * Initializes the data source bsaed on the type of data/source given, and
     * any additional properties required (i.e. paging/sorting).
     * 
     * @param data Either an array (local data) or a RemoteDataSource.
     */
     initDataSource(dataSource: T[] | MatTableDataSource<T> | RemoteDataSource<T>): void {
        if (dataSource instanceof RemoteDataSource) {
            this.dataSource$ = dataSource;
        } else {
            if (dataSource instanceof MatTableDataSource) {
                this.dataSource$ = dataSource;
            } else {
                this.dataSource$ = new MatTableDataSource(dataSource);
            }
        }
    }

    /**
     * Initializes subscription for when user changes page or page size. Works
     * for both local and remote data.
     */
    initPageSub(): void {
        this.dataSource$.paginator = this.toolbar.paginator;
    }

    /**
     * Initializes subscription for when user changes the sort order for data
     * in the collection.
     */
    initSortSubs(): void {
        this.dataSource$.sort = this.toolbar.sort;
    }

    /**
     * Returns true if all visible elements in the collection are selected;
     * otherwise returns false.
     *
     * @returns true if all visible elements in the collection are selected.
     */
    isAllSelected(): boolean {
        if (this.dataSource$.data.length === 0) {
            return false;
        } else {
            return this.selection.selected.length === this.dataSource$.data.length;
        }
    }

    /**
     * Handler for checkbox in collection header. Clears all selections if all
     * visible elements in the collection are selected; otherwise selects all
     * visible elements in the collection.
     */
    masterToggle(event: boolean): void {
        if (this.isAllSelected() || !this.multiple$) {
            // clear all selections and disable ToolbarButtons
            this.selection.clear();
            this.selectionService.selectionChangeSubject.next(true);
        } else {
            // select all rows in the table and enable ToolbarButtons
            this.dataSource$.data.forEach((row: T) => this.selection.select(row));
            if (this.dataSource$.data.length > 0) {
                // only enable ToolbarButtons if there is data in table
                this.selectionService.selectionChangeSubject.next(false);
            }
        }

        // update the selection in the selectionService
        this.selectionService.selectionSubject.next(this.selection);
    }

    /**
     * Handler for when the user clicks a button next to an element in the
     * collection.
     *
     * @param click The action that was clicked (i.e. 'edit', 'delete', etc).
     * @param row The row/element where the button was clicked.
     */
    onActionButtonClick(click: string, row: T): void {
        this.buttonClick.emit({ click: click, row: row });
    }

    /**
     * Handler for checkbox in collection. Toggles the selection for the given
     * element and updates the ToolbarButtons accordingly.
     *
     * @param row The element that was (de)selected in the collection.
     */
    onRowSelected(row: T): void {
        if (!this.multiple$ && this.selection.selected.length > 0) {
            // if table does not allow multiple selections and there are any
            // existing rows selected, then clear selection before making new
            // one
            this.selection.clear();
        }

        this.selection.toggle(row);
        // disable the buttons if no rows are selected; otherwise enable them
        this.selectionService.selectionChangeSubject.next(this.selection.selected.length === 0);
        // update the selection in the selectionService
        this.selectionService.selectionSubject.next(this.selection);
    }
}
