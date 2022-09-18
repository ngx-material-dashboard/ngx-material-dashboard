import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JsonDatastore, JsonModel, ModelType } from '@ngx-material-dashboard/base-json';
import { ToastrService, ComponentType } from 'ngx-toastr';
import { Subscription, filter } from 'rxjs';
import { RemoteDataSource } from '../../../services/remote-data-source.service';
import { Button } from '../../../shared/interfaces/button.interface';
import { DEFAULT_COLLECTION_BUTTONS } from '../../../shared/buttons';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import { DEFAULT_TOOLBAR_BUTTONS } from '../../../toolbar/shared/toolbar-buttons';

@Component({
  template: ''
})
export class AbstractPagedCollectionWithToolbarComponent<T extends JsonModel> implements OnInit {

    form!: FormGroup;
    dataSource: RemoteDataSource<T>;
    displayedColumns!: string[];
    jsonApiService: JsonDatastore;
    sub: Subscription;
    collectionButtons: Button[] = [];
    toolbarButtons: ToolbarButton[] = [];

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

        // initialize collection and toolbar buttons with default ones if none
        // defined already
        if (this.collectionButtons.length === 0) {
            this.collectionButtons = DEFAULT_COLLECTION_BUTTONS;
        }
        if (this.toolbarButtons.length === 0) {
            this.toolbarButtons = DEFAULT_TOOLBAR_BUTTONS;
        }
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
