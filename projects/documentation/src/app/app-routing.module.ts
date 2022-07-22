import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './widgets/layout/layout/layout.component';
import { TabbedDocumentTabComponent } from './widgets/tabbed-document/tabbed-document-tab/tabbed-document-tab.component';
import { TabbedDocumentComponent } from './widgets/tabbed-document/tabbed-document/tabbed-document.component';

const routes: Routes = [{ path: '', pathMatch: 'full', loadChildren: () => import('./routed-modules/home/home.module').then(m => m.HomeModule)}, { path: '', component: LayoutComponent, children: [{ path: 'base-json', children: [{ path: 'decorators', children: [{ path: 'attribute', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'json-api-datastore-config', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'json-api-model-config', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'interfaces', children: [{ path: 'attribute-decorator-options', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'datastore-config', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'json-api-error', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'model-config', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'overrides', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'property-converter', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'model-type', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'models', children: [{ path: 'error-response', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'json-api-meta-model', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'json-model', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'meta-model-type', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'services', children: [{ path: 'json-datastore', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'date-converter', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'json-api-query-data', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'attribute-metadata', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: '', component: TabbedDocumentTabComponent }]}, { path: 'json', children: [{ path: 'models', children: [{ path: 'json-model', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'services', children: [{ path: 'json-datastore', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: '', component: TabbedDocumentTabComponent }]}, { path: 'json-api', children: [{ path: 'decorators', children: [{ path: 'belongs-to', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'has-many', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'json-attribute', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'nested-attribute', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'models', children: [{ path: 'json-api-model', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'json-api-nested-model', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'services', children: [{ path: 'json-api-datastore', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: '', component: TabbedDocumentTabComponent }]}, { path: 'widgets', children: [{ path: 'components', children: [{ path: 'abstract-paged-table-with-toolbar', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'confirm-delete-dialog', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'default-layout', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'field-error', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'filter-drop-down', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'loading', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'loading', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'paged-grid', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'paged-list', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'paged-table', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'paged-table-with-toolbar', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'sidenav', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'paged-table-with-toolbar', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'directives', children: [{ path: 'click-stop-propagation-directive', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'tab-stop-propagation-directive', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'interfaces', children: [{ path: 'paged-table-with-toolbar', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'button-click', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'dialog-data', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'paged-table-with-toolbar', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'sidenav-item', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'table-button', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'table-toolbar-button', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'validation-message', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'validation-messages', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'modules', children: [{ path: 'dialog', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'form', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'grid', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'layout', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'list', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'table', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'services', children: [{ path: 'loading', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'loading', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'remote-data-source', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'selection', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: '', component: TabbedDocumentTabComponent }]}, { path: 'testing', children: [{ path: 'elements', children: [{ path: 'button-element', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'checkbox-element', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'page-element', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'paged-table-element', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'paged-table-with-toolbar-element', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'sidenav-element', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'toolbar-element', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'toolbar-header-element', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'pages', children: [{ path: 'default-layout-page', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'services', children: [{ path: 'datastore', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}]}, { path: 'dummy-object', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 'd-u-m-m-y-_-o-b-j-e-c-t-_-d-a-t-a', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: 't-e-s-t-_-d-a-t-a', component: TabbedDocumentComponent, children: [{ path: 'api', component: TabbedDocumentTabComponent },{ path: 'overview', component: TabbedDocumentTabComponent },{ path: '', pathMatch: 'full', redirectTo: 'overview' }]}, { path: '', component: TabbedDocumentTabComponent }]}, { path: 'json-overview', component: TabbedDocumentTabComponent }, { path: 'overview', component: TabbedDocumentTabComponent }]}];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
        anchorScrolling: 'enabled',
        scrollOffset: [0, 64],
        scrollPositionRestoration: 'enabled',
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
