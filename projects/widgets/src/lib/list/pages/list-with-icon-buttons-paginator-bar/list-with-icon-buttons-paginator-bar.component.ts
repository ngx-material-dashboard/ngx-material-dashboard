import { AfterContentInit, Component, ContentChild, OnInit } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { PagedCollectionWithIconToolbarComponent } from '../../../collection/components/paged-collection-with-icon-toolbar/paged-collection-with-icon-toolbar.component';
import { ListComponent } from '../../components/list/list.component';

/**
 * The `ListWithIconButtonsPaginatorBar` is a wrapper for the `PagedList` and
 * `IconButtonsWithPaginator` toolbar components. It allows you to define and
 * render your data models in a list with built in paging and basic data
 * management buttons with easy to use handlers for when the user clicks a
 * button in the toolbar or the collection. The toolbar is rendered above the
 * data list.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-list-with-icon-buttons-paginator-bar
 *     [fields]="fields"
 *     [toolbarButtons]="toolbarButtons"
 *     (buttonClick)="onButtonClick($event)"
 *     class="marker-paged-list">
 *     <ngx-material-dashboard-list [collectionButtons]="collectionButtons" [data]="data" #collection>
 *         <ng-template #model let-model="model">
 *             <mat-card>
 *                 <mat-card-title>
 *                     {{model.id}} Title
 *                 </mat-card-title>
 *                 <mat-card-content>
 *                     Content for dummy object {{model.id}}
 *                 </mat-card-content>
 *             </mat-card>
 *         </ng-template>
 *     </ngx-material-dashboard-list>
 * </ngx-material-dashboard-list-with-icon-buttons-paginator-bar>
 * ```
 * ```typescript
 * @Component({
 *     selector: 'basic-list-usage-example',
 *     templateUrl: './basic-list-usage-example.html'
 * }) export class BasicListUsageExample {
 *     data: DummyObject[] = [...];
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
    selector: 'ngx-material-dashboard-list-with-icon-buttons-paginator-bar',
    templateUrl: './list-with-icon-buttons-paginator-bar.component.html',
    styleUrls: ['./list-with-icon-buttons-paginator-bar.component.css']
})
export class ListWithIconButtonsPaginatorBarComponent<T extends JsonModel>
    extends PagedCollectionWithIconToolbarComponent<T> {

    /** A reference to the table in the template. */
    @ContentChild(ListComponent) collection!: ListComponent<T>;

    // ngAfterContentInit(): void {
    //     this.dataSource = this.collection.dataSource$;
    // }
}
