import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { sandboxOf } from 'angular-playground';
import { CollectionModule } from '../../../collection/collection.module';
import { ListComponent } from '../../components/list/list.component';
import { PagedListComponent } from './paged-list.component';

export default sandboxOf(PagedListComponent, {
    declarations: [ListComponent],
    imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatGridListModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        CollectionModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
})
.add('default', {
    template: `
    <ngx-material-dashboard-paged-list [data]="data" [fields]="fields" class="marker-paged-list">
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
    </ngx-material-dashboard-paged-list>`,
    context: {
        data: TEST_DATA,
        fields: ['id']
    }
});
