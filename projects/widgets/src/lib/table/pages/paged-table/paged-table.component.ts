import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { RemoteDataSource } from '../../../services/remote-data-source.service';
import { ButtonClick } from '../../interfaces/button-click.interface';
import { TableButton } from '../../interfaces/table-button.interface';
import { SelectionService } from '../../shared/services/selection.service';

/**
 * A wrapper component for MatTable that provides built in paging, row selection,
 * and the ability to add custom buttons to each row through a built in `actions`
 * column. This component works very much like the MatTable component in both
 * configuration and usage. You must define the data, which can be either an
 * array of local data or a remote data source, and the table column templates
 * as well as list of columns to display (based on defined templates).
 * 
 * The `RemoteDataSource` is included and provides an implementation of the
 * Angular Material `DataSource` for remote data, that relies on a model type
 * that extends the `JsonModel` object and an implementation of the
 * `JsonDatastore`, both defined in the `base-json` library. For more details
 * on the `JsonModel` and JsonDatastore` check out the (base-json)[/base-json]
 * documentation. 
 * 
 * 
 * The PagedTableComponent represents a table with paged data. This component
 * defines most of the HTML required for a MatTable that includes a select
 * checkbox in the first column and a column for action buttons. Any additional
 * columns defined in the HTML where this selector is used are automatically
 * detected and included with the table. Columns should follow the same format
 * as a MatTable. You should include a column definition for when no table is
 * empty.
 *
 * @usageNotes
 * ## Basic Local Data Usage
 * ```html
 * <ngx-material-dashboard-paged-table matSort [data]="data" [displayedColumns]="displayedColumns">
 *     <ng-container matColumnDef="id">
 *         <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
 *         <mat-cell *matCellDef="let row">{{row.id}}</mat-cell>
 *     </ng-container>
 *     <ng-container matColumnDef="name">
 *         <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
 *         <mat-cell *matCellDef="let row">{{row.name}}</mat-cell>
 *     </ng-container>
 *     <ng-container matColumnDef="noData">
 *         <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
 *             No data to display
 *         </mat-footer-cell>
 *     </ng-container>
 * </ngx-material-dashboard-paged-table>
 * ```
 * ```typescript
 * // this is the most basic configuration you can use with the component, which
 * // will basically just load and page through data without any create, update,
 * // or delete functionality
 * import {AfterViewInit, Component, ViewChild} from '@angular/core';
 * import {MatSort} from '@angular/material/sort';
 * import {PagedTableComponent} from '@ngx-material-dashboard/widgets';
 * import {Model} from '@models'; // assumed path defined in tsconfig 
 * 
 * @Component({
 *  selector: 'paged-table-basic-local-data-usage-example',
 *  templateUrl: './paged-table-basic-local-data-usage-example.html'
 * })
 * class PagedTableBasicLocalDataUsageExample implements AfterViewInit {
 *    @ViewChild(PagedTableComponent) pagedTable!: PagedTableComponent<Model>;
 *    @ViewChild(MatSort) sort!: MatSort;
 *    data: Model[] = [];
 *    displayedColumns: string[] = ['select', 'id', 'name', 'actions'];
 * 
 *    ngAfterViewInit(): void {
 *        // this is needed to properly initialize sorting capability for table
 *        this.pagedTable.sort = this.sort;
 *    }
 * }
 * ```
 * 
 * @usageNotes
 * ## Remote Data Usage Example
 * ```html
 * <ngx-material-dashboard-paged-table 
 *     matSort 
 *     [buttons]="tableButtons"
 *     [dataSource]="dataSource"
 *     [displayedColumns]="displayedColumns">
 *     <ng-container matColumnDef="id">
 *         <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
 *         <mat-cell *matCellDef="let row">{{row.id}}</mat-cell>
 *     </ng-container>
 *     <ng-container matColumnDef="name">
 *         <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
 *         <mat-cell *matCellDef="let row">{{row.name}}</mat-cell>
 *     </ng-container>
 *     <ng-container matColumnDef="noData">
 *         <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
 *             No data to display
 *         </mat-footer-cell>
 *     </ng-container>
 * </ngx-material-dashboard-paged-table>
 * ```
 * ```typescript
 * import {AfterViewInit, Component, ViewChild} from '@angular/core';
 * import {MatSort} from '@angular/material/sort';
 * import {
 *     PagedTableComponent,
 *     RemoteDataSource,
 *     TableButton,
 *     EDIT_BUTTON,
 *     DELETE_BUTTON
 * } from '@ngx-material-dashboard/widgets';
 * import {Model} from '@models'; // assumed path defined in tsconfig 
 * 
 * @Component({
 *  selector: 'paged-table-remote-data-usage-example',
 *  templateUrl: './paged-table-basic-remote-data-usage-example.html'
 * })
 * class PagedTableRemoteDataUsageExample implements AfterViewInit {
 *    @ViewChild(PagedTableComponent) pagedTable!: PagedTableComponent<Model>;
 *    @ViewChild(MatSort) sort!: MatSort;
 *    buttons: TableButton[] = [EDIT_BUTTON, DELETE_BUTTON];
 *    dataSource: RemoteDataSource<Model>;
 *    displayedColumns: string[] = ['select', 'id', 'name', 'actions'];
 * 
 *    constructor(private jsonApiService: JsonApiService) {
 *        this.dataSource = new RemoteDataSource<T>(Model, this.jsonApiService);
 *    }
 * 
 *    ngAfterViewInit(): void {
 *        // this is needed to properly initialize sorting capability for table
 *        this.pagedTable.sort = this.sort;
 *    }
 * }
 * ```
 * 
 * @overviewDetails
 * ## Features
 * 
 * The `PagedTable` is designed to provide built in features for working with
 * table data, specifically row selection, paging, and sorting. While you can
 * add those features to the `MatTable`, the `PagedTable` helps reduce the
 * amount of code required to use those features. See the sections below for
 * specifics on how to use those features.   
 * 
 * ### Pagination
 * 
 * The `PagedTable` includes the `<mat-paginator>` in the components template,
 * and handles initializing the pagination for both local and remote data. There
 * is no additional configuration necessary to use this feature.
 * 
 * ### Sort
 * 
 * The `PagedTable` includes the ability to add sorting just like `MatTable`. To
 * add sorting add the `matSort` directive to the `PagedTable` tag and add 
 * `mat-sort-header`to each column header cell that should trigger sorting. You
 * must also set the sort on the `PagedTable` in your typescript code, which
 * will configure sorting for both local and remote data sources. Note that you
 * have to import `MatSortModule` in order to initialize the `matSort` directive.
 * 
 * Your template should contain the following (similar to what you would add for
 * a `MatTable`).
 * 
 * ```html
 * <ngx-material-dashboard-paged-table matSort [data]="data">
 *     <ng-container matColumnDef="name">
 *         <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
 *         <mat-cell *matCellDef="let row">{{row.name}}</mat-cell>
 *     </ng-container>
 * </ngx-material-dashboard-paged-table>
 * ```
 * 
 * And your component should implement `AfterViewInit` and contain the following
 * code.
 * 
 * ```typescript
 * ...
 * @ViewChild(PagedTableComponent) pagedTable!: PagedTableComponent<Model>;
 * @ViewChild(MatSort) sort!: MatSort;
 * ...
 * 
 * ngAfterViewInit(): void {
 *     // this is needed to properly initialize sorting capability for table
 *     this.pagedTable.sort = this.sort;
 * }
 * ...
 * ```
 * @overviewDetails
 * ## No Table Data
 * 
 * If you want to display any text in the table when there is no data available
 * you should include a "noData" column definition with a colspan set to the
 * number of displayed columns in the table so the text can be centered in the
 * table. The column definition should look like the following:
 * 
 * ```html
 * <ng-container matColumnDef="noData">
 *     <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
 *         No data to display
 *     </mat-footer-cell>
 * </ng-container>
 * ```
 * 
 * TODO: Update to use matNoDataRow
 * 
 */
