import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { JsonDatastore } from "@ngx-material-dashboard/base-json";
import { Datastore } from "@ngx-material-dashboard/base-json/test/services/datastore.service";
import { TEST_DATA } from "@ngx-material-dashboard/testing";
import { CollectionModule } from "../../../collection/collection.module";
import { sandboxOf } from "angular-playground";
import { EDIT_BUTTON, DELETE_BUTTON } from "../../../collection/shared/buttons";
import { CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON } from "../../../toolbar/shared/toolbar-buttons";
import { ToolbarModule } from "../../../toolbar/toolbar.module";
import { TableComponent } from "../../components/table/table.component";
import { TableWithIconButtonsPaginatorBarComponent } from "./table-with-icon-buttons-paginator-bar.component";

const pageSize = 5;

export default sandboxOf(TableWithIconButtonsPaginatorBarComponent, {
    declarations: [
        TableComponent
    ],
    imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FontAwesomeModule,
        CollectionModule,
        ToolbarModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
})
.add('table with toolbar with multi-select', {
    template: `
    <ngx-material-dashboard-table-with-icon-buttons-paginator-bar
        [toolbarButtons]="toolbarButtons"
        class="marker-paged-table"
        matSort>
        <ngx-material-dashboard-table
            [collectionButtons]="collectionButtons"
            [data]="data"
            [displayedColumns]="displayedColumns"
            [multiple]="multiple">
            <ng-container matColumnDef="id">
                <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
                <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="noData">
                <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                    No data found
                </mat-footer-cell>
            </ng-container>
        </ngx-material-dashboard-table>
    </ngx-material-dashboard-table-with-icon-buttons-paginator-bar>`,
    context: {
        collectionButtons: [EDIT_BUTTON, DELETE_BUTTON],
        toolbarButtons: [CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON],
        data: TEST_DATA,
        displayedColumns: ['select', 'id', 'actions'],
        multiple: true
    }
});
