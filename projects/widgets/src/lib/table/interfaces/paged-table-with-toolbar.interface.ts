import { AbstractControl, FormGroup } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { JsonDatastore, JsonModel } from "@ngx-material-dashboard/base-json";
import { filter, Subscription } from "rxjs";
import { RemoteDataSource } from "../../services/remote-data-source.service";
import { TableButton } from "./table-button.interface";
import { TableToolbarButton } from "./table-toolbar-button.interface";

/**
 * Defines all properties and methods necessary to utilize built in capabilities
 * for components that extend the `AbstractPagedTableWithToolbar`. Any component
 * that extends `AbstractPagedTableWithToolbar` should implement this interface
 * to ensure all necessary properties and method are defined.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-paged-table-with-toolbar
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
 *     <ngx-material-dashboard-paged-table matSort 
 *          [data]="data"
 *          [displayedColumns]="displayedColumns"
 *          [tableButtons]="tableButtons" table>
 *         <ng-container matColumnDef="id">
 *             <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
 *             <mat-cell *matCellDef="let row">{{row.id}}</mat-cell>
 *         </ng-container>
 *         <ng-container matColumnDef="name">
 *             <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
 *             <mat-cell *matCellDef="let row">{{row.name}}</mat-cell>
 *         </ng-container>
 *         <ng-container matColumnDef="noData">
 *             <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
 *                 No data to display
 *             </mat-footer-cell>
 *         </ng-container>
 *     </ngx-material-dashboard-paged-table>
 * </ngx-material-dashboard-paged-table-with-toolbar>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {FormBuilder} from '@angular/forms';
 * import {MatDialog} from '@angular/material/dialog';
 * import {JsonApiQueryData} from '@ngx-material-dashboard/base-json';
 * import {ConfirmDeleteDialogComponent, PagedTableWithToolbar, AbstractPagedTableWithToolbarComponent} from '@ngx-material-dashboard/widgets';
 * import {ToastrService} from 'ngx-toastr';
 * import {Model} from '@shared/models/model';
 * import {JsonApiService} from '@shared/services/json-api.service';
 * import {CreateModelDialogComponent} from './create-model-dialog/create-model-dialog.component';

 * @Component({
 *     selector: 'abstract-paged-table-with-toolbar-usage-example',
 *     templateUrl: './abstract-paged-table-with-toolbar-usage-example.html'
 * })
 * export class AbstractPagedTableWithToolbarUsageExample
 *  extends AbstractPagedTableWithToolbarComponent<Model> 
 *  implements PagedTableWithToolbar<Model> {
 *
 *     override displayedColumns: string[] = ['select', 'name', 'actions'];
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
export interface PagedTableWithToolbar<T extends JsonModel> {

    /** The form for the search filter in toolbar. */
    form: FormGroup;
    /** The source for table data. */
    dataSource: RemoteDataSource<T>;
    /** The list of columns to display in table. */
    displayedColumns: string[];
    /** Service for interacting with server API. */
    jsonApiService: JsonDatastore;
    /** Shared subscription that is meant to hold all subscriptions in component. */
    sub: Subscription;
    /** The list of buttons to display in each row of table. */
    tableButtons: TableButton[];
    /** The list of buttons to display in the toolbar above table. */
    toolbarButtons: TableToolbarButton[];

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
