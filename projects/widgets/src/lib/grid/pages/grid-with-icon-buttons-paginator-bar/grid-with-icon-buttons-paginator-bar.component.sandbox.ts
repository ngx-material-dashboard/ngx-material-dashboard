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
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore } from '@ngx-material-dashboard/base-json/test/services/datastore.service';
import { getTaskData } from '@ngx-material-dashboard/testing';
import { CollectionModule } from '@ngx-material-dashboard/widgets';
import { sandboxOf } from 'angular-playground';
import { EDIT_BUTTON, DELETE_BUTTON } from '../../../collection/shared/buttons';
import {
    CREATE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON
} from '../../../toolbar/shared/toolbar-buttons';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { GridComponent } from '../../components/grid/grid.component';
import { GridWithIconButtonsPaginatorBarComponent } from './grid-with-icon-buttons-paginator-bar.component';
import { IconModule } from '../../../icon/icon.module';

const pageSize = 5;

export default sandboxOf(GridWithIconButtonsPaginatorBarComponent, {
    declarations: [GridComponent],
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
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
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
}).add('multi-select', {
    template: `
    <ngx-mat-grid-with-icon-buttons-paginator-bar
        [toolbarButtons]="toolbarButtons"
        class="marker-paged-list">
        <ngx-mat-grid 
            [collectionButtons]="collectionButtons"
            [dataSource]="data"
            [fields]="fields"
            [multiple]="multiple"
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
        </ngx-mat-grid>
    </ngx-mat-grid-with-icon-buttons-paginator-bar>`,
    context: {
        collectionButtons: [EDIT_BUTTON, DELETE_BUTTON],
        toolbarButtons: [
            CREATE_TOOLBAR_BUTTON,
            EDIT_TOOLBAR_BUTTON,
            DELETE_TOOLBAR_BUTTON
        ],
        data: getTaskData(20),
        fields: ['id'],
        multiple: true
    }
});
