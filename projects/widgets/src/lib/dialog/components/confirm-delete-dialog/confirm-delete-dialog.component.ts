import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
    /**
     * The full text content to display in dialog. If this is provided, then
     * a title must also be provided.
     */
    content: string;
    /**
     * The full title to display in the dialog. This must be provided if
     * textContent is provided.
     */
    title: string;
}

@Component({
    selector: 'app-confirm-delete-dialog',
    templateUrl: './confirm-delete-dialog.component.html',
    styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {

    faTrash: IconDefinition = faTrash;
    title: string;
    content: string;

    constructor(
      private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: DialogData
    ) {
        this.title = this.data.title;
        this.content = this.data.content;
    }

    ngOnInit(): void {
    }

    cancel(): void {
        this.dialogRef.close();
    }

    delete(): void {
        this.dialogRef.close(true);
    }
}
