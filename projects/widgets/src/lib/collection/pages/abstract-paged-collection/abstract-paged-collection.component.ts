import { SelectionModel } from '@angular/cdk/collections';
import { Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { RemoteDataSource } from '../../../services/remote-data-source.service';
import { SelectionService } from '../../../table/shared/services/selection.service';
import { SortOrder } from '../../interfaces/sort-order.interface';
import { SorterComponent } from '../sorter/sorter.component';

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
    implements OnDestroy {

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
    @Input() modelType: string = 'data';
    /** The max number of pages to display in the paginator. Defaults to 10 (does not include 'First', 'Prev', 'Next', 'Last'). */
    @Input() maxPages = 10;
    /** Boolean value to indicate whether multiple rows can be selected (defaults to true i.e. multiple can be selected). */
    @Input() set multiple(multiple: boolean) {
        this.multiple$ = multiple;
        this.selection = new SelectionModel<T>(multiple, this.initiallySelectedValues);
        this.selectionService.selectionSubject.next(this.selection);
    }
    /** Number of items to display on a page. Defaults to 25. */
    @Input() pageSize = 25;
    /** A reference to the paginator in the template. */
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(SorterComponent) sort$?: MatSort | SorterComponent;    
    @ViewChild(SorterComponent) sorter?: SorterComponent;
    /** The source for the table data. */
    dataSource$!: RemoteDataSource<T> | MatTableDataSource<T>;
    /** Boolean value indicating whether multiple rows can be selected. */
    multiple$ = true;
    /** The model to track items selected in the table. */
    selection: SelectionModel<T>;
    /** All disposable resources for component. */
    sub: Subscription;

    @ContentChild('model', { static: false }) template!: TemplateRef<any>;

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
        // if (!this.dataSource$) {
        //     this.dataSource$ = new MatTableDataSource();
        //     this.initDataSource([]);
        // }
        this.selection = new SelectionModel<T>(this.multiple$, []);
        this.selectionService.selectionSubject.next(this.selection);
        this.sub = new Subscription();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    initDataSource(data: T[] | RemoteDataSource<T>): void {
        if (data instanceof RemoteDataSource) {
            this.dataSource$ = data;
            this.initPageSub();
        } else {
            this.dataSource$ = new MatTableDataSource(data);
            this.dataSource$.paginator = this.paginator;
        }
    }

    initPageSub(): void {
        if (this.paginator) {
            const pageSub = this.paginator.page.subscribe((page: PageEvent) => {
                if (this.dataSource$ instanceof RemoteDataSource) {
                    // calculate offset using pageSize and pageIndex from PageEvent
                    this.dataSource$.pageIndex = page.pageIndex;
                    this.dataSource$.pageSize = page.pageSize;
                    this.dataSource$.refresh();
                }
            });
            this.sub.add(pageSub);
        }
    }

    initSortSubs(): void {
        if (this.sort$ && this.sort$ instanceof SorterComponent) {
            const sub = this.sort$.sort.subscribe((sortOrder: SortOrder) => {
                if (this.dataSource$ instanceof RemoteDataSource) {
                    this.dataSource$.sort = sortOrder.sort;
                    this.dataSource$.sort = sortOrder.order;
                    this.dataSource$.refresh();
                } else {
                    // manually sort local data source
                    this.dataSource$.data.sort((a: T, b: T) => {
                        if (a[sortOrder.sort] < b[sortOrder.sort]) {
                            return sortOrder.order === 'asc' ? -1 : 1;
                        } else if (a[sortOrder.sort] > b[sortOrder.sort]) {
                            return sortOrder.order === 'asc' ? 1 : -1;
                        } else {
                            return 0;
                        }
                    });
                }
            });
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
