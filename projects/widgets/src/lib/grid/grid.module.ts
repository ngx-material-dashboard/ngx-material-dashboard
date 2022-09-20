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
import { PagedGridWithToolbarComponent } from './pages/paged-grid-with-toolbar/paged-grid-with-toolbar.component';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
    declarations: [
        GridComponent,
        PagedGridComponent,
        PagedGridWithToolbarComponent
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
export class GridModule { }
