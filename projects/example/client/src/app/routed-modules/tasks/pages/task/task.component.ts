import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    faCheck,
    faChevronLeft,
    faChevronRight,
    faClipboardCheck,
    faClipboardList,
    faHourglassEnd,
    faHourglassHalf,
    faHourglassStart,
    faSave
} from '@fortawesome/free-solid-svg-icons';
import {
    AlertService,
    ButtonClickAction,
    ToolbarButton
} from '@ngx-material-dashboard/widgets';

import { Task } from '../../../../shared/models/task.model';
import { JsonApiService } from '../../../../shared/services/json-api.service';
import { CompleteTaskDialogComponent } from '../../../../domains/task/pages/complete-task-dialog/complete-task-dialog.component';
import { TaskService } from '../../../../domains/task/services/task.service';

@Component({
    providers: [DatePipe],
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    buttons: ToolbarButton[] = [
        {
            canDisable: false,
            disabled: false,
            icon: faSave,
            click: ButtonClickAction.Save,
            text: 'Save'
        },
        {
            canDisable: false,
            disabled: false,
            icon: faCheck,
            click: ButtonClickAction.Edit,
            text: 'Complete'
        }
    ];
    faPrev = faChevronLeft;
    faNext = faChevronRight;
    form!: FormGroup;
    /** The icon to display in the header. */
    icon?: IconProp;
    /** The class to add to the icon in the header of the component (if over due, due today, or tomorrow). */
    iconClass?: string;
    index: number = 0;
    /** The Task to edit. */
    task?: Task;
    tasks: Task[] = [];
    /** The tooltip to display with the icon in the header of the component. */
    tooltip?: string;

    constructor(
        private alertService: AlertService,
        private datepipe: DatePipe,
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private jsonApiService: JsonApiService,
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({});
        this.taskService.pendingTasks.subscribe((tasks) => {
            this.tasks = tasks;
        });
        this.route.params.subscribe((params) => {
            this.jsonApiService
                .findRecord(Task, params['id'])
                .subscribe((task) => {
                    this.task = task;
                    this.index = this.tasks.findIndex(
                        (val) => val.id === task.id
                    );
                    this.initIconClass(this.task);
                });
        });
    }

    onButtonClick(click: string | undefined) {
        if (click === ButtonClickAction.Save) {
            if (this.task) {
                // update task properties from form values
                const mainPropertiesForm = this.form.get('main');
                this.task.name = mainPropertiesForm?.get('name')?.value;
                this.task.description =
                    mainPropertiesForm?.get('description')?.value;
                this.task.dueDate = mainPropertiesForm?.get('due')?.value;
                this.task.priority = mainPropertiesForm?.get('priority')?.value;

                const repeatPropertiesForm = this.form.get('repeat');
                this.task.repeats = repeatPropertiesForm?.get('repeats')?.value;
                this.task.endsAfter = repeatPropertiesForm?.get('after')?.value;
                this.jsonApiService
                    .updateRecord(this.task, 'update')
                    .subscribe((t: Task) => {
                        this.task = t;
                        this.taskService.initNumTasks();
                        this.alertService.success('Task updated successfully');
                    });
            }
        } else if (click === ButtonClickAction.Edit) {
            if (this.task) {
                this.complete(this.task);
            }
        }
    }

    complete(task: Task): void {
        const dialog = this.dialog.open(CompleteTaskDialogComponent, {
            data: { tasks: [task] }
        });
        dialog.afterClosed().subscribe((res) => {
            if (res) {
                task.dateCompleted = res;
                this.jsonApiService
                    .updateRecord(this.task, 'complete')
                    .subscribe((t: Task) => {
                        this.task = t;
                        this.taskService.initNumTasks();
                        this.alertService.success(
                            'Task completed successfully'
                        );
                    });
            }
        });
    }

    onPageButtonClick(index: number) {
        this.router.navigate(['tasks', this.tasks[index].id]);
    }

    /**
     * Initializes the icon and corresponding class for the icon based on the
     * properties of the Task being modified. Color classes are added to the
     * icon using the iconClass string property for Tasks that are over due,
     * due today, or due tomorrow.
     */
    initIconClass(task: Task) {
        this.iconClass = 'mat-icon-button notice';

        if (task.isComplete) {
            this.icon = faClipboardCheck;
            this.tooltip = 'Complete';
        } else {
            const status = task.status;

            if (status === 'Over Due') {
                this.icon = faHourglassEnd;
                this.tooltip = 'Over Due';
                this.iconClass += ' red';
            } else if (status === 'Due Today') {
                this.icon = faHourglassHalf;
                this.tooltip = 'Due Today';
                this.iconClass += ' orange';
            } else if (status === 'Due Tomorrow') {
                this.icon = faHourglassStart;
                this.tooltip = 'Due Tomorrow';
                this.iconClass += ' yellow';
            } else {
                this.icon = faClipboardList;
                this.tooltip = `Due ${this.datepipe.transform(
                    task.dueDate,
                    'MM/DD/YYYY'
                )}`;
            }
        }
    }
}
