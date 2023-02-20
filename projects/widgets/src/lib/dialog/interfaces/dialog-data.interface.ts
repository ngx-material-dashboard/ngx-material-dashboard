/**
 * Properties that should be passed in to the `ConfirmDeleteDialog`. This
 * allows title and text content to be set dynamically in `component` where the
 * dialog is called from.
 *
 * #### Basic Usage Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {MatDialog} from '@angular/material/dialog';
 *
 * @Component({
 *     selector: 'dialog-data-usage-example',
 *     templateUrl: './dialog-data-usage-example.html'
 * })
 * export class DialogDataUsageExample {
 *
 *     constructor(private dialog: MatDialog) {}
 *
 *     openConfirmDeleteDialog(): void {
 *         // configure DialogData
 *         const data: DialogData = {data: {context:'Are you sure you want to delete value?', title:'Delete value?'}};
 *
 *         // open dialog with data
 *         const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, data);
 *
 *         // additional logic to handle when dialog is closed...
 *     }
 * }
 * ```
 */
export interface DialogData {
    /**
     * The full text content to display in dialog. If this is provided, then
     * a title must also be provided.
     */
    content: string;
    /**
     * The full title to display in the dialog. This must be provided if
     * text content is provided.
     */
    title: string;
}
