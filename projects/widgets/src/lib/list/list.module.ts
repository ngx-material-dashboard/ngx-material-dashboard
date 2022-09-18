import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CollectionModule } from '../collection/collection.module';
import { ListComponent } from './components/list/list.component';
import { PagedListComponent } from './pages/paged-list/paged-list.component';
import { PagedListWithToolbarComponent } from './pages/paged-list-with-toolbar/paged-list-with-toolbar.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [
        PagedListComponent,
        ListComponent,
        PagedListWithToolbarComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatPaginatorModule,
        CollectionModule,
        ToolbarModule
    ]
})
export class ListModule { }
