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
                        path: '',
                        component: TabbedDocumentComponent,
                        children: [
                            {
                                path: 'readme',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'overview',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'api',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'readme'
                            }
                        ]
                    },
                    {
                        path: '',
                        pathMatch: 'full',
                        component: TabbedDocumentTabComponent
                    }
                ]
            },
            {
                path: 'json-api',
                children: [
                    {
                        path: '',
                        component: TabbedDocumentComponent,
                        children: [
                            {
                                path: 'readme',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'overview',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'api',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'readme'
                            }
                        ]
                    },
                    {
                        path: '',
                        pathMatch: 'full',
                        component: TabbedDocumentTabComponent
                    }
                ]
            },
            {
                path: 'json',
                children: [
                    {
                        path: '',
                        component: TabbedDocumentComponent,
                        children: [
                            {
                                path: 'readme',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'overview',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'api',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'readme'
                            }
                        ]
                    },
                    {
                        path: '',
                        pathMatch: 'full',
                        component: TabbedDocumentTabComponent
                    }
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                                        path: 'overview',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'api',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: 'examples',
                                        component: TabbedDocumentTabComponent
                                    },
                                    {
                                        path: '',
                                        pathMatch: 'full',
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
                    }
                ]
            },
            {
                path: 'widgets',
                children: [
                    {
                        path: 'collection',
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
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
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
                        path: 'dialog',
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
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
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
                                path: 'overview',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'api',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
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
                                path: 'overview',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'api',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
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
                        path: 'layout',
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
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
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
                                path: 'overview',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'api',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
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
                                path: 'overview',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'api',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
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
                                path: 'overview',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'api',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: 'examples',
                                component: TabbedDocumentTabComponent
                            },
                            {
                                path: '',
                                pathMatch: 'full',
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
                        path: '',
                        pathMatch: 'full',
                        component: TabbedDocumentTabComponent
                    }
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
