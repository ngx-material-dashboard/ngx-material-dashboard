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
 * The `PagedGrid` is a wrapper for the `Grid` component which adds paging
 * capabilities. Like the `Grid`, you must define the template for each item in
 * the grid in the template where you intend to include this component.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```html
 * <ngx-mat-paged-grid [data]="tasks" class="marker-paged-grid">
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
 * </ngx-mat-paged-grid>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {Task} from './tasks'; // this should extend JsonModel
 *
 * @Component({
 *     selector: 'basic-usage-example',
 *     templateUrl: './basic-usage-example.html'
 * }) UsingBasicUsageExample {
 *     tasks: Task[] = [...];
 * }
 * ```
 */
@Component({
    selector: 'ngx-mat-paged-grid',
    templateUrl: './paged-grid.component.html',
    styleUrls: ['./paged-grid.component.css']
})
export class PagedGridComponent<
    T extends JsonModel
> extends PagedCollectionComponent<T> {
    /** The number of cols to render in the grid. */
    @Input() defaultCols?: number;
    /** Size of grid lists gutter in pixels (same as mat-grid-list). */
    @Input() gutterSize?: number = 2;
}
