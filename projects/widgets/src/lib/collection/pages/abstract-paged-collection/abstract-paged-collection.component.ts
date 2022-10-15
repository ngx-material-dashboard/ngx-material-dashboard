import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { RemoteDataSource } from '../../../services/remote-data-source.service';
import { SelectionService } from '../../../table/shared/services/selection.service';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { SortOrder } from '../../../toolbar/interfaces/sort-order.interface';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';

/**
 * The `AbstractPagedCollectionComponent` defines properties and methods for managing
 * paged sets of data. This can be included with any component that works with
 * paged data sets, and it is currently being used by the `PagedGrid`,
 * `PagedList`, and `PagedTable` components.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <div fxLayout="column" fxLayoutGap="5px">
 *     <div *ngFor="let model of dataSource$.data">
 *         <ng-container 
 *             *ngTemplateOutlet="template; context: { model: model }">
 *         </ng-container>
 *     </div>
 * </div>
 * <mat-paginator [length]="dataSource$.data.length"
 *    [pageSize]="pageSize" 
 *    [pageSizeOptions]="[15, 25, 50, 75, 100]">
 * </mat-paginator>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {JsonModel} from '@ngx-material-dashboard/base-json';
 * import {AbstractPageComponent} from '@ngx-material-dashboard/widgets';
 *
 * @Component({
 *     selector: 'basic-usage-example',
 *     templateUrl: './basic-usage-example.html'
 * })
 * export class BasicUsageExample<T extends JsonModel>
 *     extends AbstractPagedCollectionComponent<T>{}
 * ```
 * 
 * @overviewDetails
 * The above is an example of how to create your own paged component. This will
 * simply render a list of items from the `dataSource$`. The example uses
 * component composition to render each item in the data set as defined in the
 * body of the template of whatever component that utilizes your paged
 * component.
 * 
 * Component composition is outside of the scope of this documentation as there
 * are plenty of resources available for you to learn more about this. Suffice
 * to say it is pretty awesome, and allows you to do something like the
 * following to utilize your paged component.
 *
 * @usageNotes
 * ```html
 * <basic-usage-example [data]="tasks">
 *     <mat-card>
 *         <mat-card-title>
 *             {{model.id}} Title
 *         </mat-card-title>
 *         <mat-card-content>
 *             Content for dummy object {{model.id}}
 *         </mat-card-content>
 *     </mat-card>
 * </basic-usage-example>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {Task} from './tasks'; // this should extend JsonModel
 * 
 * @Component({
 *     selector: 'using-basic-usage-example',
 *     templateUrl: './using-basic-usage-example.html'
 * }) UsingBasicUsageExample {
 *     tasks: Task[] = []; // assuming this is initialized with data at some point
 * }
 * ```
 * 
 * @overviewDetails
 * > NOTE: The above example initializes the component for local data. To
 * > initialize your component with remote data simply pass in a 
 * > `RemoteDataSource` to the `dataSource input of the `BasicUsageExample`.
 */
