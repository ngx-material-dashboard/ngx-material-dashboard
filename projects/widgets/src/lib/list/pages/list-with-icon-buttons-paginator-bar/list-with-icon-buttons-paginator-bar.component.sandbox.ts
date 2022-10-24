import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
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
import { CollectionModule } from "@ngx-material-dashboard/widgets";
import { sandboxOf } from "angular-playground";
import { EDIT_BUTTON, DELETE_BUTTON } from "../../../shared/buttons";
import { CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON } from "../../../toolbar/shared/toolbar-buttons";
import { ToolbarModule } from "../../../toolbar/toolbar.module";
import { ListComponent } from "../../components/list/list.component";
import { ListWithIconButtonsPaginatorBarComponent } from "./list-with-icon-buttons-paginator-bar.component";

const pageSize = 5;

export default sandboxOf(ListWithIconButtonsPaginatorBarComponent, {
    declarations: [
        ListComponent
    ],
    imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
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
.add('list with icon buttons paginator bar with multi-select', {
    template: `
    <ngx-material-dashboard-list-with-icon-buttons-paginator-bar
        [fields]="fields"
        [multiple]="multiple"
        [toolbarButtons]="toolbarButtons"
        class="marker-paged-list">
        <ngx-material-dashboard-list [collectionButtons]="collectionButtons" [data]="data" #collection>
            <ng-template #model let-model="model">
                <mat-card>
                    <mat-card-title>
                        {{model.id}} Title
                    </mat-card-title>
                    <mat-card-content>
                        Content for dummy object {{model.id}}
                    </mat-card-content>
                </mat-card>
            </ng-template>
        </ngx-material-dashboard-list>
    </ngx-material-dashboard-list-with-icon-buttons-paginator-bar>`,
    context: {
        collectionButtons: [EDIT_BUTTON, DELETE_BUTTON],
        toolbarButtons: [CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON],
        data: TEST_DATA,
        fields: ['id'],
        multiple: true
    }
});
