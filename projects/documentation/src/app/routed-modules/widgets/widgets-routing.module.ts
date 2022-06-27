import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabbedDocumentTabComponent } from '../../widgets/tabbed-document/tabbed-document-tab/tabbed-document-tab.component';
import { TabbedDocumentComponent } from '../../widgets/tabbed-document/tabbed-document/tabbed-document.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TabbedDocumentTabComponent
    },
    {
        path: 'abstract-paged-table-with-toolbar',
        component: TabbedDocumentComponent,
        children: [
            {
                path: 'overview',
                component: TabbedDocumentTabComponent
            },
            {
                path: 'api',
                component: TabbedDocumentTabComponent
            },
            {
                path: '',
                redirectTo: 'overview'
            }
        ]
    },
    {
        path: 'paged-table',
        component: TabbedDocumentComponent,
        children: [
            {
                path: 'overview',
                component: TabbedDocumentTabComponent
            },
            {
                path: 'api',
                component: TabbedDocumentTabComponent
            },
            {
                path: '',
                redirectTo: 'overview'
            }
        ]
    },
    {
        path: 'paged-table-with-toolbar',
        component: TabbedDocumentComponent,
        children: [
            {
                path: 'overview',
                component: TabbedDocumentTabComponent
            },
            {
                path: 'api',
                component: TabbedDocumentTabComponent
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
