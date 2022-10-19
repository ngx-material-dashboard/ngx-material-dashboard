import { Component, ContentChild, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JsonDatastore, JsonModel, ModelType } from '@ngx-material-dashboard/base-json';
import { ToastrService, ComponentType } from 'ngx-toastr';
import { Subscription, filter } from 'rxjs';
import { RemoteDataSource } from '../../../shared/services/remote-data-source.service';
import { Button } from '../../../shared/interfaces/button.interface';
import { DEFAULT_COLLECTION_BUTTONS } from '../../../shared/buttons';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import { DEFAULT_TOOLBAR_BUTTONS } from '../../../toolbar/shared/toolbar-buttons';
import { SelectionService } from '../../../shared/services/selection.service';
import { AbstractPagedCollectionComponent } from '../abstract-paged-collection/abstract-paged-collection.component';

/**
 * The `AbstractPagedCollectionWithToolbar` is an "abstract" base component
 * for all components that utilize the `PagedCollectionWithToolbar`. This
 * component provides some shared methods that are useful for these types of
 * components.
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
 *          [collectionButtons]="collectionButtons" list>
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
 *     </ngx-material-dashboard-paged-list>
 * </ngx-material-dashboard-paged-list-with-toolbar>
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
 *     selector: 'abstract-paged-list-with-toolbar-usage-example',
 *     templateUrl: './abstract-paged-list-with-toolbar-usage-example.html'
 * })
 * export class AbstractPagedListWithToolbarUsageExample
 *     extends AbstractPagedCollectionWithToolbarComponent<Model> {
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
 * deleting objects rendered in the table. You may utilize these built in
 * handlers, or you can provide your own custom solution.
 * 
 * ### Built In CRUD Capabilities
 * 
 * The build in CRUD capabilities rely on using dialogs to create and delete
 * objects in your collections. All you have to do is include implementations
 * for the `openCreateDialog` and `openConfirmDeleteDialog` methods. These
 * methods should call their respective `Util` functions defined in this class.
 * 
 * ### Custom CRUD Capabilities
 * 
 * If you want to manage your own CRUD capabilities (i.e. you use routed
 * components to create/edit objects), then you will need to override the
 * `onButtonClick` method and include the logic you need to handle your
 * own CRUD capabilities there.
 */
@Component({
  template: ''
})
export class AbstractPagedCollectionWithToolbarComponent<T extends JsonModel>
    implements OnInit {

    @ViewChild('pagedCollection') collection!: AbstractPagedCollectionComponent<T>;
    /** The parent form for the filter rendered in the toolbar drop down. */
    form!: FormGroup;
    /** The data source for the data to render in the collection. */
    dataSource: RemoteDataSource<T>;
    /**
     * These are the buttons in the toolbar that can be disabled. Just a filtered
     * subset of toolbarButtons that have canDisable=true.
     */
    disableableToolbarButtons: ToolbarButton[] = [];
    //displayedColumns!: string[];
    /** The service used for CRUD operations for data in collection. */
    jsonApiService: JsonDatastore;
    /** The main subscription for managing all subscriptions in component. */
    sub: Subscription;
    /** The buttons to render with each item in the collection. */
    collectionButtons: Button[] = [];
    /** The buttons to render in the toolbar above the collection. */
    toolbarButtons: ToolbarButton[] = [];

    constructor(
        @Inject(JsonModel) private modelType: ModelType<T>,
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        jsonApiService: JsonDatastore,
        private selectionService: SelectionService<T>,
        private toastrService: ToastrService
    ) {
        this.jsonApiService = jsonApiService;
        this.dataSource = new RemoteDataSource<T>(this.modelType, this.jsonApiService);
        this.sub = new Subscription();
    }

    /**
     * Lifecycle method automatically called by angular when the component is
     * destroyed. Used to unsubscribe from all subscriptions created in
     * component.
     */
    ngOnDestroy(): void {
        // unsubscribe from all subscriptions in component
        this.sub.unsubscribe();
    }

    /**
     * Lifecycle method automatically called by angular when the component is
     * initialized.
     */
    ngOnInit(): void {
        // load initial data; you have to do something in extending component
        // everything can't be automatic... plus I don't want to make any
        // assumptions as to what column to default to for sorting or any 
        // includes that may be required in table
        // this.dataSource.load({}, 'name', 'asc', 0, 25, 'mealType');
        
        // initialize form used for search filter
        this.form = this.formBuilder.group({});

        // initialize collection and toolbar buttons with default ones if none
        // defined already
        if (this.collectionButtons.length === 0) {
            this.collectionButtons = DEFAULT_COLLECTION_BUTTONS;
        }
        if (this.toolbarButtons.length === 0) {
            this.toolbarButtons = DEFAULT_TOOLBAR_BUTTONS;
        }

        // get buttons that can be disabled from given list of buttons
        this.disableableToolbarButtons = this.toolbarButtons.filter((button: ToolbarButton) => button.canDisable);
        this.sub = new Subscription();
        const sub = this.selectionService.selectionChange.subscribe((disabled: boolean) => {
            this.selectionService.toggleButtons(disabled, this.disableableToolbarButtons);
        });
        this.sub.add(sub);
    }

    /**
     * Handler for when user clicks a button in collection or in the toolbar.
     *
     * @param buttonClick The event containing details of the button clicked.
     */
    onButtonClick(buttonClick: ButtonClick): void {
        if (buttonClick.click === 'create') {
            this.openCreateDialog();
        } else if (buttonClick.click === 'delete' && buttonClick.row) {
            this.openConfirmDeleteDialog(buttonClick.row as T);
        }
    }

    onToolbarButtonClick(buttonClick: ButtonClick): void {
        this.onButtonClick(buttonClick);
    }

    /**
     * Handler for when the user clicks the button to add a new item to the
     * collection. This must implemented by any component extending this one,
     * and should just call the openCreateDialogUtil method passing in the
     * component used to create an element in the collection.
     */
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
            val.save().subscribe((res: T) => {
                if (this.collection.dataSource$ instanceof RemoteDataSource) {
                    this.collection.dataSource$.refresh();
                } else {
                    this.collection.dataSource$.data.push(res);
                }
                this.toastrService.success(`${this.modelType.name} created successfully`);
            });
        });
        this.sub.add(afterCloseSub);
    }

    /**
     * Handler for when the user clicks the delete button related to an element
     * in the collection or the toolbar above the collection. This must be
     * implemented by any component extending this one and should just call the
     * openConfirmDeleteDialogUtil with the confirmation dialog for deleting
     * elements in the collection along with any configuration needed for the
     * dialog.
     *
     * @param val The element in the collection to be deleted.
     */
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
                    if (this.collection.dataSource$ instanceof RemoteDataSource) {
                        this.collection.dataSource$.refresh();
                    } else {
                        this.collection.dataSource$.data = this.collection.dataSource$.data.filter(it => {
                            return it !== val;
                        });
                    }
                    this.toastrService.success(`${this.modelType.name} deleted successfully`);
                });
            }
        });
        this.sub.add(afterCloseSub);
    }

}
