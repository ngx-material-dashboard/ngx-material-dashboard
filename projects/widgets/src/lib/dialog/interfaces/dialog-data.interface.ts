/**
 * Properties that should be passed in to the `ConfirmDeleteDialog`. THis
 * allows title and text content to be set dynamically in `component` where the
 * dialog is called from.
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
