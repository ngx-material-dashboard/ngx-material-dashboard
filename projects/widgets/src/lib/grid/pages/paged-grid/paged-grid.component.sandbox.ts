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
import { sandboxOf } from 'angular-playground';
import { CollectionModule } from '../../../collection/collection.module';
import { DEFAULT_COLLECTION_BUTTONS } from '../../../collection/shared/buttons';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { GridComponent } from '../../components/grid/grid.component';
import { PagedGridComponent } from './paged-grid.component';

export default sandboxOf(PagedGridComponent, {
    declarations: [GridComponent],
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
    <ngx-material-dashboard-paged-grid
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [fields]="fields"
        class="marker-paged-grid">
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
    </ngx-material-dashboard-paged-grid>`,
    context: {
        collectionButtons: DEFAULT_COLLECTION_BUTTONS,
        data: getTaskData(20),
        fields: ['id']
    }
});
