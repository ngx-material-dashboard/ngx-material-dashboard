/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { Component, ContentChild, Input } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { PagedCollectionWithIconToolbarComponent } from '../../../collection/components/paged-collection-with-icon-toolbar/paged-collection-with-icon-toolbar.component';
import { TableComponent } from '../../components/table/table.component';

/**
 * The `PagedTableWithIconButtonsPaginatorBar` is a wrapper for the `PagedPagedTable` and
 * `IconButtonsWithPaginator` toolbar components. It allows you to define and
 * render your data models in a paged-table with built in paging and basic data
 * management buttons with easy to use handlers for when the user clicks a
 * button in the toolbar or the collection. The toolbar is rendered above the
 * data paged-table.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```html
 * <ngx-mat-table-with-icon-buttons-paginator-bar
 *     [fields]="fields"
 *     [toolbarButtons]="toolbarButtons"
 *     (buttonClick)="onButtonClick($event)"
 *     class="marker-paged-paged-table">
 *     <ngx-mat-paged-table [collectionButtons]="collectionButtons" [data]="data" #collection>
 *         <ng-container matColumnDef="id">
 *             <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
 *             <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
 *         </ng-container>
 *         <ng-container matColumnDef="noData">
 *             <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
 *                 No data found
 *             </mat-footer-cell>
 *         </ng-container>
 *     </ngx-mat-paged-table>
 * </ngx-mat-table-with-icon-buttons-paginator-bar>
 * ```
 * ```typescript
 * @Component({
 *     selector: 'basic-paged-table-usage-example',
 *     templateUrl: './basic-paged-table-usage-example.html'
 * }) export class BasicPagedTableUsageExample {
 *     data: Task[] = [...];
 *     fields: string[] = ['id'];
 *     // either create your own, or use copies of buttons provided for both
 *     // collection and toolbar; use copies without references in case you
 *     // have multiple collections to render so each one gets their own
 *     // buttons and own subscriptions (otherwise events in one table will
 *     // affect buttons in others)
 *     collectionButtons: CollectionButton[] = [
 *         {...EDIT_BUTTON}, {...DELETE_BUTTON}
 *     ];
 *     toolbarButtons: ToolbarButton[] = [
 *         {...CREATE_TOOLBAR_BUTTON}, {...EDIT_TOOLBAR_BUTTON}, {...DELETE_TOOLBAR_BUTTON}
 *     ];
 *
 *     onButtonClick(btnClick: ButtonClick): void {
 *         if (btnClick.click === 'create') {
 *             // handle create
 *         } else if (btnClick.click === 'edit') {
 *             // handle edit
 *         } else if (btnClick.click === 'delete') {
 *             // handle delete
 *         }
 *     }
 * }
 * ```
 */
@Component({
    selector: 'ngx-mat-table-with-icon-buttons-paginator-bar',
    templateUrl: './table-with-icon-buttons-paginator-bar.component.html',
    styleUrls: ['./table-with-icon-buttons-paginator-bar.component.css']
})
export class TableWithIconButtonsPaginatorBarComponent<
    T extends JsonModel
> extends PagedCollectionWithIconToolbarComponent<T> {
    /** Columns to display in the table. */
    @Input() displayedColumns: string[] = ['select', 'actions'];
    /** A reference to the table in the template. */
    @ContentChild(TableComponent) override collectionCmp!: TableComponent<T>;
    /** A reference to the sort defined for the component. */
    //override sort$: MatSort;

    // constructor(changeDetectorRef: ChangeDetectorRef) {
    //     super(changeDetectorRef);
    //     //this.sort$ = matSort;
    // }
}
