import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'widgets',
        loadChildren: () => import('./routed-modules/widgets/widgets.module').then(m => m.WidgetsModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'widgets'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
