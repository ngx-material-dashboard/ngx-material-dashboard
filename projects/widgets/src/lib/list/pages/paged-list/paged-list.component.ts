import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { AbstractPagedCollectionComponent } from '../../../collection/pages/abstract-paged-collection/abstract-paged-collection.component';
import { RemoteDataSource } from '../../../shared/services/remote-data-source.service';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { SelectionService } from '../../../shared/services/selection.service';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
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

