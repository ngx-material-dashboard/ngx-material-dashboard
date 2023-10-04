import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormService } from '@ngx-material-dashboard/widgets';

import { Task } from '../../../../shared/models/task.model';

@Component({
    selector: 'app-create-task-dialog',
    templateUrl: './create-task-dialog.component.html',
    styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {
    faPlus: IconDefinition = faPlus;
    form!: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
        private formBuilder: FormBuilder,
        private formService: FormService
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({});
    }

    cancel(): void {
        this.dialogRef.close();
    }

    save(): void {
        if (this.form.valid) {
            const mainData = this.form.get('main');
            const repeatData = this.form.get('repeat');
            const taskPartial: Partial<Task> = {
                name: mainData?.get('name')?.value,
                description: mainData?.get('description')?.value,
                priority: mainData?.get('priority')?.value,
                dueDate: mainData?.get('due')?.value,
                repeats: repeatData?.get('repeats')?.value,
                endsAfter: repeatData?.get('after')?.value
            };
            this.dialogRef.close(taskPartial);
        } else {
            // mark form touched to display validation errors
            this.formService.markAsTouched(this.form);
        }
    }
}
