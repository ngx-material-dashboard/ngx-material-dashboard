import { AbstractControl, FormGroup } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { JsonDatastore, JsonModel } from "@ngx-material-dashboard/base-json";
import { filter, Subscription } from "rxjs";
import { RemoteDataSource } from "../../services/remote-data-source.service";
import { TableButton } from "./table-button.interface";
import { TableToolbarButton } from "./table-toolbar-button.interface";

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
     */
    openConfirmDeleteDialog: (val: T) => void;
}
