import { AbstractControl, FormGroup } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { JsonApiModel } from "@ngx-material-dashboard/json-api";
import { JsonApiDatastore } from "@ngx-material-dashboard/json-api";
import { filter, Subscription } from "rxjs";
import { FilterDropDownComponent } from "../components/filter-drop-down/filter-drop-down.component";
import { PagedTableComponent } from "../pages/paged-table/paged-table.component";
import { RemoteDataSource } from "../shared/services/remote-data-source.service";
import { ButtonClick } from "./button-click.interface";
import { TableButton } from "./table-button.interface";
import { TableToolbarButton } from "./table-toolbar-button.interface";

export interface PagedTableWithToolbar<T extends JsonApiModel> {

    /** The form for the search filter in toolbar. */
    form: FormGroup;
    /** The source for table data. */
    dataSource: RemoteDataSource<T>;
    /** The list of columns to display in table. */
    displayedColumns: string[];
    /** Service for interacting with server API. */
    jsonApiService: JsonApiDatastore;
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
