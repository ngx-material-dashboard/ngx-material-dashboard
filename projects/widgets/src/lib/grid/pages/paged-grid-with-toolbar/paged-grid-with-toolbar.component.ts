import { Component } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { BasePagedCollectionWithToolbarComponent } from '../../../collection/components/base-paged-collection-with-toolbar/base-paged-collection-with-toolbar.component';

/**
 * The `PagedGridWithToolbar` is a wrapper component for the `PagedGrid` and
 * the `ButtonToolbar`. It provides built in paging capabilities from the
 * `PagedGrid`, and basic CRUD handling capabilities using buttons defined in
 * the toolbar and the grid. You can define your own toolbar buttons and
 * buttons to render inside the collection (next to each item rendered in the
 * grid), or you may utilize the default buttons provided (create, edit, and
 * delete). Just like with the `PagedGrid` you provide the
 * template for each item to render in the grid, and the grid will attempt to
 * calculate and render the appropriate number of items that can fit on the 
 * available screen space.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-paged-grid-with-toolbar>
 *     <ngx-material-dashboard-filter-drop-down filter>
 *         <!-- filter form goes here -->
 *     </ngx-material-dashboard-filter-drop-down>
 *     <ngx-material-dashboard-paged-grid
 *         [data]="tasks"
 *         [fields]="fields"
 *         class="marker-paged-grid"
 *         #pagedCollection>
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
 *     </ngx-material-dashboard-paged-grid>
 * </ngx-material-dashboard-paged-grid-with-toolbar> 
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {Task} from './tasks'; // this should extend JsonModel
 * 
 * @Component({
 *     selector: 'paged-grid-with-toolbar-usage-example',
 *     templateUrl: './paged-grid-with-toolbar-usage-example.html'
 * }) UsingBasicUsageExample {
 *     tasks: Task[] = []; // assuming this is initialized with data at some point
 *     fields: string[] = ['id', 'name']; // these are the fields that can be sorted
 * }
 * ```
 */
@Component({
    selector: 'ngx-material-dashboard-paged-grid-with-toolbar',
    templateUrl: './paged-grid-with-toolbar.component.html',
    styleUrls: ['./paged-grid-with-toolbar.component.css']
})
export class PagedGridWithToolbarComponent<T extends JsonModel>
    extends BasePagedCollectionWithToolbarComponent<T> {}
