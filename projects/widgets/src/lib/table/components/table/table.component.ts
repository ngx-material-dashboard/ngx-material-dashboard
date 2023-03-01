/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import {
    AfterContentInit,
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { CollectionComponent } from '../../../collection/components/collection/collection.component';
import { SelectionService } from '../../../collection/services/selection.service';

/**
 * The `Table` is a wrapper for `MatTable`, and provides features defined in
 * `Collection`. Think of it as a `MatTable` plus, or `MatTable+` for short
 * if you will. Sorting columns in the table is automatically built in to
 * the component. Additionally it provides built in select one or more (or all)
 * capabilities, as well as rendering one or more buttons in each row and
 * emitting click events for you to handle response to clicks.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```html
 * <ngx-mat-table
 *     matSort
 *     [collectionButtons]="collectionButtons"
 *     [data]="data"
 *     [displayedColumns]="displayedColumns">
 *     <ng-container matColumnDef="id">
 *         <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
 *         <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
 *     </ng-container>
 *     <ng-container matColumnDef="noData">
 *         <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
 *             No data found
 *         </mat-footer-cell>
 *     </ng-container>
 * </ngx-mat-table>
 * ```
 * ```typescript
 * @Component({
 *     selector: 'basic-table-usage-example',
 *     templateUrl: './basic-table-usage-example.html'
 * }) export class BasicTableUsageExample {
 *     // either create your own, or use copies of buttons provided
 *     collectionButtons: CollectionButton[] = [
 *         {...EDIT_BUTTON}, {...DELETE_BUTTON}
 *     ];
 *     data: Task[] = [...];
 *     displayedColumns: string[] = ['select', 'id', 'actions'];
 * }
 * ```
 *
 * @overviewDetails
 * #### Features
 *
 * The `Table` automatically wires up sorting, renders and handles select
 * one or more rows, as well as adding one or more buttons to each row and
 * handling click events for those buttons.
 *
 * ##### Sorting
 *
 * To make sorting work all you need to do is add the `matSort` directive to
 * the `Table` selector and the `mat-sort-header` directive to the header cells
 * for the columns you want to be able to sort on. Other than making sure to
 * include the `MatSortModule` in the module where you define the component
 * that uses `Table`, there is nothing else you need to do.
 *
 * ##### Select
 *
 * The `Table` defines a column for selecting one, more, or all rows in the
 * table (select all being in the header). To utilize the select column simply
 * include `'select'` as one of the `displayedColumns` for the `Table`, and
 * it will be rendered along with all other columns included in the property.
 *
 * ##### Row Buttons
 *
 * A column for rendering one or more buttons in each row of the table is
 * also included in the main template. Additionally, `Table` includes
 * the `buttonClick` event emitter that emits a `ButtonClick` event which
 * should include the type of button that was clicked and the row data for
 * the row where the button was clicked. To utilize buttons in each row
 * of the table you must add an array of `collectionButtons` as an input
 * to the `Table` selector, and define a handler for `buttonClick` event
 * emitter.
 */
@Component({
    selector: 'ngx-mat-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent<T extends JsonModel>
    extends CollectionComponent<T>
    implements AfterContentInit
{
    /** A reference to the columns defined; allows user to define columns inside selector for this component. */
    @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
    /** Columns to display in the table. */
    @Input() displayedColumns: string[] = ['select', 'actions'];
    /** A reference to the table in the template. */
    @ViewChild(MatTable, { static: true }) table!: MatTable<T>;

    /**
     * After the <ng-content> has been initialized, the column definitions defined
     * in the HTML where this component is referenced are available. Once they are
     * available we need to add the definitions to the table manually so the MatTable
     * is aware of all additional columns included.
     */
    ngAfterContentInit(): void {
        this.columnDefs.forEach((columnDef) =>
            this.table.addColumnDef(columnDef)
        );
    }

    constructor(selectionService: SelectionService<T>, matSort: MatSort) {
        super(selectionService);
        this.sort$ = matSort;
    }
}
