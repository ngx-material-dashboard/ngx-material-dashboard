import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { RemoteDataSource } from '../../../services/remote-data-source.service';

/**
 * The `AbstractPagedComponent` defines properties and methods for managing
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
 *     extends AbstractPagedComponent<T>{}
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
export class AbstractPagedComponent<T extends JsonModel> implements OnInit {

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
    @Input() modelType: string = 'data';
    /** The max number of pages to display in the paginator. Defaults to 10 (does not include 'First', 'Prev', 'Next', 'Last'). */
    @Input() maxPages = 10;
    /** Number of items to display on a page. Defaults to 25. */
    @Input() pageSize = 25;
    /** A reference to the paginator in the template. */
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    /** The source for the table data. */
    dataSource$!: RemoteDataSource<T> | MatTableDataSource<T>;
    /** All disposable resources for component. */
    sub: Subscription;

    @ContentChild('model', { static: false }) template!: TemplateRef<any>;

    constructor() {
        this.sub = new Subscription();
    }

    ngOnInit(): void {
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

}
