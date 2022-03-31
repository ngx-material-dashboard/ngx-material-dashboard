import { ComponentType } from '@angular/cdk/overlay';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { filter, Subscription } from 'rxjs';

import { ModelType } from '@ngx-material-dashboard/json-api';
import { JsonApiModel } from '@ngx-material-dashboard/json-api';
import { JsonApiDatastore } from '@ngx-material-dashboard/json-api';
import { ButtonClick } from '../../interfaces/button-click.interface';
import { TableButton } from '../../interfaces/table-button.interface';
import { TableToolbarButton } from '../../interfaces/table-toolbar-button.interface';
import { RemoteDataSource } from '../../shared/services/remote-data-source.service';
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

@Component({
    template: ''
})
export class AbstractPagedTableWithToolbarComponent<T extends JsonApiModel> 
    implements PagedTableWithToolbar<T> {

    form!: FormGroup;
    dataSource: RemoteDataSource<T>;
    displayedColumns!: string[];
    jsonApiService: JsonApiDatastore;
    sub: Subscription;
    tableButtons: TableButton[] = [];
    toolbarButtons: TableToolbarButton[] = [];

    constructor(
        @Inject(JsonApiModel) private modelType: ModelType<T>,
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        jsonApiService: JsonApiDatastore,
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
