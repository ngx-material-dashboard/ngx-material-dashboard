import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './widgets/layout/layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'json',
                loadChildren: () => import('./routed-modules/json/json.module').then(m => m.JSONModule)
            },
            {
                path: 'widgets',
                loadChildren: () => import('./routed-modules/widgets/widgets.module').then(m => m.WidgetsModule)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'widgets'
            }
        ]
    }
];

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
