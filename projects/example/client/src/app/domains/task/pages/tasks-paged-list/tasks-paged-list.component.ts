import { ComponentType } from '@angular/cdk/portal';
import { Component, Input } from '@angular/core';
import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
    AlertService,
    Button,
    ButtonClick,
    ConfirmDeleteDialogComponent,
    CREATE_TOOLBAR_BUTTON,
    DELETE_BUTTON,
    DELETE_TOOLBAR_BUTTON,
    EDIT_BUTTON,
    EDIT_TOOLBAR_BUTTON,
    FilterService,
    RemoteDataSource,
    ToolbarButton
} from '@ngx-material-dashboard/widgets';
import { TaskFilter } from '../../../../shared/interfaces/task-filter.interface';

import { Task } from '../../../../shared/models/task.model';
import { JsonApiService } from '../../../../shared/services/json-api.service';
import { filter, Subscription } from 'rxjs';
import { CompleteTaskDialogComponent } from '../complete-task-dialog/complete-task-dialog.component';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { TaskService } from '../../services/task.service';
import { faHourglass, faPlus, faTag } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'app-tasks-paged-list',
    templateUrl: './tasks-paged-list.component.html',
    styleUrls: ['./tasks-paged-list.component.scss']
})
export class TasksPagedListComponent {
    @Input() set filter(filter: TaskFilter) {
        this.loadData(filter);
    }
    collectionButtons: Button[] = [EDIT_BUTTON, DELETE_BUTTON];
    toolbarButtons: ToolbarButton[] = [
        CREATE_TOOLBAR_BUTTON,
        EDIT_TOOLBAR_BUTTON,
        DELETE_TOOLBAR_BUTTON
    ];
    dataSource: RemoteDataSource<Task>;
    faHourglass: IconProp = faHourglass;
    faPlus: IconProp = faPlus;
    faTag: IconProp = faTag;
    fields: { field: string; text: string }[] = [
        { field: 'task.name', text: 'Name' },
        { field: 'task.priority', text: 'Priority' },
        { field: 'task.description', text: 'Description' },
        { field: 'task.dueDate', text: 'Due Date' }
    ];
    sub: Subscription;

    constructor(
        private alertService: AlertService,
        private dialog: MatDialog,
        private filterService: FilterService,
        private jsonApiService: JsonApiService,
        private taskService: TaskService,
        private router: Router
    ) {
        this.dataSource = new RemoteDataSource<Task>(Task, this.jsonApiService);
        this.sub = new Subscription();
    }

    ngOnInit(): void {
        const sub = this.filterService.filter
            .pipe(filter((res) => res !== null))
            .subscribe((res: any) => {
                this.loadData({ ...this.filter, ...res });
            });
        this.sub.add(sub);
    }

    onButtonClick(buttonClick: ButtonClick): void {
        if (buttonClick.click === 'create') {
            this.openCreateDialog();
        } else if (buttonClick.click === 'complete') {
            this.openCompleteDialog(buttonClick.row as Task);
        } else if (buttonClick.click === 'edit') {
            this.router.navigate(['tasks', buttonClick.row?.id]);
        } else if (buttonClick.click === 'delete') {
            this.openConfirmDeleteDialog(buttonClick.row as Task);
        }
    }

    openCreateDialog(): void {
        this.openCreateDialogUtil(CreateTaskDialogComponent);
    }

    openCreateDialogUtil(
        dialogComponent: ComponentType<unknown>,
        dialogConfig?: MatDialogConfig
    ): void {
        // open the dialog
        const dialogRef = this.dialog.open(dialogComponent, dialogConfig);

        // save object when dialog closes
        const afterCloseSub = dialogRef
            .afterClosed()
            .pipe(
                // only include data that is defined; this prevents component from
                // creating objects without any data defined (and not having to
                // include condition inside subscribe to ensure data defined)
                filter((data: Partial<Task>) => data !== undefined)
            )
            .subscribe((data: Partial<Task>) => {
                const val: Task = this.jsonApiService.createRecord(Task, data);
                val.save().subscribe(() => {
                    this.dataSource.refresh();
                    this.taskService.initNumTasks();
                    this.alertService.success('Task created successfully');
                });
            });
        this.sub.add(afterCloseSub);
    }

    openConfirmDeleteDialog(val: Task): void {
        const dialogConfig = {
            data: {
                title: 'Delete Task?',
                content: `Are you sure you want to delete the selected task ${val.name}`
            }
        };

        this.dialog
            .open(ConfirmDeleteDialogComponent, dialogConfig)
            .afterClosed()
            .subscribe((res) => {
                if (res && val.id) {
                    this.jsonApiService
                        .deleteRecord(Task, val.id)
                        .subscribe(() => {
                            this.dataSource.refresh();
                            this.taskService.initNumTasks();
                            this.alertService.success(
                                `Task (${val.name}) deleted successfully`
                            );
                        });
                }
            });
    }

    private loadData(filter: TaskFilter): void {
        if (this.dataSource && this.dataSource instanceof RemoteDataSource) {
            this.dataSource.load(filter, 'task.name', 'asc', 0, 25);
            this.dataSource.data$.subscribe((res) => {
                this.taskService.setPendingTasks(res);
            });
        }
    }

    openCompleteDialog(val: Task) {
        const dialogConfig = {
            data: {
                tasks: [val]
            }
        };

        // open the dialog
        const dialogRef = this.dialog.open(
            CompleteTaskDialogComponent,
            dialogConfig
        );
        this.saveTask(dialogRef, 'complete', 'Task Completed Successfully');
    }

    private saveTask(
        dialogRef: MatDialogRef<
            CompleteTaskDialogComponent | EditTaskDialogComponent
        >,
        transition: string,
        successMessage: string
    ): void {
        // save object when dialog closes
        const afterCloseSub = dialogRef
            .afterClosed()
            .pipe(
                // only include data that is defined; this prevents component from
                // creating objects without any data defined (and not having to
                // include condition inside subscribe to ensure data defined)
                filter((data: Task) => data !== undefined)
            )
            .subscribe((data: Task) => {
                this.jsonApiService
                    .updateRecord(data, transition)
                    .subscribe(() => {
                        this.dataSource.refresh();
                        this.taskService.initNumTasks();
                        this.alertService.success(successMessage);
                    });
            });
        this.sub.add(afterCloseSub);
    }
}
