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
 * NOTE: any sorting included should be of type `MatSort` or the `Sorter`
 * defined in the `toolbar` module for this library, which actually just
 * extends `MatSort`.
 * 
 * @overviewDetails
 * 
 * This component can be used for any type of collection, i.e. a grid, list,
 * or table (or any other type of collection I may not be thinking of right
 * now), however it does not provide any template. Generally speaking you 
 * would use something like the `Grid`, `List`, or `Table` components defined
 * in their respective modules, which extend this component and provide
 * templates for rendering the appropriate collection type. The only time you
 * might utilize this component directly is if you use it to create your own
 * collection type component (if the existing `Grid`, `List`, or `Table` do not
 * provide the capabilities you need). 
 * 
 * ## Features
 * 
 * The `Collection` handles dataSource management, including connecting to the
 * data source, disconnecting when the component is destoryed, as well as
 * tracking and managing models rendered in the collection. It also tracks the
 * selection of models (in addition to controlling whether more than 1 model
 * can be selected), and provides an easy output event for parent components to
 * handle when users click buttons assoicated with each model in the collection.
 * 
 * ### DataSource Management
 * 
 * While you may initialize your own dataSource and pass it in to the 
 * `Collection`, you can also pass in an array which will be initialized as a
 * local data source. Either way the component manages the necessary code to
 * connect to the database and update the rendered models based on the latest
 * data to be rendered in the collection. It also includes code to disconnect
 * from the dataSource when the component is destroyed. As such, if you intend
 * to use your own dataSource, then it must extend the cdk collections 
 * `Datasource` and implement connect and disconnect functions.
 * 
 * ### Selection Model
 * 
 * The component allows you to control whether you can select 1 or more models
 * in the collection using the `multiple` input property. This defaults to true
 * meaning the default behaviour is to allow more than 1 model to be selected
 * in the collection.
 * 
 * ### Collection Button Events
 * 
 * The component includes a `buttonClick` output that you can use in your parent
 * components to listed for and handle click events for buttons in the
 * collection. 
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
