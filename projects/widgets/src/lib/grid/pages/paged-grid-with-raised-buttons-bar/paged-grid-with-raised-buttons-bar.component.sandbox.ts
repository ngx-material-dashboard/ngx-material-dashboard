import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, getTaskData } from '@ngx-material-dashboard/testing';
import { DEFAULT_TOOLBAR_BUTTONS } from '@ngx-material-dashboard/widgets';
import { sandboxOf } from 'angular-playground';
import { CollectionModule } from '../../../collection/collection.module';
import { DEFAULT_COLLECTION_BUTTONS } from '../../../collection/shared/buttons';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { GridComponent } from '../../components/grid/grid.component';
import { PagedGridComponent } from '../paged-grid/paged-grid.component';
import { PagedGridWithRaisedButtonsBarComponent } from './paged-grid-with-raised-buttons-bar.component';

export default sandboxOf(PagedGridWithRaisedButtonsBarComponent, {
    declarations: [GridComponent, PagedGridComponent],
    imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatGridListModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        FlexLayoutModule,
        CollectionModule,
        ToolbarModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
}).add('default', {
    template: `
    <ngx-mat-paged-grid-with-raised-buttons-bar
        [toolbarButtons]="toolbarButtons"
        class="marker-paged-grid">
        <ngx-mat-paged-grid
            [collectionButtons]="collectionButtons"
            [dataSource]="data"
            [fields]="fields"
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
        </ngx-mat-paged-grid>
    </ngx-mat-paged-grid-with-raised-buttons-bar>`,
    context: {
        collectionButtons: DEFAULT_COLLECTION_BUTTONS,
        data: getTaskData(20),
        fields: ['id'],
        toolbarButtons: DEFAULT_TOOLBAR_BUTTONS
    }
});
