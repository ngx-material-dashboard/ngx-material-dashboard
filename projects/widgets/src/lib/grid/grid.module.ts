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
import { MatGridListModule } from '@angular/material/grid-list';

import { GridComponent } from './components/grid/grid.component';
import { PagedGridComponent } from './pages/paged-grid/paged-grid.component';
import { CollectionModule } from '../collection/collection.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { PagedGridWithRaisedButtonsBarComponent } from './pages/paged-grid-with-raised-buttons-bar/paged-grid-with-raised-buttons-bar.component';
import { GridWithIconButtonsPaginatorBarComponent } from './pages/grid-with-icon-buttons-paginator-bar/grid-with-icon-buttons-paginator-bar.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
    declarations: [
        GridComponent,
        PagedGridComponent,
        PagedGridWithRaisedButtonsBarComponent,
        GridWithIconButtonsPaginatorBarComponent
    ],
    exports: [
        GridComponent,
        PagedGridComponent,
        PagedGridWithRaisedButtonsBarComponent,
        GridWithIconButtonsPaginatorBarComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCheckboxModule,
        MatGridListModule,
        MatPaginatorModule,
        CollectionModule,
        IconModule,
        ToolbarModule
    ]
})
export class GridModule {}
