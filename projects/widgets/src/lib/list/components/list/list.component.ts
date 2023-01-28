import { Component } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { CollectionComponent } from '../../../collection/components/collection/collection.component';

/**
 * The `List` extends `Collection` and is meant for rendering items in a list.
 * A `Sorter` is rendered above the data list, which is meant to allow users to
 * well sort the data in the list based on the provided `field` options users
 * should be able to sort the data on.
 *
 * @usageNotes
 * ### Basic Usage Example
 * ```html
 * <ngx-material-dashboard-list [data]="data" [fields]="fields">
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
 * </ngx-material-dashboard-list>
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
    selector: 'ngx-material-dashboard-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent<
    T extends JsonModel
> extends CollectionComponent<T> {}
