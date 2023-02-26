import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { PagedCollectionComponent } from '../../../collection/components/paged-collection/paged-collection.component';
import { TableComponent } from '../../components/table/table.component';

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
 * on the `JsonModel` and `JsonDatastore` check out the [base-json](/base-json)
 * documentation.
 *
 * @usageNotes
 * #### Basic Local Data Usage
 * ```html
 * <ngx-mat-paged-table matSort [data]="data" [displayedColumns]="displayedColumns">
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
 * </ngx-mat-paged-table>
 * ```
 * ```typescript
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
 * #### Remote Data Usage Example
 * ```html
 * <ngx-mat-paged-table
 *     matSort
 *     [buttons]="collectionButtons"
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
 * </ngx-mat-paged-table>
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
 * #### Features
 *
 * The `PagedTable` provides some features out of the box that must be manaully
 * added for `MatTable`s. While you can add all of the features provided by
 * `PagedTable` to a `MatTable` directly, and there are examples of addeding
 * each of those features provided in the Angular Material documentation, the
 * `PagedTable` helps to reduce the amount of code needed and simplify adding
 * those features to the tables in your application.
 *
 * The main feature provided by `PagedTable` is unsurprisingly pagination.
 * Additionally there is sorting and table selection. See the sections below
 * for specifics on each of the features.
 *
 * ##### Pagination
 *
 * The `PagedTable` includes the `<mat-paginator>` in the components template,
 * and handles initializing the pagination for both local and remote data. There
 * is no additional configuration necessary to use this feature.
 *
 * ##### Sort
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
 * <ngx-mat-paged-table matSort [data]="data">
 *     <ng-container matColumnDef="name">
 *         <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
 *         <mat-cell *matCellDef="let row">{{row.name}}</mat-cell>
 *     </ng-container>
 * </ngx-mat-paged-table>
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
 *
 * ##### Selection
 *
 * The `PagedTable` provides all code necessary for handling selecting one or
 * more rows in your tables. The only thing you need to do is add the `select`
 * column to your array of `displayedColumns` that you pass as an `@Input`
 * value to the component. You can use the `selectionChange` `Observable`
 * provided in the `SelectionService` which is included with the `TableModule`
 * for handling change events. This returns an `Observable` of ` a
 * `SelectionModel` from `@angular/cdk/collections`, which should be easy
 * enough to work with if you are familiar with the example solution provided
 * for `MatTable` in the Angular Material (documentation)
 *
 * ### No Table Data
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
    selector: 'ngx-mat-paged-table',
    templateUrl: './paged-table.component.html',
    styleUrls: ['./paged-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagedTableComponent<T extends JsonModel>
    extends PagedCollectionComponent<T>
    implements AfterContentInit, AfterViewInit
{
    /** A reference to the columns defined; allows user to define columns inside selector for this component. */
    @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
    /** Columns to display in the table. */
    @Input() displayedColumns: string[] = ['select', 'actions'];
    /** A reference to the table in the template. */
    @ViewChild(TableComponent, { static: true })
    override collection$!: TableComponent<T>;
    @ViewChild(MatPaginator) override paginator$!: MatPaginator;

    /**
     * Creates a new PagedTableComponent. Note that the matSort directive is
     * included in the constructor per the answer provided at the stackoverflow
     * question here: https://stackoverflow.com/a/58548837. Apparently there is
     * an issue accessing directives included directly in components and the
     * only way to access them is with DI.
     *
     * @param sort$ DI directive needed for sorting columns.
     */
    constructor(private sort$: MatSort) {
        super();
    }

    /**
     * After the <ng-content> has been initialized, the column definitions defined
     * in the HTML where this component is referenced are available. Once they are
     * available we need to add the definitions to the table manually so the MatTable
     * is aware of all additional columns included.
     */
    ngAfterContentInit(): void {
        this.columnDefs.forEach((columnDef) =>
            this.collection$.table.addColumnDef(columnDef)
        );
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.collection$.dataSource$.paginator = this.paginator$;
        this.collection$.dataSource$.sort = this.sort$;
    }
}
