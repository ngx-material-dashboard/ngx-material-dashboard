import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DialogData } from '../../interfaces/dialog-data.interface';

/**
 * A re-usable confirmation dialog with configurable title and text values. If
 * the user confirms in the dialog, then the result returned to the dialog
 * opener is `true`. This allows for complete control of deleting the thing
 * the user wants to delete.
 * 
 * @overviewDetails
 * ## Basic Usage Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {MatDialog} from '@angular/material/dialog';
 *
 * @Component({
 *     selector: 'confirm-delete-dialog-usage-example',
 *     templateUrl: './confirm-delete-dialog-usage-example.html'
 * })
 * export class ConfirmDeleteDialogUsageExample {
 *     
 *     constructor(private dialog: MatDialog) {}
 * 
 *     // you will need to call this somewhere, either from a button `(click)`
 *     // event, or perhaps in a subscribe block to some observable
 *     openConfirmDeleteDialog(): void {
 *         // open the dialog
 *         const dialogRef = this.dialog.open(
 *             ConfirmDeleteDialogComponent,
 *             {data: {context:'Are you sure you want to delete value?', title:'Delete value?'}}
 *         );
 * 
 *         // handle when dialog closed
 *         dialogRef.afterClosed().subscribe((confirm: boolean) => {
 *             if (confirm) {
 *                 // logic to delete the thing
 *             } // if no confirmation then nothing to do
 *         });
 *     }
 * }
 * ```
 */
@Component({
    selector: 'ngx-material-dashboard-confirm-delete-dialog',
    templateUrl: './confirm-delete-dialog.component.html',
    styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {

    /** The icon to render in the dialog. */
    faTrash: IconDefinition = faTrash;
    /** The title to display in the dialog. */
    title: string;
    /** The main content of the dialog. */
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

    /**
     * Closes the dialog without returning any value so dialog opener can
     * safely ignore the initial delete request.
     */
    cancel(): void {
        this.dialogRef.close();
    }

    /**
     * Closes the dialog and returns `true` to the dialog opener so it can
     * handle the logic to delete the thing.
     */
    delete(): void {
        this.dialogRef.close(true);
    }
}
