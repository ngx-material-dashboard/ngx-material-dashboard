import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, getTaskData } from '@ngx-material-dashboard/testing';
import { sandboxOf } from 'angular-playground';
import { ListComponent } from './list.component';
import { CollectionModule } from '../../../collection/collection.module';
import { IconModule } from '../../../icon/icon.module';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { DEFAULT_COLLECTION_BUTTONS } from '../../../collection/shared/buttons';

export default sandboxOf(ListComponent, {
    imports: [
        HttpClientTestingModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatGridListModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        CollectionModule,
        IconModule,
        ToolbarModule
    ],
    providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
    ]
})
    .add('default', {
        template: `
    <ngx-mat-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [fields]="fields"
        class="marker-list">
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
    </ngx-mat-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: ['id']
        }
    })
    .add('map of fields', {
        template: `
    <ngx-mat-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [fields]="fields"
        class="marker-list">
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
    </ngx-mat-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: [{ field: 'id', text: 'ID' }]
        }
    })
    .add('custom padding around items', {
        template: `
    <div style="padding: 0 16px">
        <ngx-mat-list
            [collectionButtons]="collectionButtons"
            [dataSource]="data"
            [fields]="fields"
            class="marker-list">
            <ng-template #model let-model="model">
                <div style="padding: 0 16px">
                    <mat-card>
                        <mat-card-title>
                            {{model.id}} Title
                        </mat-card-title>
                        <mat-card-content>
                            Content for dummy object {{model.id}}
                        </mat-card-content>
                    </mat-card>
                </div>
            </ng-template>
        </ngx-mat-list>
    </div>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: ['id']
        }
    });
