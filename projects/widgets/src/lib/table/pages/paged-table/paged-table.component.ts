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
 * The PagedTableComponent represents a table with paged data. This component
 * defines most of the HTML required for a MatTable that includes a select
 * checkbox in the first column and a column for action buttons. Any additional
 * columns defined in the HTML where this selector is used are automatically
 * detected and included with the table. Columns should follow the same format
 * as a MatTable. You should include a column definition for when no table is
 * empty.
 *
 * @usageNotes
 * ```html
 * <ngx-material-dashboard-paged-table matSort [buttons]="tableButtons" [data]="data" [displayedColumns]="displayedColumns">
 *     <ng-container matColumnDef="column">
 *         <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
 *         <mat-cell *matCellDef="let row">{{row.id}}</mat-cell>
 *     </ng-container>
 *     <ng-container matColumnDef="noData">
 *         <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
 *             No data to display
 *         </mat-footer-cell>
 *     </ng-container>
 * </ngx-material-dashboard-paged-table>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {TableButton, EDIT_BUTTON, DELETE_BUTTON} from '@ngx-material-dashboard/widgets';
 * import {JsonModel} from '@models'; // assumed path defined in tsconfig 
 * 
 * @Component({
 *  selector: 'paged-table-basic-example',
 *  templateUrl: './paged-table-basic-example.html'
 * })
 * class PagedTableBasicExample {
 *    buttons: TableButton[] = [EDIT_BUTTON, DELETE_BUTTON];
 *    data: JsonModel[] = [];
 *    displayedColumns: string[] = ['select', 'id', 'name', 'actions'];
 * }
 * ```
 * 
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
