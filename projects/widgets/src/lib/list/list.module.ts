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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { CompactPagedListComponent } from './pages/compact-paged-list/compact-paged-list.component';
import { ListWithIconButtonsPaginatorBarComponent } from './pages/list-with-icon-buttons-paginator-bar/list-with-icon-buttons-paginator-bar.component';

@NgModule({
    declarations: [
        PagedListComponent,
        ListComponent,
        PagedListWithToolbarComponent,
        CompactPagedListComponent,
        ListWithIconButtonsPaginatorBarComponent
    ],
    exports: [
        PagedListComponent,
        PagedListWithToolbarComponent,
        CompactPagedListComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FontAwesomeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatPaginatorModule,
        CollectionModule,
        ToolbarModule
    ]
})
export class ListModule { }
