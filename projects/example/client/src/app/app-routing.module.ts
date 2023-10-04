import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks'
    },
    {
        path: 'tasks',
        loadChildren: () =>
            import('./routed-modules/tasks/tasks.module').then(
                (m) => m.TasksModule
            )
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
