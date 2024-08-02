/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { Component, Input } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { CollectionComponent } from '../../../collection/components/collection/collection.component';

/**
 * The `List` extends `Collection` and is meant for rendering items in a list.
 * A `Sorter` is rendered above the data list, which is meant to allow users to
 * well sort the data in the list based on the provided `field` options users
 * should be able to sort the data on.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```html
 * <ngx-mat-list [data]="data" [fields]="fields">
 *     <ng-template #model let-model="model">
 *        <mat-card>
 *            <mat-card-title>
 *                {{model.id}} Title
 *            </mat-card-title>
 *            <mat-card-content>
 *                Content for dummy object {{model.id}}
 *            </mat-card-content>
 *       </mat-card>
 *     </ng-template>
 * </ngx-mat-list>
 * ```
 * ```typescript
 * @Component({
 *     selector: 'basic-list-usage-example',
 *     templateUrl: './basic-list-usage-example.html'
 * }) export class BasicListUsageExample {
 *     data: Task[] = [...];
 *     fields: string[] = ['id'];
 * }
 * ```
 */
@Component({
    selector: 'ngx-mat-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent<T extends JsonModel> extends CollectionComponent<T> {
    /** Space to include between list items in pixels (defaults to 5px). */
    @Input() spaceBetween: string = '5px';
}
