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
        path: 'base-json',
        component: TabbedDocumentTabComponent
    },
    {
        path: 'json',
        component: TabbedDocumentTabComponent
    },
    {
        path: 'json-api',
        component: TabbedDocumentTabComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JSONRoutingModule { }
