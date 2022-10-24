import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { Button } from '../../../shared/interfaces/button.interface';

import { RemoteDataSource } from '../../../shared/services/remote-data-source.service';
import { SelectionService } from '../../../shared/services/selection.service';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';

/* 
mermaid.js inheritance graph
graph TD
    A[Collection]
    B[PagedCollection] -->|extends| A
    C[PagedCollectionWithToolbar] -->|extends| B
    D[PagedCollectionWithIconToolbar] -->|extends| C
    E[PagedCollectionWithRaisedButtonToolbar] -->|extends| C
*/

/**
 * The `Collection` defines the most basic properties needed to render a
 * collection. This works with both local and remote data. It is the base
 * component that all other collection components (`PagedCollection`,
 * `PagedCollection`, etc.) extend off of. This manages things like initialize
 * and connect/disconnect to/from the dataSource, along with tracking models
 * rendered in the collection based on changes to the state (i.e. sort
 * changes). Additionally it tracks the current selection and provides an
 * output observable for parent components to be able to manage button click
 * events coming from buttons associated with each item in the collection.
 */
@Component({
    template: ''
})
export class CollectionComponent<T extends JsonModel>
    implements AfterViewInit, OnDestroy {

    /** The buttons to render with each element in the collection. */
    @Input() collectionButtons: Button[] = [];
    /**
     * Setter for paged data. This re-initializes the dataSource everytime data changes.
     * TODO: only re-initialize when necessary; just update data otherwise
     */
     @Input() set data(data: T[] | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    /**
     * Setter for the dataSource on the component. Initializes the models to
     * render in the collection based on the latest data defined from the
     * dataSource.
     */
    @Input() set dataSource(dataSource: RemoteDataSource<T> | MatTableDataSource<T> | undefined) {
        if (dataSource) {
            this.initDataSource(dataSource);
        }
    }
    /**
     * Boolean to indicate whether SorterComponent associated with collection
     * should be included (defaults to false). If using a toolbar you probably
     * want to use the sorter there, so this is configurable to be turned off.
     */
    @Input() displaySorter: boolean = true;
    /** List of fields included in each element of list that can be sorted on. */
    @Input() fields: string[] = [];
    /** Any values that should be selected when collection initially renders. */
    @Input() initiallySelectedValues: T[] = [];
    /** Boolean value to indicate whether multiple rows can be selected (defaults to true i.e. multiple can be selected). */
    @Input() set multiple(multiple: boolean) {
        this.multiple$ = multiple;
        this.selection = new SelectionModel<T>(multiple, this.initiallySelectedValues);
        this.selectionService.selectionSubject.next(this.selection);
    }
    /** The event to emit when button is clicked in toolbar or collection. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** The source for the collection data. */
    dataSource$!: RemoteDataSource<T> | MatTableDataSource<T>;
    /** The models to display in collection. */
    models: T[] = [];
    /** Boolean value indicating whether multiple rows can be selected. */
    multiple$: boolean = true;
    /** The model to track items selected in the collection. */
    selection: SelectionModel<T>;
    /** 
     * A reference to the sorter in the template. Only paged table would really
     * have a reference directly in this component, but paged list and grid will
     * need SorterComponent, so need to include this as optional type in order to
     * be able to override in extending components.
     */
    sort$?: MatSort | SorterComponent;
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

    /**
     * Returns the selection service that tracks and emits changes to the
     * selection model.
     */
    get selectionService(): SelectionService<T> {
        return this.selectionService$;
    }

    /**
     * Returns the sorter for the component if it exists.
     */
    get sort(): MatSort | null {
        if (this.sort$) {
            return this.sort$;
        } else {
            return null;
        }
    }

    constructor(
        private selectionService$: SelectionService<T>
    ) {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.selection = new SelectionModel<T>(this.multiple$, []);
        this.selectionService.selectionSubject.next(this.selection);
        this.sub = new Subscription();
    }

    ngAfterViewInit(): void {
        this.initSortSubs();
    }

    /**
     * Destroy all subscriptions in the component.
     */
    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.dataSource?.disconnect();
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

        // subscribe to connect observable to get filtered, paged, sorted
        // data; see below github issue comment
        // https://github.com/angular/components/issues/9419#issuecomment-359594686
        this.dataSource$.connect().subscribe((res: T[]) => {
            this.models = res;
        });
    }

    /**
     * Initializes subscription for when user changes the sort order for data
     * in the collection.
     */
    initSortSubs(): void {
        this.dataSource$.sort = this.sort;
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
