import { ComponentType } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { filter, Subscription } from 'rxjs';

import { JsonDatastore, JsonModel, ModelType } from '@ngx-material-dashboard/base-json';
import { ButtonClick } from '../../interfaces/button-click.interface';
import { TableButton } from '../../interfaces/table-button.interface';
import { TableToolbarButton } from '../../interfaces/table-toolbar-button.interface';
import { RemoteDataSource } from '../../../services/remote-data-source.service';
import { EDIT_BUTTON, DELETE_BUTTON } from '../../shared/table-buttons';
import { CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON } from '../../shared/table-toolbar-buttons';

import { PagedTableWithToolbar } from '../../interfaces/paged-table-with-toolbar.interface';

/** Default buttons that appear in each row inside actions column. */
const DEFAULT_TABLE_BUTTONS = [EDIT_BUTTON, DELETE_BUTTON];
/** Default buttons for toolbar above table. */
const DEFAULT_TABLE_TOOLBAR_BUTTONS = [
    CREATE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON
];

/**
 * The AbstractPagedTableWithToolbarComponent is an "abstract" base component
 * for all components that utilize the PagedTableWithToolbarComponent. This
 * component provides some shared methods that are useful for these types of
 * components. 
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
 * export class AbstractPagedTableWithToolbarUsageExample extends AbstractPagedTableWithToolbarComponent<Model> {
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
 *         super.openCreateDialogUtil(CreateMealDialogComponent);
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
 * 
 * > NOTE: The abstract component implementation assumes you are using a dialog
 * > to create and delete your data. You must provide your own dialog to create
 * > your data, but the `ConfirmDeleteDialog` is included in this library so you
 * > don't have to define your own delete confirm dialog.
 * 
 * ## Features
 * 
 * The `AbstractPagedTableWithToolbar` provides basic handling for creating and
 * deleting objects rendered in the table. All you have to do is include
 * implementations for the `openCreateDialog` and `openConfirmDeleteDialog`
 * methods. These methods should call their respective `Util` functions defined
 * in this class.
 */
@Component({
    template: ''
})
export class AbstractPagedTableWithToolbarComponent<T extends JsonModel> 
    implements PagedTableWithToolbar<T> {

    form!: FormGroup;
    dataSource: RemoteDataSource<T>;
    displayedColumns!: string[];
    jsonApiService: JsonDatastore;
    sub: Subscription;
    tableButtons: TableButton[] = [];
    toolbarButtons: TableToolbarButton[] = [];

    constructor(
        @Inject(JsonModel) private modelType: ModelType<T>,
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        jsonApiService: JsonDatastore,
        private toastrService: ToastrService
    ) {
        this.jsonApiService = jsonApiService;
        this.dataSource = new RemoteDataSource<T>(this.modelType, this.jsonApiService);
        this.sub = new Subscription();
    }

    ngOnDestroy(): void {
        // unsubscribe from all subscriptions in component
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        // load initial data; you have to do something in extending component
        // everything can't be automatic... plus I don't want to make any
        // assumptions as to what column to default to for sorting or any 
        // includes that may be required in table
        // this.dataSource.load({}, 'name', 'asc', 0, 25, 'mealType');
        
        // initialize form used for search filter
        this.form = this.formBuilder.group({});

        // initialize table and toolbar buttons with default ones
        this.tableButtons = DEFAULT_TABLE_BUTTONS;
        this.toolbarButtons = DEFAULT_TABLE_TOOLBAR_BUTTONS;
    }

    onButtonClick(buttonClick: ButtonClick): void {
        if (buttonClick.click === 'create') {
            this.openCreateDialog();
        } else if (buttonClick.click === 'delete' && buttonClick.row) {
            this.openConfirmDeleteDialog(buttonClick.row as T);
        }
    }

    openCreateDialog(): void {}

    /**
     * Opens the given dialog component using the given optional configuration,
     * and sets up the subscription on the `afterClosed` event for the dialog
     * to handle creating a new object. The dialog component should return a
     * data map that can be used to initialize an object when the user clicks
     * the save button, otherwise nothing should be returned.
     *
     * @param dialogComponent The dialog where an object is initialized.
     * @param dialogConfig Optional configuration for the dialog.
     */
    openCreateDialogUtil(dialogComponent: ComponentType<unknown>, dialogConfig?: MatDialogConfig): void {
        // open the dialog
        const dialogRef = this.dialog.open(dialogComponent, dialogConfig);

        // save object when dialog closes
        const afterCloseSub = dialogRef.afterClosed()
        .pipe(
            // only include data that is defined; this prevents component from
            // creating objects without any data defined (and not having to 
            // include condition inside subscribe to ensure data defined)
            (filter((data: Partial<T>) => data !== undefined))
        )
        .subscribe((data: Partial<T>) => {
            const val: T = this.jsonApiService.createRecord(this.modelType, data);
            val.save().subscribe(() => {
                this.dataSource.refresh();
                this.toastrService.success(`${this.modelType.name} created successfully`);
            });
        });
        this.sub.add(afterCloseSub);
    }

    openConfirmDeleteDialog(val: T): void {}

    /**
     * Opens the given dialog component with the given optional configuration,
     * and sets up the subscription on the `afterClosed` event for the dialog
     * to handle deleting the given object.
     *
     * @param val The object to delete.
     * @param dialogComponent A confirmation dialog to make sure user wants to delete.
     * @param dialogConfig Optional configuration for the dialog.
     */
    openConfirmDeleteDialogUtil(val: T, dialogComponent: ComponentType<unknown>, dialogConfig: MatDialogConfig): void {
        // open dialog
        const dialogRef = this.dialog.open(dialogComponent, dialogConfig);
        
        // delete object when dialog closes (if user confirmed delete)
        const afterCloseSub = dialogRef.afterClosed().subscribe((confirm: boolean) => {
            if (confirm && val.id) {
                this.jsonApiService.deleteRecord(this.modelType, val.id).subscribe(() => {
                    this.dataSource.refresh();
                    this.toastrService.success(`${this.modelType.name} deleted successfully`);
                });
            }
        });
        this.sub.add(afterCloseSub);
    }
}
