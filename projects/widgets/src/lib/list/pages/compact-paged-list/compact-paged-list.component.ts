import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { CompactPagedCollectionComponent } from '../../../collection/components/compact-paged-collection/compact-paged-collection.component';
import { RemoteDataSource } from '../../../services/remote-data-source.service';
import { SelectionService } from '../../../table/shared/services/selection.service';

/**
 * The `CompactPagedList` is a varient of the `PagedList` that provides a 
 * more "compact" view combining CRUD capabilities with paging in a single
 * "toolbar" above the list. You provide the template for the elements in
 * the list, just like the `PagedList`.
 * 
 * @usageNotes
 * ```html
 * <ngx-material-dashboard-compact-paged-list
 *     [collectionButtons]="collectionButtons"
 *     [data]="data"
 *     [fields]="fields"
 *     [multiple]="multiple"
 *     [toolbarButtons]="toolbarButtons"
 *     class="marker-paged-list">
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
 * </ngx-material-dashboard-compact-paged-list>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {Task} from './tasks'; // this should extend JsonModel
 * 
 * @Component({
 *     selector: 'compact-paged-list-usage-example',
 *     templateUrl: './compact-paged-list-usage-example.html'
 * }) CompactPagedListUsageExample 
 *     extends AbstractCompactPagedCollectionComponent<Task> {
 *     tasks: Task[] = []; // assuming this is initialized with data at some point
 * }
 * ```
 */
@Component({
    selector: 'ngx-material-dashboard-compact-paged-list',
    templateUrl: './compact-paged-list.component.html',
    styleUrls: ['./compact-paged-list.component.css']
})
export class CompactPagedListComponent <T extends JsonModel>
    extends CompactPagedCollectionComponent<T> {}
