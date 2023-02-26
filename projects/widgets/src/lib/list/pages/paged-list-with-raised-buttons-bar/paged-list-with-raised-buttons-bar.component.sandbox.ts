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
import { Datastore, getTaskData } from '@ngx-material-dashboard/testing';
import { sandboxOf } from 'angular-playground';
import { CollectionModule } from '../../../collection/collection.module';
import { DEFAULT_COLLECTION_BUTTONS } from '../../../collection/shared/buttons';
import {
    CREATE_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON
} from '../../../toolbar/shared/toolbar-buttons';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { ListComponent } from '../../components/list/list.component';
import { PagedListComponent } from '../paged-list/paged-list.component';
import { PagedListWithRaisedButtonsBarComponent } from './paged-list-with-raised-buttons-bar.component';

export default sandboxOf(PagedListWithRaisedButtonsBarComponent, {
    declarations: [ListComponent, PagedListComponent],
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
        CollectionModule,
        ToolbarModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
}).add('default', {
    template: `
    <ngx-mat-paged-list-with-raised-buttons-bar
        [toolbarButtons]="toolbarButtons">
        <ngx-mat-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-mat-filter-drop-down>
        <ngx-mat-paged-list
            [collectionButtons]="collectionButtons"
            [dataSource]="data"
            [fields]="fields"
            class="marker-paged-list"
            collection
            #collection>
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
        </ngx-mat-paged-list>
    </ngx-mat-paged-list-with-raised-buttons-bar>`,
    context: {
        collectionButtons: DEFAULT_COLLECTION_BUTTONS,
        toolbarButtons: [
            CREATE_TOOLBAR_BUTTON,
            EDIT_TOOLBAR_BUTTON,
            DELETE_TOOLBAR_BUTTON
        ],
        data: getTaskData(20),
        fields: ['id']
    }
});
