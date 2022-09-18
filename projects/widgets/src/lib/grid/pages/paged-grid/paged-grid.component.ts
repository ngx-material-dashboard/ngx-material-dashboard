import { Component } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { AbstractPagedCollectionComponent } from '../../../collection/pages/abstract-paged-collection/abstract-paged-collection.component';

/**
 * The `PagedGridComponent` renders items in a grid with built in paging
 * capabilities. You provide the template for each item to render in the grid,
 * and the grid will attempt to calculate and render the appropriate number
 * of items that can fit on the available screen space.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-paged-grid [data]="tasks" class="marker-paged-grid">
 *     <ng-template #model let-model="model">
 *         <mat-card>
 *             <mat-card-title>
 *                 {{model.id}} Title
 *             </mat-card-title>
 *             <mat-card-content>
 *                 Content for dummy object {{model.id}}
 *             </mat-card-content>
 *         </mat-card>
 *     </ng-template>
 * </ngx-material-dashboard-paged-grid>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {Task} from './tasks'; // this should extend JsonModel
 * 
 * @Component({
 *     selector: 'basic-usage-example',
 *     templateUrl: './basic-usage-example.html'
 * }) UsingBasicUsageExample {
 *     tasks: Task[] = []; // assuming this is initialized with data at some point
 * }
 * ```
 */
@Component({
    selector: 'ngx-material-dashboard-paged-grid',
    templateUrl: './paged-grid.component.html',
    styleUrls: ['./paged-grid.component.css']
})
export class PagedGridComponent<T extends JsonModel> 
extends AbstractPagedCollectionComponent<T>{}
