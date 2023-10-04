/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { SelectionModel } from '@angular/cdk/collections';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { Button } from '../../interfaces/button.interface';

import { RemoteDataSource } from '../../services/remote-data-source.service';
import { SelectionService } from '../../services/selection.service';
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
 * collection. It is similar to the `MatTable` component, but designed to
 * work with any type of collection (i.e. grid, list, table). This works
 * with both local and remote data. This manages things like initialize
 * and connect/disconnect to/from the dataSource, along with tracking models
 * rendered in the collection based on changes to the state (i.e. sort
 * changes). It does this using a data source which at its base is the
 * @angular/cdk/collections
 * [DataSource](https://material.angular.io/cdk/collections/api#DataSource).
 * Additionally it provides the ability to select one or more items in the
 * collection along with the ability to track the current selection, and an
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
 * provide the capabilities you need). If you do define your own collection, you
 * must define a template for it. You can find more details in the documentation
 * for the [Grid](/widgets/grid/overview), [List](/widgets/list/overview),
 * and [Table](/widgets/table/overview) at the included links.
 *
 * #### Features
 *
 * The `Collection` handles dataSource management, including connecting to the
 * data source, disconnecting when the component is destoryed, as well as
 * tracking and managing models rendered in the collection, and sorting. It
 * also tracks the selection of models (in addition to controlling whether more
 * than 1 model can be selected), and provides an easy output event for parent
 * components to handle when users click buttons assoicated with each model in
 * the collection.
 *
 * ##### DataSource Management
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
 * ##### Sort
 *
 * The `sort$` property is defined as a `MatSort` or a custom `SorterComponent`
 * defined in the `Toolbar` module, which just extends `MatSort`. If you intend
 * to use your own sorter component, then it must extend `MatSort`. The `sort$`
 * property is treated as an internal value specifically for this component.
 * The `sort` getter is defined to be a more `public` facing property, and use
 * when initializing the sort for the dataSource.
 *
 * ##### Selection Model
 *
 * The component allows you to control whether you can select 1 or more models
 * in the collection using the `multiple` input property. This defaults to true
 * meaning the default behaviour is to allow more than 1 model to be selected
 * in the collection.
 *
 * ##### Collection Button Events
 *
 * The component includes a `buttonClick` output that you can use in your parent
 * components to listed for and handle click events for buttons in the
 * collection.
 */
@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent<T extends JsonModel>
    implements AfterViewInit, OnDestroy
{
    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
    /** The buttons to render with each element in the collection. */
    @Input() collectionButtons: Button[] = [];
    /**
     * Setter for paged data. This re-initializes the dataSource everytime data changes.
     * @deprecated use dataSource instead
     */
    @Input() set data(data: T[] | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    /**
     * Setter for the dataSource on the component. Initializes the models to
     * render in the collection based on the latest data defined from the
     * dataSource. TODO: only re-initialize when necessary; just update data otherwise
     */
    @Input() set dataSource(
        dataSource:
            | T[]
            | RemoteDataSource<T>
            | MatTableDataSource<T>
            | undefined
    ) {
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
    @Input() fields: { field: string; text: string }[] | string[] = [];
    /** Any values that should be selected when collection initially renders. */
    @Input() initiallySelectedValues: T[] = [];
    /** Boolean value to indicate whether multiple rows can be selected (defaults to true i.e. multiple can be selected). */
    @Input() set multiple(multiple: boolean) {
        this.multiple$ = multiple;
        this.selection = new SelectionModel<T>(
            multiple,
            this.initiallySelectedValues
        );
        this.selectionService.selectionSubject.next(this.selection);
    }
    /** The event to emit when button is clicked in collection. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** The event to emit when the collection data length changes. */
    @Output() lengthChange: EventEmitter<number>;
    /**
     * A reference to the sorter in the template. Only used for components that
     * utilize the SorterComponent (like list and grid), however MatSort is
     * included so it can be used with tables. Any tables that utilize sorting
     * in headers need to override this (see the TableComponent for an example).
     */
    @ViewChild(SorterComponent) sort$?: MatSort | SorterComponent;
    /** The source for the collection data. */
    dataSource$!: RemoteDataSource<T> | MatTableDataSource<T>;
    /** The total number of elements in the collection. */
    length: number = 0;
    /** The models to display in collection. */
    models: T[] = [];
    /** Boolean value indicating whether multiple rows can be selected. */
    multiple$: boolean = true;
    /** The model to track items selected in the collection. */
    selection: SelectionModel<T>;
    /** The subscriptions for the component. */
    sub: Subscription;

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
    get sort(): MatSort | undefined {
        return this.sort$;
    }

    constructor(private selectionService$: SelectionService<T>) {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.lengthChange = new EventEmitter<number>();
        this.selection = new SelectionModel<T>(this.multiple$, []);
        this.selectionService.selectionSubject.next(this.selection);
        this.sub = new Subscription();
    }

    /**
     * Initializes the sort for the component after the view is initialized.
     */
    ngAfterViewInit(): void {
        this.initSort();
    }

    /**
     * Destroy all subscriptions in the component.
     */
    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.dataSource$.disconnect();
    }

    /**
     * Initializes the data source bsaed on the type of data/source given, and
     * any additional properties required (i.e. sorting).
     *
     * @param data Either an array (local data), MatTableDataSource, or RemoteDataSource.
     */
    initDataSource(
        dataSource: T[] | MatTableDataSource<T> | RemoteDataSource<T>
    ): void {
        // initialize the dataSource
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
        const sub = this.dataSource$.connect().subscribe((res: T[]) => {
            // set the models to render in the collection
            this.models = res;
            // TODO figure out why needed to make karma tests pass due to
            // expressionchangedafter... but seems to work fine when running
            // component in app without this
            //this.changeDetectorRef.markForCheck() //.detectChanges();

            // set the total length of the dataSource and emit lengthChange
            // event so parent components can update accordingly
            if (this.dataSource$ instanceof RemoteDataSource) {
                this.length = this.dataSource$.total;
            } else {
                this.length = this.dataSource$.data.length;
            }
            this.lengthChange.emit(this.length);
        });
        this.sub.add(sub);

        // re-initialize the sort on the dataSource
        this.initSort();
    }

    /**
     * Initializes subscription for when user changes the sort order for data
     * in the collection.
     */
    initSort(): void {
        if (this.dataSource$ && this.sort) {
            this.dataSource$.sort = this.sort;
        }
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
            return (
                this.selection.selected.length === this.dataSource$.data.length
            );
        }
    }

    /**
     * Handler for checkbox in collection header. Clears all selections if all
     * visible elements in the collection are selected; otherwise selects all
     * visible elements in the collection.
     */
    masterToggle(): void {
        if (this.isAllSelected() || !this.multiple$) {
            // clear all selections and disable ToolbarButtons
            this.selection.clear();
            this.selectionService.selectionChangeSubject.next(true);
        } else {
            // select all rows in the table and enable ToolbarButtons
            this.dataSource$.data.forEach((row: T) =>
                this.selection.select(row)
            );
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
        this.selectionService.selectionChangeSubject.next(
            this.selection.selected.length === 0
        );
        // update the selection in the selectionService
        this.selectionService.selectionSubject.next(this.selection);
    }
}