@Component({
  template: ''
})
export class AbstractPagedCollectionComponent <T extends JsonModel>
    implements AfterViewInit, OnDestroy {

    /**
     * A reference to the model template for each element in the collection.
     * This is mainly used for any collection other than a table.
     */
    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
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
    @Input() set dataSource(data: T[] | RemoteDataSource<T> | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    /** Any values that should be selected when table initially renders. */
    @Input() initiallySelectedValues: T[] = [];
    /** The max number of pages to display in the paginator. Defaults to 10 (does not include 'First', 'Prev', 'Next', 'Last'). */
    @Input() maxPages: number = 10;
    /** Boolean value to indicate whether multiple rows can be selected (defaults to true i.e. multiple can be selected). */
    @Input() set multiple(multiple: boolean) {
        this.multiple$ = multiple;
        this.selection = new SelectionModel<T>(multiple, this.initiallySelectedValues);
        this.selectionService.selectionSubject.next(this.selection);
    }
    /** Number of items to display on a page. Defaults to 25. */
    @Input() pageSize: number = 25;
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** A reference to the paginator in the template. */
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    /** A reference to the sorter in the template. */
    @ViewChild(SorterComponent) sort$?: MatSort | SorterComponent;    
    /** The source for the table data. */
    dataSource$!: RemoteDataSource<T> | MatTableDataSource<T>;
    /** Boolean value indicating whether multiple rows can be selected. */
    multiple$: boolean = true;
    /** The model to track items selected in the table. */
    selection: SelectionModel<T>;
    /** All disposable resources for component. */
    sub: Subscription;

    /**
     * Returns the total number of items in the dataSource.
     */
    get length(): number {
        if (this.dataSource$ instanceof RemoteDataSource) {
            return this.dataSource$.total;
        } else {
            return this.dataSource$.data.length;
        }
    }

    constructor(private selectionService: SelectionService<T>) {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.selection = new SelectionModel<T>(this.multiple$, []);
        this.selectionService.selectionSubject.next(this.selection);
        this.sub = new Subscription();
    }

    ngAfterViewInit(): void {
        this.initPageSub();
        this.initSortSubs();
    }

    /**
     * Lifecycle method automatically called by angular when the component is
     * destroyed. Used to unsubscribe from all subscriptions created in
     * component.
     */
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Initializes the data source bsaed on the type of data/source given, and
     * any additional properties required (i.e. paging/sorting).
     * 
     * @param data Either an array (local data) or a RemoteDataSource.
     */
    initDataSource(data: T[] | RemoteDataSource<T>): void {
        if (data instanceof RemoteDataSource) {
            this.dataSource$ = data;
        } else {
            this.dataSource$ = new MatTableDataSource(data);
        }
    }

    /**
     * Initializes subscription for when user changes page or page size, meant
     * for handling remote data.
     */
    initPageSub(): void {
        if (this.paginator) {
            if (this.dataSource$ instanceof RemoteDataSource) {
                const pageSub = this.paginator.page.subscribe((page: PageEvent) => {
                    if (this.dataSource$ instanceof RemoteDataSource) {
                        // calculate offset using pageSize and pageIndex from PageEvent
                        this.dataSource$.pageIndex = page.pageIndex;
                        this.dataSource$.pageSize = page.pageSize;
                        this.dataSource$.refresh();
                    }
                });
                this.sub.add(pageSub);
            } else {
                this.dataSource$.paginator = this.paginator;
            }
        }
    }

    /**
     * Initializes subscription for when user changes the sort order for data
     * in the collection.
     */
    initSortSubs(): void {
        if (this.sort$) {
            if (this.dataSource$ instanceof RemoteDataSource) {
                const sub = this.sort$.sortChange.subscribe((sortOrder: SortOrder) => {
                    if (this.dataSource$ instanceof RemoteDataSource) {
                        this.dataSource$.sort = sortOrder.sort;
                        this.dataSource$.sort = sortOrder.order;
                        this.dataSource$.refresh();
                    }
                });
            } else {
                this.dataSource$.sort = this.sort$;
            }
        }
    }

    /**
     * Returns true if all visible rows in the table are selected; otherwise returns false.
     *
     * @returns true if all visible rows in the table are selected.
     */
    isAllSelected(): boolean {
        if (this.dataSource$.data.length === 0) {
            return false;
        } else {
            return this.selection.selected.length === this.dataSource$.data.length;
        }
    }

    /**
     * Handler for checkbox in table header. Clears all selections if all visible rows in the table
     * are selected; otherwise selects all visible rows in the table.
     */
    masterToggle(): void {
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

    onActionButtonClick(click: string, row: T): void {
        this.buttonClick.emit({ click: click, row: row });
    }

    /**
     * Handler for checkbox in table row. Toggles the selection for the given row and updates the
     * ToolbarButtons accordingly.
     *
     * @param row The row that was (de)selected in the table.
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
