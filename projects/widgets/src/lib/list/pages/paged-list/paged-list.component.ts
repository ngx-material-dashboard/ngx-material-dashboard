import { Component, Input } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { AbstractPagedCollectionComponent } from '../../../collection/pages/abstract-paged-collection/abstract-paged-collection.component';
import { Button } from '../../../shared/interfaces/button.interface';

/**
 * The `PagedListComponent` renders items in a list with built in paging
 * capabilities. You provide the template for each item to render in the list.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-paged-list [data]="tasks" class="marker-paged-grid">
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
 * </ngx-material-dashboard-paged-list>
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
    selector: 'ngx-material-dashboard-paged-list',
    templateUrl: './paged-list.component.html',
    styleUrls: ['./paged-list.component.css']
})
export class PagedListComponent<T extends JsonModel>
    extends AbstractPagedCollectionComponent<T> {

    /** The buttons to render in each row of the table. */
    @Input() collectionButtons: Button[] = [];
    /** List of fields included in each element of list that can be sorted on. */
    @Input() fields: string[] = [];
}

