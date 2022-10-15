import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { BasePagedCollectionWithToolbarComponent } from '../../../collection/components/base-paged-collection-with-toolbar/base-paged-collection-with-toolbar.component';
import { PagedTableComponent } from '../paged-table/paged-table.component';

/**
 * A wrapper component for the `PagedTable` that adds a toolbar above it with
 * customizable buttons and filter drop down capability. You can define any
 * buttons you want to manage your table data, as well as define whatever form
 * you want to render inside the filter drop down for filtering data with as
 * many filter fields as you want.
 * 
 * The component includes a `@Output() buttonClick` `EventEmitter` that emits
 * events when the user clicks a button in either the toolbar or on a row in
 * the table so there is no need to subscribe to the `@Output() tableButtonClick`
 * from the `PagedTable`. You can use a single subscription to handle basic CRUD 
 * operations regardless of whether the user clicks a button in the toolbar or
 * in one of the rows of the table.
 * 
 * > NOTE: In order to use toolbar buttons that require one or more rows to
 * > perform an action (i.e. edit, delete, etc.), you must include the `select`
 * > column in the list of `displayedColumns` passed into the `PagedTable`
 *
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-paged-table-with-toolbar
 *      [form]="filterForm"
 *      [toolbarButtons]="toolbarButtons"
 *      (buttonClick)="onButtonClick($event)">
 *     <ngx-material-dashboard-filter-drop-down filter>
 *         <form [formGroup]="form" fxLayout="column">
 *             <mat-form-field fxFlex="noshrink">
 *                 <input matInput type="text" formControlName="name">
 *             </mat-form-field>
 *         </form>
 *     </ngx-material-dashboard-filter-drop-down>
 *     <ngx-material-dashboard-paged-table matSort 
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
 *         <ng-container matColumnDef="noData">
 *             <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
 *                 No data to display
 *             </mat-footer-cell>
 *         </ng-container>
 *     </ngx-material-dashboard-paged-table>
 * </ngx-material-dashboard-paged-table-with-toolbar>
 * ```
 * ```typescript
 * import {Component, Input, OnInit} from '@angular/core';
 * import {FormGroup, FormBuilder, Validators} from '@angular/forms';
 * import {MatDialog} from '@angular/material/dialog';
 * import {JsonApiQueryData} from '@ngx-material-dashboard/base-json';
 * import {ButtonClick, PagedTableWithToolbar, Button, ToolbarButton, EDIT_BUTTON, DELETE_BUTTON, CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON} from '@ngx-material-dashboard/widgets';
 * import {JsonModel} from '@shared/models/json.model'; // assuming this exists
 * 
 * @Component({
 *     selector: 'paged-table-with-toolbar-basic-usage-example',
 *     templateUrl: './paged-table-with-toolbar-basic-usage-example.html'
 * })
 * export class PagedTableWithToolbarBasicUsageExample implements OnInit {
 *     data: Model[] = [...];
 *     displayedColumns: string[] = ['select', 'id', 'name', 'actions'];
 *     form!: FormGroup;
 *     filterForm!: FormGroup;
 *     collectionButtons: Button[] = [EDIT_BUTTON, DELETE_BUTTON];
 *     toolbarButtons: ToolbarButton = [
 *         CREATE_TOOLBAR_BUTTON,
 *         EDIT_TOOLBAR_BUTTON,
 *         DELETE_TOOLBAR_BUTTON
 *     ];
 * 
 *     ngOnInit(): void {
 *         this.form = this.formBuilder.group({
 *             name: [null, [Validators.required]]
 *         });
 * 
 *         // to use built in search filter capability you must add form
 *         // filter included in ngx-material-dashboard-filter-drop-down
 *         // as control of 'searchFilter'
 *         this.filterForm = this.formBuilder.group({});
 *         this.filterForm.addControl('searchFilter', form);
 *     }
 * 
 *     onButtonClick(buttonClick: ButtonClick): void {
 *         if (buttonClick.click === 'create') { 
 *             // handle create; either open a dialog or navigate to a create page
 *         } else if (buttonClick.click === 'edit') {
 *             // use buttonClick.row to get row value to edit
 *         } else if (buttonClick.click === 'delete') {
 *             // use buttonClick.row to get row value to delete
 *         }
 *     }
 * }
 * ```
 * 
 * @overviewDetails
 * The above example is pretty basic, however I have not included any code
 * needed to manage creating, updating, or deleting anything. While there may
 * be differences in how you create, update, or delete objects you are trying
 * to manage, there are some very basic things that need to occur when you
 * perform any of those actions. For example, the usual workflow to delete
 * something involves some sort of confirmation followed by a HTTP request
 * to perform the delete if the user affirms the action. Those basic things can
 * get quite repatitive, which is why I created an "abstract" component that
 * provides the code for those basic repetitive actions.
 * 
 * I didn't want to include that functionality directly here because I didn't
 * want to be too presumptuous with handling CRUD operations and figured it
 * was best to keep that separate in case the way I have the functionality
 * doesn't work for your use case. Although I suppose I could provide the
 * implementation here and just have you override it...
 * 
 * See [AbstractPagedCollectionWithToolbar](/widgets/components/abstract-paged-table-with-toolbar)
 * for more details on how to use that.
 * 
 * > NOTE: I say "abstract" above because this isn't actually an abstract class since
 * > it does not include the abstract keyword on the class itself (only a
 * > reference to it in the name of the component). I think I tried to create
 * > an actual abstract component, but ran into issues when I did that so I
 * > ended up just naming it abstract.
 * 
 * ## Features
 * 
 * The `PagedTableWithToolbar` provides some additional features built around
 * the `PagedTable`, mainly a toolbar to add management buttons and a search
 * filter. While the `PagedTable` includes an action column with buttons to
 * manage your existing data, it does not include a place to put buttons for
 * doing things like creating new values or even an export button (in case your
 * users need to be able to export your data tables to excel). It also does not
 * provide a way to filter your data. That is where the `PagedTableWithToolbar`
 * comes in. See the sections below for specifics on each feature.
 * 
 * ### Toolbar Buttons
 * 
 * You can add one or more `ToolbarButton`s to the toolbar. These buttons
 * can provide additional functions beyond the `TableButton`s you define for
 * the `PagedTable`. Two examples of `ToolbarButton`s that come to mind
 * are a create button and an export button. It doesn't make sense to include
 * these buttons in every row of your table, which is one of the reasons I
 * created the `TableToolbar` to sit above the `PagedTable`. I'm sure there are
 * other buttons besides create and export that will be useful in the toolbar,
 * but I just can't think of any right now.
 * 
 * #### Pre-Built Buttons
 * 
 * I have created some pre-built `ToolbarButton`s to use. They are the
 * `CREATE_TOOLBAR_BUTTON`, `EDIT_TOOLBAR_BUTTON`, and `DELETE_TOOLBAR_BUTTON`.
 * The type of action to be performed by those buttons is pretty self
 * explanatory. The biggest thing to note is that the edit and delete buttons
 * are defined to be disabled by default and are only enabled when the user
 * selects a row in the table. This functionality is built in to the component
 * so there is nothing you need to do in your code to enable/disable these
 * buttons.
 * 
 * #### Custom Buttons
 * 
 * You can create any custom toolbar button you want to add to the toolbar above
 * the `PagedTable`. In order to do that it must be a `ToolbarButton` type.
 * See the [ToolbarButton](/widgets/interfaces/table-toolbar-button) for
 * more details.
 *
 * ### Search Filter
 * 
 * The search filter you add to the table toolbar is capable of filtering data
 * with one or more filtering criteria (typically columns defined in table).
 * Any field added to the filter form is automatically added to a map of field
 * names to search filter values entered by user on the form. So taking the
 * form from the [basic usage example](#basic-usage-example) from above, the
 * map would be something like the following:
 * 
 * ```json
 * {
 *     name: <value entered by user on form>
 * }
 * ```
 * 
 * This assumes that your server side code is capable of filtering data using
 * a map of key/value pairs. It also means that the form control names should
 * match up with values you can use to filter your data (typically column
 * names you have defined for your table data).
 */
@Component({
    selector: 'ngx-material-dashboard-paged-table-with-toolbar',
    templateUrl: './paged-table-with-toolbar.component.html',
    styleUrls: ['./paged-table-with-toolbar.component.scss']
})
export class PagedTableWithToolbarComponent<T extends JsonModel>
    extends BasePagedCollectionWithToolbarComponent<T>
    implements AfterContentInit {

    /** Reference to the sort directive defined in the component. */
    @ContentChild(MatSort) sort!: MatSort;
    /** Override the collection component so MatSort can be set. */
    override collectionCmp!: PagedTableComponent<T>;

    /**
     * Set the sort property on the PagedTable similar to how it is set on the
     * dataSource for a MatTable. This needs to be done in AfterContentInit
     * hook since component should include ngx-material-dashboard-paged-table
     * selector which should be inside the selector for this component.
     */
    override ngAfterContentInit(): void {
        super.ngAfterContentInit();
        this.collectionCmp.sort$ = this.sort;
    }
}
