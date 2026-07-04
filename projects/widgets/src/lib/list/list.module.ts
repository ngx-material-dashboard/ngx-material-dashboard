/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CollectionModule } from '../collection/collection.module';
import { IconModule } from '../icon/icon.module';
import { ToolbarModule } from '../toolbar/toolbar.module';

import { ListComponent } from './components/list/list.component';
import { SkeletonListDirective } from './directives/skeleton-list.directive';
import { ListWithIconButtonsPaginatorBarComponent } from './pages/list-with-icon-buttons-paginator-bar/list-with-icon-buttons-paginator-bar.component';
import { PagedListComponent } from './pages/paged-list/paged-list.component';
import { PagedListWithRaisedButtonsBarComponent } from './pages/paged-list-with-raised-buttons-bar/paged-list-with-raised-buttons-bar.component';

@NgModule({
    declarations: [
        ListComponent,
        ListWithIconButtonsPaginatorBarComponent,
        PagedListComponent,
        PagedListWithRaisedButtonsBarComponent,
        SkeletonListDirective
    ],
    exports: [
        ListComponent,
        ListWithIconButtonsPaginatorBarComponent,
        PagedListComponent,
        PagedListWithRaisedButtonsBarComponent,
        SkeletonListDirective
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCheckboxModule,
        MatPaginatorModule,
        CollectionModule,
        IconModule,
        ToolbarModule
    ]
})
export class ListModule {}
