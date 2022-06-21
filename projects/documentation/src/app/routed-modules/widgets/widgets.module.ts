import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './pages/widgets/widgets.component';
import { PagedTableComponent } from './pages/paged-table/paged-table.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutModule } from '@ngx-material-dashboard/widgets';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
    declarations: [
        WidgetsComponent,
        PagedTableComponent
    ],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatTabsModule,
        LayoutModule,
        MarkdownModule.forChild(),
        WidgetsRoutingModule
    ]
})
export class WidgetsModule { }
