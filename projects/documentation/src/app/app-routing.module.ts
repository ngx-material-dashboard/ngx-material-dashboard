import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './widgets/layout/layout/layout.component';
import { TabbedDocumentTabComponent } from './widgets/tabbed-document/tabbed-document-tab/tabbed-document-tab.component';
import { TabbedDocumentComponent } from './widgets/tabbed-document/tabbed-document/tabbed-document.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
            import('./routed-modules/home/home.module').then(
                (m) => m.HomeModule
            )
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'base-json',
                children: [
                    {
                        path: 'converters',
                        children: [
                            {
                                path: 'date-converter',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'json-model-converter',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'decorators',
                        children: [
                            {
                                path: 'attribute',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'json-api-datastore-config',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'json-api-model-config',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'json-attribute',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'nested-attribute',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'interfaces',
                        children: [
                            {
                                path: 'attribute-decorator-options',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'datastore-config',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'json-api-error',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'json-model-converter-config',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'model-config',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'overrides',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'property-converter',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'model-type',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'models',
                        children: [
                            {
                                path: 'error-response',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'json-api-meta-model',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'json-api-nested-model',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'json-model',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'meta-model-type',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'services',
                        children: [
                            {
                                path: 'json-datastore',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'json-api-query-data',
                        component: TabbedDocumentComponent,
                        children: [
                            {
                                path: 'api',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'overview',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'overview'
                            }
                        ]
                    },
                    { path: '', component: TabbedDocumentTabComponent }
                ]
            },
            {
                path: 'json',
                children: [
                    {
                        path: 'models',
                        children: [
                            {
                                path: 'json-model',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'services',
                        children: [
                            {
                                path: 'json-datastore',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    { path: '', component: TabbedDocumentTabComponent }
                ]
            },
            {
                path: 'json-api',
                children: [
                    {
                        path: 'decorators',
                        children: [
                            {
                                path: 'belongs-to',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'has-many',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'models',
                        children: [
                            {
                                path: 'json-api-model',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'services',
                        children: [
                            {
                                path: 'json-api-datastore',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    { path: '', component: TabbedDocumentTabComponent }
                ]
            },
            {
                path: 'widgets',
                children: [
                    {
                        path: 'components',
                        children: [
                            {
                                path: 'button-toolbar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'collection',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'confirm-delete',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'default-layout',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'field-error',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'filter-drop-down',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'grid',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'grid-with-icon-buttons-paginator-bar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'icon-buttons-with-paginator',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'list',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'list-with-icon-buttons-paginator-bar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'loading',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'loading',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-collection',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-collection-with-icon-toolbar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-collection-with-raised-button-toolbar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-collection-with-toolbar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-grid',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-grid-with-raised-buttons-bar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-list',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-list-with-raised-buttons-bar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-table',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-table-with-raised-buttons-bar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'raised-button-toolbar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'sidenav',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'sorter',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'table',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'table-with-icon-buttons-paginator-bar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'enums',
                        children: [
                            {
                                path: 'button-click-action',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'screen-size',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'directives',
                        children: [
                            {
                                path: 'click-stop-propagation',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'search-filter',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'tab-stop-propagation',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'interfaces',
                        children: [
                            {
                                path: 'button',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'button-click',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'data',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'search-filter-map',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'sidenav-item-with-children',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'sidenav-item-with-route',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'sort-order',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'toolbar-button',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'validation-message',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'validation-messages',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'sidenav-item',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'sidenav-item',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'services',
                        children: [
                            {
                                path: 'filter',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'form',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'loading',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'loading',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'remote-data-source',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'selection',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    { path: '', component: TabbedDocumentTabComponent }
                ]
            },
            {
                path: 'testing',
                children: [
                    {
                        path: 'elements',
                        children: [
                            {
                                path: 'button',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'checkbox',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'collection',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'icon-buttons-with-paginator-bar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'menu',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'page',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-collection',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-collection-with-toolbar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-table',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paged-table-with-toolbar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'paginator',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'select',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'sidenav',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'table',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'toolbar',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            },
                            {
                                path: 'toolbar-header',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'models',
                        children: [
                            {
                                path: 'task',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'pages',
                        children: [
                            {
                                path: 'default-layout-page',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'services',
                        children: [
                            {
                                path: 'datastore',
                                component: TabbedDocumentComponent,
                                children: [
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
                                        redirectTo: 'overview'
                                    }
                                ]
                            }
                        ]
                    },
                    { path: '', component: TabbedDocumentTabComponent }
                ]
            },
            { path: 'json-overview', component: TabbedDocumentTabComponent },
            { path: 'overview', component: TabbedDocumentTabComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            anchorScrolling: 'enabled',
            scrollOffset: [0, 64],
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
