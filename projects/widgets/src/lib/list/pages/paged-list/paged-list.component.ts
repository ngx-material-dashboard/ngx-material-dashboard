/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { Component, Input } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { PagedCollectionComponent } from '../../../collection/components/paged-collection/paged-collection.component';

/**
 * The `PagedList` is a wrapper for the `List`, and renders items in a list
 * with built in paging capabilities. You must provide the template for each
 * item to render in the list. A `MatPaginator` is rendered below the `Sorter`
 * and data list to provide paging capabilities for the data.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```html
 * <ngx-mat-paged-list [data]="tasks" class="marker-paged-grid">
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
 * </ngx-mat-paged-list>
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
    selector: 'ngx-mat-paged-list',
    templateUrl: './paged-list.component.html',
    styleUrls: ['./paged-list.component.css']
})
export class PagedListComponent<
    T extends JsonModel
> extends PagedCollectionComponent<T> {
    /** Space to include between list items in pixels (defaults to 5px). */
    @Input() spaceBetween: string = '5px';
}
