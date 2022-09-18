import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { AbstractPagedCollectionComponent } from '../../../collection/pages/abstract-paged-collection/abstract-paged-collection.component';
import { RemoteDataSource } from '../../../services/remote-data-source.service';
import { SortOrder } from '../../../collection/interfaces/sort-order.interface';
import { SorterComponent } from '../../../collection/pages/sorter/sorter.component';
import { TableButton } from '../../../table/interfaces/table-button.interface';
import { SelectionService } from '../../../table/shared/services/selection.service';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';

/**
 * The `PagedListComponent` renders items in a grid with built in paging
 * capabilities. You provide the template for each item to render in the list.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-paged-list [data]="tasks" class="marker-paged-grid">
 *     <ng-template #model let-model="model">
 *         <mat-card>
 *             <mat-card-title>
 *                 {{model.id}} Title
 *             </mat-card-title>
 *             <mat-card-content>
 *                 Content for dummy object {{model.id}}
 *             </mat-card-content>
 *         </mat-card>
 *     </ng-template>
 * </ngx-material-dashboard-paged-list>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {Task} from './tasks'; // this should extend JsonModel
 * 
 * @Component({
 *     selector: 'basic-usage-example',
 *     templateUrl: './basic-usage-example.html'
 * }) UsingBasicUsageExample {
 *     tasks: Task[] = []; // assuming this is initialized with data at some point
 * }
 * ```
 */
@Component({
    selector: 'ngx-material-dashboard-paged-list',
    templateUrl: './paged-list.component.html',
    styleUrls: ['./paged-list.component.css']
})
export class PagedListComponent<T extends JsonModel>
    extends AbstractPagedCollectionComponent<T>
    implements AfterViewInit, OnDestroy {

    /** The buttons to render in each row of the table. */
    //@Input() buttons: TableButton[] = [];
    /** Columns to display in the table. */
    /** List of fields included in each element of list that can be sorted on. */
    @Input() fields: string[] = [];
    //@Input() displayedColumns: string[] = ['select', 'actions'];
    /** The event emitted when a button in one of the rows is clicked. */
    @Output() tableButtonClick: EventEmitter<ButtonClick>;
    /** A reference to the table in the template. */
    @ViewChild(MatTable, { static: true }) table!: MatTable<T>;
    
    set sort(sort: SorterComponent) {
        this.sort$ = sort;
        this.initPageSub();
        this.initSortSubs();
    }

    constructor(selectionService: SelectionService<T>) {
        super(selectionService);
        if (!this.dataSource$) {
            this.dataSource$ = new MatTableDataSource();
            this.initDataSource([]);
        }
        this.selection = new SelectionModel<T>(this.multiple$, []);
        this.sub = new Subscription();
        this.tableButtonClick = new EventEmitter<ButtonClick>();
    }

    override initDataSource(data: T[] | RemoteDataSource<T>): void {
        super.initDataSource(data);
        if (data instanceof RemoteDataSource) {
            this.initSortSubs();
        } else {
            // this.dataSource$.sort = this.sort$;
        }
    }

    ngAfterViewInit(): void {
        if (this.dataSource$ instanceof RemoteDataSource) {
            this.initPageSub();
        }

        this.initSortSubs();
    }

    onActionButtonClick(buttonClick: string, row: JsonModel): void {
        this.tableButtonClick.emit({ click: buttonClick, row });
    }
}

