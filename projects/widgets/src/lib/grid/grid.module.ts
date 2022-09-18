import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { GridComponent } from './components/grid/grid.component';
import { PagedGridComponent } from './pages/paged-grid/paged-grid.component';
import { CollectionModule } from '../collection/collection.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [
        GridComponent,
        PagedGridComponent
    ],
    imports: [
        CommonModule,
        MatGridListModule,
        MatPaginatorModule,
        CollectionModule
    ]
})
export class GridModule { }
