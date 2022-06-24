import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabbedDocumentComponent } from '../../widgets/tabbed-document/tabbed-document/tabbed-document.component';
import { PagedTableApiComponent } from './pages/paged-table/paged-table-api/paged-table-api.component';
import { PagedTableOverviewComponent } from './pages/paged-table/paged-table-overview/paged-table-overview.component';
import { WidgetsComponent } from './pages/widgets/widgets.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: WidgetsComponent
    },
    {
        path: 'paged-table',
        component: TabbedDocumentComponent,
        children: [
            {
                path: 'overview',
                component: PagedTableOverviewComponent
            },
            {
                path: 'api',
                component: PagedTableApiComponent
            },
            {
                path: '',
                redirectTo: 'overview'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WidgetsRoutingModule { }
