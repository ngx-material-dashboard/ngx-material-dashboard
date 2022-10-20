import { ComponentType } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JsonDatastore, JsonModel, ModelType } from '@ngx-material-dashboard/base-json';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { RemoteDataSource } from '../../../shared/services/remote-data-source.service';
import { DEFAULT_COLLECTION_BUTTONS } from '../../../shared/buttons';
import { Button } from '../../../shared/interfaces/button.interface';
import { SelectionService } from '../../../shared/services/selection.service';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import { DEFAULT_TOOLBAR_BUTTONS } from '../../../toolbar/shared/toolbar-buttons';

/**
 * The `AbstractCompactPagedCollection` is an "abstract" base component for all
 * components that utilize the `CompactPagedCollection`. This component 
 * provides some shared methods that are useful for these types of components.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-compact-paged-list
 *       [collectionButtons]="collectionButtons"
 *       [data]="data"
 *       [fields]="fields"
 *       [multiple]="multiple"
 *       [toolbarButtons]="toolbarButtons"
 *       class="marker-paged-list">
 *       <ng-template #model let-model="model">
 *           <mat-card>
 *               <mat-card-title>
 *                   {{model.id}} Title
 *               </mat-card-title>
 *               <mat-card-content>
 *                   Content for dummy object {{model.id}}
 *               </mat-card-content>
 *           </mat-card>
 *       </ng-template>
 *   </ngx-material-dashboard-compact-paged-list>
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
 *
 * @Component({
 *     selector: 'abstract-compact-paged-collection-usage-example',
 *     templateUrl: './abstract-compact-paged-collection-usage-example.html'
 * })
 * export class AbstractCompactPagedCollectionUsageExample
 *     extends AbstractCompactPagedCollectionComponent<Model> {
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
 *     override onButtonClick(buttonClick: ButtonClick): void {
 *         if (buttonClick.click === 'create') {
 *             // handle creating...
 *         }
 *         // any other conditions...
 *         else {
 *             // this will use default handling for deleting items in
 *             // collection; which is just a confirmation dialog
 *             // if you don't want to use default handling then 
 *             super.onButtonClick(buttonClick);
 *         }
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
 * @overviewDetails
 * > NOTE: The abstract component implementation assumes you are using a dialog
 * > to create and delete your data. You must provide your own dialog to create
 * > your data, but the `ConfirmDeleteDialog` is included in this library so you
 * > don't have to define your own delete confirm dialog.
 * 
 * ## Features
 * 
 * The `AbstractCompactPagedCollection` provides a paged collection with a 
 * "compact" toolbar that should contain icon buttons along with some basic
 * handling for when the user clicks on buttons in the collection or toolbar.
 * It also allows for simple customization by overriding the onButtonClick
 * method so you can control what happens when a button is clicked (i.e. open
 * dialog, redirect route, etc.).
 */
@Component({
    template: ''
})
export class AbstractCompactPagedCollectionComponent<T extends JsonModel>
    implements OnInit {

    /** The parent form for the filter rendered in the toolbar drop down. */
    form!: FormGroup;
    /** The data source for the data to render in the collection. */
    dataSource: MatTableDataSource<T> | RemoteDataSource<T>;
    /**
     * These are the buttons in the toolbar that can be disabled. Just a filtered
     * subset of toolbarButtons that have canDisable=true.
     */
    disableableToolbarButtons: ToolbarButton[] = [];
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

    ngOnInit(): void {
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
        if (buttonClick.click === 'delete' && buttonClick.row) {
            this.openConfirmDeleteDialog(buttonClick.row as T);
        }
    }

    /**
     * Handler for when user clicks a button in toolbar (does not include
     * paging actions). Details about the click like what button was clicked
     * (create, delete, etc.) and any selections in toolbar.
     *
     * @param buttonClick The details included with button that was clicked.
     */
    onToolbarButtonClick(buttonClick: ButtonClick): void {
        this.onButtonClick(buttonClick);
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
                    if (this.dataSource instanceof RemoteDataSource) {
                        this.dataSource.refresh();
                    } else {
                        this.dataSource.data = this.dataSource.data.filter(it => {
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
