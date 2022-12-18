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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { PagedGridWithRaisedButtonsBarComponent } from './pages/paged-grid-with-raised-buttons-bar/paged-grid-with-raised-buttons-bar.component';
import { GridWithIconButtonsPaginatorBarComponent } from './pages/grid-with-icon-buttons-paginator-bar/grid-with-icon-buttons-paginator-bar.component';

@NgModule({
    declarations: [
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
        FontAwesomeModule,
        CollectionModule,
        ToolbarModule
    ]
})
export class GridModule {}
