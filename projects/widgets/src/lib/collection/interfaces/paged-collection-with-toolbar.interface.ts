import { FormGroup } from '@angular/forms';
import { JsonDatastore, JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { RemoteDataSource } from '../../services/remote-data-source.service';
import { Button } from '../../shared/interfaces/button.interface';
import { ToolbarButton } from '../../toolbar/interfaces/toolbar-button.interface';

/**
 * Defines all properties and methods necessary to utilize built in capabilities
 * for components that extend the `AbstractPagedCollectionWithToolbar`. Any component
 * that extends `AbstractPagedCollectionWithToolbar` should implement this interface
 * to ensure all necessary properties and method are defined.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-paged-list-with-toolbar
 *      [form]="filterForm"
 *      [toolbarButtons]="toolbarButtons"
 *      (buttonClick)="onButtonClick($event)">
 *     <ngx-material-dashboard-filter-drop-down filter>
 *         <form [formGroup]="filterForm" fxLayout="column">
 *             <mat-form-field fxFlex="noshrink">
 *                 <input matInput type="text" formControlName="name">
 *             </mat-form-field>
 *         </form>
 *     </ngx-material-dashboard-filter-drop-down>
 *     <ngx-material-dashboard-paged-list matSort 
 *          [data]="data"
 *          [displayedColumns]="displayedColumns"
 *          [collectionButtons]="collectionButtons" table>
 *         <ng-container matColumnDef="id">
 *             <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
 *             <mat-cell *matCellDef="let row">{{row.id}}</mat-cell>
 *         </ng-container>
 *         <ng-container matColumnDef="name">
 *             <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
 *             <mat-cell *matCellDef="let row">{{row.name}}</mat-cell>
 *         </ng-container>
 *     </ngx-material-dashboard-paged-list>
 * </ngx-material-dashboard-paged-list-with-toolbar>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {FormBuilder} from '@angular/forms';
 * import {MatDialog} from '@angular/material/dialog';
 * import {JsonApiQueryData} from '@ngx-material-dashboard/base-json';
 * import {ConfirmDeleteDialogComponent, PagedListWithToolbar, AbstractPagedCollectionWithToolbarComponent} from '@ngx-material-dashboard/widgets';
 * import {ToastrService} from 'ngx-toastr';
 * import {Model} from '@shared/models/model';
 * import {JsonApiService} from '@shared/services/json-api.service';
 * import {CreateModelDialogComponent} from './create-model-dialog/create-model-dialog.component';

 * @Component({
 *     selector: 'abstract-paged-collection-with-toolbar-usage-example',
 *     templateUrl: './abstract-paged-collection-with-toolbar-usage-example.html'
 * })
 * export class AbstractPagedCollectionWithToolbarUsageExample
 *  extends AbstractPagedCollectionWithToolbarComponent<Model> 
 *  implements PagedCollectionWithToolbar<Model> {
 *
 *     override jsonApiService: JsonApiService;
 *     filterForm!: FormGroup;
 *
 *     constructor(
 *         dialog: MatDialog,
 *         formBuilder: FormBuilder,
 *         jsonApiService: JsonApiService,
 *         toastrService: ToastrService
 *     ) {
 *         super(Model, dialog, formBuilder, jsonApiService, toastrService);
 *         this.jsonApiService = jsonApiService;
 *     }
 *
 *     override ngOnInit(): void {
 *         // load initial data
 *         this.dataSource.load({}, 'name', 'asc', 0, 25);
 *         super.ngOnInit();
 * 
 *         // create form for filter drop down and add as control to form group
 *         // defined in super class of 'searchFilter'
 *         this.filterForm = this.formBuilder.group({
 *             name: [null, [Validators.required]]
 *         });
 *         this.form.addControl('searchFilter', filterForm);
 *     }
 *
 *     override openCreateDialog(): void {
 *         super.openCreateDialogUtil(CreateMealDialogComponent, dialogConfig);
 *     }
 *
 *     override openConfirmDeleteDialog(val: Model): void {
 *         const dialogConfig = {
 *             data: {
 *                 title: 'Delete Model?',
 *                 content: `Are you sure you want to delete the selected model ${val.name}`
 *             }
 *         };
 *
 *         super.openConfirmDeleteDialogUtil(val, ConfirmDeleteDialogComponent, dialogConfig);
 *     }
 * }
 * ```
 */
export interface PagedCollectionWithToolbar<T extends JsonModel> {

    /** The form for the search filter in toolbar. */
    form: FormGroup;
    /** The source for collection data. */
    dataSource: RemoteDataSource<T>;
    /** Service for interacting with server API. */
    jsonApiService: JsonDatastore;
    /** Shared subscription that is meant to hold all subscriptions in component. */
    sub: Subscription;
    /** The list of buttons to display with each item in collection. */
    collectionButtons: Button[];
    /** The list of buttons to display in the toolbar above table. */
    toolbarButtons: ToolbarButton[];

    /**
     * Lifecycle hook for when component is destroyed.
     */
    ngOnDestroy: () => void;

    /**
     * Lifecycle hook for when component is initialized.
     */
    ngOnInit: () => void;

    /**
     * Open dialog for creating a new object.
     */
    openCreateDialog: () => void;

    /**
     * Open dialog to confirm if user wants to delete object.
     * 
     * @param val The object to delete.
     */
    openConfirmDeleteDialog: (val: T) => void;
}