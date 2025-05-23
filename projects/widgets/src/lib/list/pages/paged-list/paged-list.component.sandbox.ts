/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

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
import { CollectionModule } from '../../../collection/collection.module';
import { DEFAULT_COLLECTION_BUTTONS } from '../../../collection/shared/buttons';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { ListComponent } from '../../components/list/list.component';
import { PagedListComponent } from './paged-list.component';
import { IconModule } from '../../../icon/icon.module';

export default sandboxOf(PagedListComponent, {
    declarations: [ListComponent],
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
    <ngx-mat-paged-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [fields]="fields"
        class="marker-paged-list">
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
    </ngx-mat-paged-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: ['id']
        }
    })
    .add('no data', {
        template: `
    <ngx-mat-paged-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [fields]="fields"
        class="marker-paged-list">
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
        <ng-template #noData>No data to display</ng-template>
    </ngx-mat-paged-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: [],
            fields: ['id']
        }
    })
    .add('no select all in list', {
        template: `
    <ngx-mat-paged-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [displaySelectAll]="false"
        [fields]="fields"
        class="marker-paged-list">
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
    </ngx-mat-paged-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: ['id']
        }
    })
    .add('not selectable', {
        template: `
    <ngx-mat-paged-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [fields]="fields"
        [selectable]="false"
        class="marker-paged-list">
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
    </ngx-mat-paged-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: ['id']
        }
    })
    .add('hide select all and sorter', {
        template: `
    <ngx-mat-paged-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [displaySelectAll]="false"
        [displaySorter]="false"
        [fields]="fields"
        class="marker-paged-list">
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
    </ngx-mat-paged-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: ['id']
        }
    })
    .add('initial sort default order', {
        template: `
    <ngx-mat-paged-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [fields]="fields"
        [matSortActive]="'id'"
        class="marker-paged-list">
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
    </ngx-mat-paged-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: ['id']
        }
    })
    .add('custom spaceBetween', {
        template: `
    <ngx-mat-paged-list
        [collectionButtons]="collectionButtons"
        [dataSource]="data"
        [fields]="fields"
        [spaceBetween]="spaceBetween"
        class="marker-paged-list">
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
    </ngx-mat-paged-list>`,
        context: {
            collectionButtons: DEFAULT_COLLECTION_BUTTONS,
            data: getTaskData(20),
            fields: ['id'],
            spaceBetween: '40px'
        }
    });
