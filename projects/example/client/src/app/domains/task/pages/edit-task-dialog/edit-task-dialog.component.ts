import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { Task } from '../../../../shared/models/task.model';

@Component({
    selector: 'app-edit-task-dialog',
    templateUrl: './edit-task-dialog.component.html',
    styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {
    faEdit: IconDefinition = faEdit;
    form!: FormGroup;
    task: Task;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<EditTaskDialogComponent>,
        private formBuilder: FormBuilder
    ) {
        this.task = this.data.tasks[0];
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({});
    }

    cancel(): void {
        this.dialogRef.close();
    }

    save(): void {
        const mainData = this.form.get('main');
        const repeatData = this.form.get('repeat');
        this.task.name = mainData?.get('name')?.value;
        this.task.description = mainData?.get('description')?.value;
        this.task.priority = mainData?.get('priority')?.value;
        this.task.dueDate = mainData?.get('due')?.value;
        this.task.repeats = repeatData?.get('repeats')?.value;
        this.task.endsAfter = repeatData?.get('after')?.value;
        this.dialogRef.close(this.task);
    }
}
