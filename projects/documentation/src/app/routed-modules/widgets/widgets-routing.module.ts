import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagedTableComponent } from './pages/paged-table/paged-table.component';
import { WidgetsComponent } from './pages/widgets/widgets.component';

const routes: Routes = [
    {
        path: '',
        component: WidgetsComponent,
        children: [
            {
                path: 'paged-table',
                component: PagedTableComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'paged-table'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WidgetsRoutingModule { }
