/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

import { ToolbarModule } from '../toolbar/toolbar.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CollectionComponent } from './components/collection/collection.component';
import { PagedCollectionWithToolbarComponent } from './components/paged-collection-with-toolbar/paged-collection-with-toolbar.component';
import { PagedCollectionComponent } from './components/paged-collection/paged-collection.component';
import { PagedCollectionWithIconToolbarComponent } from './components/paged-collection-with-icon-toolbar/paged-collection-with-icon-toolbar.component';
import { PagedCollectionWithRaisedButtonToolbarComponent } from './components/paged-collection-with-raised-button-toolbar/paged-collection-with-raised-button-toolbar.component';

@NgModule({
    declarations: [
        CollectionComponent,
        PagedCollectionWithToolbarComponent,
        PagedCollectionComponent,
        PagedCollectionWithIconToolbarComponent,
        PagedCollectionWithRaisedButtonToolbarComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatPaginatorModule,
        MatSelectModule,
        MatSortModule,
        FontAwesomeModule,
        ToolbarModule
    ]
})
export class CollectionModule {}
