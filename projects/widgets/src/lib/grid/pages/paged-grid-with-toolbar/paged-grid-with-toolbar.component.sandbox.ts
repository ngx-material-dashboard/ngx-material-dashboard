import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { DEFAULT_TOOLBAR_BUTTONS } from '@ngx-material-dashboard/widgets';
import { sandboxOf } from 'angular-playground';
import { CollectionModule } from '../../../collection/collection.module';
import { DEFAULT_COLLECTION_BUTTONS } from '../../../shared/buttons';
import { FilterDropDownComponent } from '../../../table/components/filter-drop-down/filter-drop-down.component';
import { ButtonsComponent } from '../../../toolbar/components/buttons/buttons.component';
import { ButtonToolbarComponent } from '../../../toolbar/pages/button-toolbar/button-toolbar.component';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { GridComponent } from '../../components/grid/grid.component';
import { PagedGridComponent } from '../paged-grid/paged-grid.component';
import { PagedGridWithToolbarComponent } from './paged-grid-with-toolbar.component';

export default sandboxOf(PagedGridWithToolbarComponent, {
    declarations: [
        GridComponent,
        FilterDropDownComponent,
        PagedGridComponent
    ],
    imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatGridListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FontAwesomeModule,
        ToolbarModule,
        CollectionModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
})
.add('default', {
    template: `
    <ngx-material-dashboard-paged-grid-with-toolbar [toolbarButtons]="toolbarButtons">
        <ngx-material-dashboard-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-material-dashboard-filter-drop-down>
        <ngx-material-dashboard-paged-grid [collectionButtons]="collectionButtons" [data]="data" [fields]="fields" class="marker-paged-grid" grid>
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
        </ngx-material-dashboard-paged-grid>
    </ngx-material-dashboard-paged-grid-with-toolbar>`,
    context: {
        collectionButtons: DEFAULT_COLLECTION_BUTTONS,
        toolbarButtons: DEFAULT_TOOLBAR_BUTTONS,
        data: TEST_DATA,
        fields: ['id']
    }
});
