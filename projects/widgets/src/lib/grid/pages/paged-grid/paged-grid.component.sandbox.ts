import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, DummyObject } from '@ngx-material-dashboard/testing';
import { sandboxOf } from 'angular-playground';
import { GridComponent } from '../../components/grid/grid.component';
import { PagedGridComponent } from './paged-grid.component';

const testData: DummyObject[] = [];
for (let i = 0; i < 10; i++) {
    testData.push({ id: (i + 1).toString() } as DummyObject);
}

export default sandboxOf(PagedGridComponent, {
    declarations: [GridComponent],
    imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatGridListModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        FlexLayoutModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
})
.add('default', {
    template: `
    <ngx-material-dashboard-paged-grid [data]="data" class="marker-paged-grid">
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
        data: testData
    }
});
