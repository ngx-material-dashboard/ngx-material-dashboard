import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './pages/task/task.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
    {
        path: ':id',
        component: TaskComponent
    },
    {
        path: '',
        pathMatch: 'full',
        component: TasksComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule {}
