import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PaginatorModule } from '../paginator/paginator.module';
import { ListComponent } from './components/list/list.component';
import { PagedListComponent } from './pages/paged-list/paged-list.component';

@NgModule({
    declarations: [
        PagedListComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        PaginatorModule
    ]
})
export class ListModule { }
