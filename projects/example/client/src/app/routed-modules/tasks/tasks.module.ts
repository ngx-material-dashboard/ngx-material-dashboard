import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskModule } from '../../domains/task/task.module';
import { TaskComponent } from './pages/task/task.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarModule } from '@ngx-material-dashboard/widgets';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [TasksComponent, TaskComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDividerModule,
        MatTooltipModule,
        FontAwesomeModule,
        ToolbarModule,
        TaskModule,
        TasksRoutingModule
    ]
})
export class TasksModule {}
