/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

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
                                redirectTo: 'overview'
                            }
                        ]
                    },
                    {
                        path: 'fixtures',
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
                                redirectTo: 'overview'
                            }
                        ]
                    },
                    {
                        path: 'mocks',
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
                                redirectTo: 'overview'
                            }
                        ]
                    },
                    {
                        path: 'models',
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
            {
                path: 'widgets',
                children: [
                    {
                        path: 'alert',
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
