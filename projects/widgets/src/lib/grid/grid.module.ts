import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { PaginatorModule } from '../paginator/paginator.module';
import { GridComponent } from './components/grid/grid.component';
import { PagedGridComponent } from './pages/paged-grid/paged-grid.component';

@NgModule({
    declarations: [
        GridComponent,
        PagedGridComponent
    ],
    imports: [
        CommonModule,
        MatGridListModule,
        PaginatorModule
    ]
})
export class GridModule { }
