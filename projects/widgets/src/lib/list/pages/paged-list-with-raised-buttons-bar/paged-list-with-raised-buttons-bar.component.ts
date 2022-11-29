import { AfterViewInit, Component } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { PagedCollectionWithRaisedButtonToolbarComponent } from '../../../collection/components/paged-collection-with-raised-button-toolbar/paged-collection-with-raised-button-toolbar.component';

/**
 * The `PagedListWithRaisedButtonsBar` is a wrapper for the `PagedList` and
 * `RaisedButtonsToolbar` toolbar components. It allows you to define and
 * render your data models in a list with built in paging and basic data
 * management buttons with easy to use handlers for when the user clicks a
 * button in the toolbar or the collection. The toolbar is rendered above the
 * data list, and the `MatPaginator` is rendered below the data list.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-paged-list-with-raised-buttons-bar
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
 * </ngx-material-dashboard-paged-list-with-raised-buttons-bar>
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
    selector: 'ngx-material-dashboard-paged-list-with-raised-buttons-bar',
    templateUrl: './paged-list-with-raised-buttons-bar.component.html',
    styleUrls: ['./paged-list-with-raised-buttons-bar.component.css']
})
export class PagedListWithRaisedButtonsBarComponent<T extends JsonModel>
    extends PagedCollectionWithRaisedButtonToolbarComponent<T> {}
