import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef
} from '@angular/material/dialog';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
    Button,
    ButtonClick,
    ConfirmDeleteDialogComponent,
    CREATE_TOOLBAR_BUTTON,
    DELETE_BUTTON,
    DELETE_TOOLBAR_BUTTON,
    EDIT_BUTTON,
    EDIT_TOOLBAR_BUTTON,
    FilterService,
    PagedTableComponent,
    RemoteDataSource,
    SelectionService,
    ToolbarButton
} from '@ngx-material-dashboard/widgets';
import { filter, Subscription } from 'rxjs';

import { TaskFilter } from '../../../../shared/interfaces/task-filter.interface';
import { Task } from '../../../../shared/models/task.model';
import { JsonApiService } from '../../../../shared/services/json-api.service';
import { CompleteTaskDialogComponent } from '../complete-task-dialog/complete-task-dialog.component';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { ComponentType } from '@angular/cdk/overlay';
import { MatSort } from '@angular/material/sort';

const completeButton: Button = {
    icon: faCheck,
    click: 'complete'
};

const completeToolbarButton: ToolbarButton = {
    canDisable: true,
    disabled: true,
    icon: faCheck,
    multiSelectDisabled: false,
    click: 'complete',
    text: 'Complete'
};

@Component({
    selector: 'app-tasks-paged-table',
    templateUrl: './tasks-paged-table.component.html',
    styleUrls: ['./tasks-paged-table.component.scss']
})
export class TasksPagedTableComponent {
    @Input() set filter(filter: TaskFilter) {
        this.loadData(filter);
    }
    //@ViewChild(PagedTableComponent) pagedTable!: PagedTableComponent<Task>;
    //@ViewChild(MatSort) sort!: MatSort;
    collectionButtons: Button[] = [EDIT_BUTTON, DELETE_BUTTON];
    toolbarButtons: ToolbarButton[] = [
        CREATE_TOOLBAR_BUTTON,
        EDIT_TOOLBAR_BUTTON,
        DELETE_TOOLBAR_BUTTON
    ];
    dataSource: RemoteDataSource<Task>;
    dialog$: MatDialog;
    displayedColumns: string[] = [
        'select',
        'name',
        'priority',
        'description',
        'dueDate',
        'actions'
    ];
    fields: string[] = ['name', 'priority', 'description', 'dueDate'];
    sub: Subscription;

    constructor(
        private dialog: MatDialog,
        private filterService: FilterService,
        private jsonApiService: JsonApiService
    ) {
        this.dataSource = new RemoteDataSource<Task>(Task, this.jsonApiService);
        this.dialog$ = dialog;
        this.sub = new Subscription();
    }

    ngAfterViewInit(): void {
        // this is needed to properly initialize sorting capability for table
        //this.pagedTable.sort = this.sort;
    }

    // constructor(
    //     dialog: MatDialog,
    //     private filterService: FilterService,
    //     formBuilder: FormBuilder,
    //     jsonApiService: JsonApiService,
    //     toastrService: ToastrService
    // ) {
    //     this.dialog$ = dialog;
    //     this.jsonApiService = jsonApiService;
    //     this.toastrService$ = toastrService;
    // }

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
            this.openEditDialog(buttonClick.row as Task);
        }
        // else {
        //     super.onButtonClick(buttonClick);
        // }
    }

    openCreateDialog(): void {
        this.openCreateDialogUtil(CreateTaskDialogComponent);
    }

    openCreateDialogUtil(
        dialogComponent: ComponentType<unknown>,
        dialogConfig?: MatDialogConfig
    ): void {
        // open the dialog
        const dialogRef = this.dialog$.open(dialogComponent, dialogConfig);

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
                val.save().subscribe((res: Task) => {
                    this.dataSource.refresh();
                    // this.toastrService.success(`${this.modelType.name} created successfully`);
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

        //super.openConfirmDeleteDialogUtil(val, ConfirmDeleteDialogComponent, dialogConfig);
    }

    private loadData(filter: TaskFilter): void {
        if (this.dataSource && this.dataSource instanceof RemoteDataSource) {
            this.dataSource.load(filter, 'name', 'asc', 0, 25);
        }
    }

    openCompleteDialog(val: Task) {
        const dialogConfig = {
            data: {
                tasks: [val]
            }
        };

        // open the dialog
        const dialogRef = this.dialog$.open(
            CompleteTaskDialogComponent,
            dialogConfig
        );
        this.saveTask(dialogRef, 'complete', 'Task Completed Successfully');
    }

    openEditDialog(val: Task): void {
        const dialogConfig = {
            data: {
                tasks: [val]
            }
        };

        // open the dialog
        const dialogRef = this.dialog$.open(
            EditTaskDialogComponent,
            dialogConfig
        );
        this.saveTask(dialogRef, 'update', 'Task Updated Successfully');
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
                    .subscribe((res: Task) => {
                        this.dataSource.refresh();
                        // if (this.dataSource instanceof RemoteDataSource) {
                        //     this.dataSource.refresh();
                        // } else {
                        //     //this.collection.dataSource$.data.push(res);
                        // }
                        //this.toastrService$.success(successMessage);
                    });
            });
        this.sub.add(afterCloseSub);
    }
}
