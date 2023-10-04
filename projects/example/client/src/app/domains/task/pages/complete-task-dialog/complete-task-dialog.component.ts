import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { Task } from '../../../../shared/models/task.model';

@Component({
    selector: 'app-complete-task-dialog',
    templateUrl: './complete-task-dialog.component.html',
    styleUrls: ['./complete-task-dialog.component.scss']
})
export class CompleteTaskDialogComponent implements OnInit {
    /** Event emitted when the Task(s) are complete. */
    @Output() completeTask: EventEmitter<Task> = new EventEmitter<Task>();
    /** The text to display in the content along with the date completed field. */
    content: string;
    /** The form for the dateCompleted property. */
    form!: FormGroup;
    /** The text to display for the dateCompleted hint. */
    hint: string;
    /** The max date a Task can be marked as complete (set to current date; it doesn't 
        make a lot of sense to allow user to mark a task complete in the future).*/
    maxDateCompleted: Date;
    /** The Task(s) to complete. */
    tasks: Task[];
    /** The title text for the dialog. */
    title: string;
    /** The subscriptions for the component. */
    private sub: Subscription;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<CompleteTaskDialogComponent>,
        private formBuilder: FormBuilder
    ) {
        this.maxDateCompleted = new Date();
        this.sub = new Subscription();
        this.tasks = this.data.tasks;
        if (this.tasks.length > 1) {
            this.content =
                'Enter the date the Tasks are completed. All Tasks will get the same date completed.';
            this.hint = 'The date the tasks are completed';
            this.title = 'Complete Tasks';
        } else {
            this.content = 'Enter the date the Task is completed.';
            this.hint = 'The date the task is completed';
            this.title = 'Complete Task';
        }
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            dateCompleted: [
                {
                    value: '',
                    disabled: false
                },
                [Validators.required]
            ]
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    save(): void {
        for (const task of this.tasks) {
            task.dateCompleted = this.form.get('dateCompleted')?.value;
        }
        this.dialogRef.close(this.tasks[0].dateCompleted); // TODO allow multiple values
    }
}