@Component({
    selector: 'ngx-material-dashboard-paged-table',
    templateUrl: './paged-table.component.html',
    styleUrls: ['./paged-table.component.scss']
})
export class PagedTableComponent<T extends JsonModel> implements AfterContentInit, AfterViewInit, OnDestroy, OnInit {

    /** A reference to the columns defined; allows user to define columns inside selector for this component. */
    @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
    /** The buttons to render in each row of the table. */
    @Input() buttons: TableButton[] = [];
    /**
     * Setter for table data. This re-initializes the dataSource everytime data changes.
     * TODO: only re-initialize when necessary; just update data otherwise
     */
    @Input() set data(data: T[] | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    /** The dataSource for the table. */
    @Input() set dataSource(data: T[] | RemoteDataSource<T> | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    /** Columns to display in the table. */
    @Input() displayedColumns: string[] = ['select', 'actions'];
    /** Any values that should be selected when table initially renders. */
    @Input() initiallySelectedValues: T[] = [];
    /** Boolean value to indicate whether multiple rows can be selected (defaults to true i.e. multiple can be selected). */
    @Input() set multiple(multiple: boolean) {
        this.multiple$ = multiple;
        this.selection = new SelectionModel<T>(multiple, this.initiallySelectedValues);
        this.selectionService.selectionSubject.next(this.selection);
    }
    /** The event emitted when a button in one of the rows is clicked. */
    @Output() tableButtonClick: EventEmitter<ButtonClick>;
    /** A reference to the paginator in the template. */
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    /** A reference to the table in the template. */
    @ViewChild(MatTable, { static: true }) table!: MatTable<T>;
    /** Boolean value indicating whether multiple rows can be selected. */
    multiple$ = true;
    /** The source for the table data. */
    dataSource$!: RemoteDataSource<T> | MatTableDataSource<T>;
    /** The default page size (number of rows to show in the table). */
    pageSize = 25;
    /** The model to track items selected in the table. */
    selection: SelectionModel<T>;
    /** A reference to the sort defined in parent template. */
    sort$!: MatSort;
    /** All disposable resources for component. */
    private sub: Subscription;

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

    set sort(sort: MatSort) {
        this.sort$ = sort;
        this.initPageSortSubs();
    }

    constructor(private selectionService: SelectionService<T>) {
        if (!this.dataSource$) {
            this.dataSource$ = new MatTableDataSource();
            this.initDataSource([]);
        }
        this.selection = new SelectionModel<T>(this.multiple$, []);
        this.selectionService.selectionSubject.next(this.selection);
        this.sub = new Subscription();
        this.tableButtonClick = new EventEmitter<ButtonClick>();
    }

    initDataSource(data: T[] | RemoteDataSource<T>): void {
        if (data instanceof RemoteDataSource) {
            this.dataSource$ = data;
            this.initPageSortSubs();
        } else {
            this.dataSource$ = new MatTableDataSource(data);
            this.dataSource$.paginator = this.paginator;
            this.dataSource$.sort = this.sort$;
        }
    }

    /**
     * After the <ng-content> has been initialized, the column definitions defined
     * in the HTML where this component is referenced are available. Once they are
     * available we need to add the definitions to the table manually so the MatTable
     * is aware of all additional columns included.
     */
    ngAfterContentInit(): void {
        this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    }

    ngAfterViewInit(): void {
        if (this.dataSource$ instanceof RemoteDataSource) {
            this.initPageSortSubs();
        }
    }

    initPageSortSubs(): void {
        if (this.sort$) {
            const sortSub = this.sort$.sortChange.subscribe((sort: Sort) => {
                if (this.dataSource$ instanceof RemoteDataSource) {
                    this.dataSource$.sort = sort.active;
                    this.dataSource$.order = sort.direction;
                    this.dataSource$.pageIndex = 0;
                    this.dataSource$.refresh();
                }
            });
            this.sub.add(sortSub);
        }

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

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
    }

    onActionButtonClick(buttonClick: string, row: JsonModel): void {
        this.tableButtonClick.emit({ click: buttonClick, row });
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
