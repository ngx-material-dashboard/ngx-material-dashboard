import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { PagedCollectionWithIconToolbarComponent } from '../../../collection/components/paged-collection-with-icon-toolbar/paged-collection-with-icon-toolbar.component';
import { GridComponent } from '../../components/grid/grid.component';

/**
 * The `GridWithIconButtonsPaginatorBar` is a wrapper for the `PagedGrid` and
 * `IconButtonsWithPaginator` toolbar components. It allows you to define and
 * render your data models in a grid with built in paging and basic data
 * management buttons with easy to use handlers for when the user clicks a
 * button in the toolbar or the collection. The toolbar is rendered above the
 * data grid.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-grid-with-icon-buttons-paginator-bar
 *     [fields]="fields"
 *     [toolbarButtons]="toolbarButtons"
 *     (buttonClick)="onButtonClick($event)"
 *     class="marker-paged-list">
 *     <ngx-material-dashboard-grid [collectionButtons]="collectionButtons" [data]="data" #collection>
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
 *     </ngx-material-dashboard-grid>
 * </ngx-material-dashboard-grid-with-icon-buttons-paginator-bar>
 * ```
 * ```typescript
 * @Component({
 *     selector: 'basic-grid-usage-example',
 *     templateUrl: './basic-grid-usage-example.html'
 * }) export class BasicGridUsageExample {
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
    selector: 'ngx-material-dashboard-grid-with-icon-buttons-paginator-bar',
    templateUrl: './grid-with-icon-buttons-paginator-bar.component.html',
    styleUrls: ['./grid-with-icon-buttons-paginator-bar.component.css']
})
export class GridWithIconButtonsPaginatorBarComponent<T extends JsonModel>
    extends PagedCollectionWithIconToolbarComponent<T> implements AfterContentInit {

    /** A reference to the table in the template. */
    @ContentChild(GridComponent) collection!: GridComponent<T>;

    ngAfterContentInit(): void {
        this.dataSource = this.collection.dataSource$;
    }
}