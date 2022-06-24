import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './pages/widgets/widgets.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { LayoutModule } from '@ngx-material-dashboard/widgets';
import { MarkdownModule } from 'ngx-markdown';
import { ScrollspyNavLayoutModule } from '../../widgets/scrollspy-nav-layout/scrollspy-nav-layout.module';
import { TabbedDocumentModule } from '../../widgets/tabbed-document/tabbed-document.module';
import { PagedTableOverviewComponent } from './pages/paged-table/paged-table-overview/paged-table-overview.component';
import { PagedTableApiComponent } from './pages/paged-table/paged-table-api/paged-table-api.component';

@NgModule({
    declarations: [
        WidgetsComponent,
        PagedTableOverviewComponent,
        PagedTableApiComponent
    ],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatTabsModule,
        LayoutModule,
        MarkdownModule.forChild(),
        ScrollspyNavLayoutModule,
        TabbedDocumentModule,
        WidgetsRoutingModule
    ]
})
export class WidgetsModule { }
