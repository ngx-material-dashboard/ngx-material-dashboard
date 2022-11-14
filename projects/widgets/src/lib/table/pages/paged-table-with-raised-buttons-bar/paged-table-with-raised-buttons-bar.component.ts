import { AfterViewInit, Component, ContentChild, Input } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { PagedCollectionWithRaisedButtonToolbarComponent } from '../../../collection/components/paged-collection-with-raised-button-toolbar/paged-collection-with-raised-button-toolbar.component';
import { PagedTableComponent } from '../paged-table/paged-table.component';

/**
 * The `PagedTableWithIconButtonsPaginatorBar` is a wrapper for the
 * `PagedPagedTable` and `IconButtonsWithPaginator` toolbar components. It
 * allows you to define and render your data models in a paged-table with
 * built in paging and basic data management buttons with easy to use
 * handlers for when the user clicks a button in the toolbar or the
 * collection. The toolbar is rendered above the data paged-table.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-paged-table-with-icon-buttons-paginator-bar
 *     [fields]="fields"
 *     [toolbarButtons]="toolbarButtons"
 *     (buttonClick)="onButtonClick($event)"
 *     class="marker-paged-list">
 *     <ngx-material-dashboard-paged-table
 *          [collectionButtons]="collectionButtons"
 *          [data]="data"
 *          [displayedColumns]="displayedColumns"
 *          collection
 *          #collection>
 *         <ng-container matColumnDef="name">
 *             <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
 *             <mat-cell class="name-cell" *matCellDef="let obj">{{obj.name}}</mat-cell>
 *         </ng-container>
 *         <ng-container matColumnDef="description">
 *             <mat-header-cell *matHeaderCellDef mat-sort-header>Description</mat-header-cell>
 *             <mat-cell class="description-cell" *matCellDef="let obj">{{obj.description}}</mat-cell>
 *         </ng-container>
 *         <ng-container matColumnDef="dueDate">
 *             <mat-header-cell *matHeaderCellDef mat-sort-header>Due Date</mat-header-cell>
 *             <mat-cell class="due-date-cell" *matCellDef="let obj">{{obj.dueDate}}</mat-cell>
 *         </ng-container>
 *         <ng-container matColumnDef="noData">
 *             <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
 *                 No data found
 *             </mat-footer-cell>
 *         </ng-container>
 *     </ngx-material-dashboard-paged-table>
 * </ngx-material-dashboard-paged-table-with-icon-buttons-paginator-bar>
 * ```
 * ```typescript
 * @Component({
 *     selector: 'basic-paged-table-usage-example',
 *     templateUrl: './basic-paged-table-usage-example.html'
 * }) export class BasicPagedTableUsageExample {
 *     data: Task[] = [...];
 *     displayedColumns: string[] = ['select', 'name', 'description', 'dueDate', 'actions'];
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
    selector: 'ngx-material-dashboard-paged-table-with-raised-buttons-bar',
    templateUrl: './paged-table-with-raised-buttons-bar.component.html',
    styleUrls: ['./paged-table-with-raised-buttons-bar.component.scss']
})
export class PagedTableWithRaisedButtonsBarComponent<T extends JsonModel> 
    extends PagedCollectionWithRaisedButtonToolbarComponent<T> implements AfterViewInit {

    /** Columns to display in the table. */
    @Input() displayedColumns: string[] = ['select', 'actions'];
    /** A reference to the table in the template. */
    @ContentChild('collection') override collectionCmp!: PagedTableComponent<T>;

    // override ngAfterViewInit(): void {
    //     this.paginator$ = this.collectionCmp.paginator$;
    //     this.sort$ = this.collectionCmp.sort$;
    //     this.dataSource = this.collectionCmp.dataSource$;
    //     super.ngAfterViewInit();
    //     // set selection for component to selection from base collection
    //     this.selection = this.collectionCmp.table.selection;
    // }
}
