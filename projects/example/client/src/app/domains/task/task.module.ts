import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPagedTableComponent } from './pages/tasks-paged-table/tasks-paged-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    CollectionModule,
    DialogModule,
    ListModule,
    TableModule,
    ToolbarModule
} from '@ngx-material-dashboard/widgets';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { CreateTaskDialogComponent } from './pages/create-task-dialog/create-task-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskSearchFormComponent } from './components/task-search-form/task-search-form.component';
import { EditTaskDialogComponent } from './pages/edit-task-dialog/edit-task-dialog.component';
import { CompleteTaskDialogComponent } from './pages/complete-task-dialog/complete-task-dialog.component';
import { TasksPagedListComponent } from './pages/tasks-paged-list/tasks-paged-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    declarations: [
        CreateTaskDialogComponent,
        TaskFormComponent,
        TasksPagedTableComponent,
        TaskSearchFormComponent,
        EditTaskDialogComponent,
        CompleteTaskDialogComponent,
        TasksPagedListComponent
    ],
    exports: [
        TaskFormComponent,
        TasksPagedListComponent,
        TasksPagedTableComponent,
        TaskSearchFormComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        FontAwesomeModule,
        CollectionModule,
        DialogModule,
        ListModule,
        TableModule,
        ToolbarModule
    ]
})
export class TaskModule {}
