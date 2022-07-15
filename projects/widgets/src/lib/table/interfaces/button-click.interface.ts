/**
 * The value emitted when a `TableButton` or `TableToolbarButton` is clicked,
 * which includes a string representation of the button that was clicked (i.e.
 * if a create button is clicked, then the `click` value would be something
 * like `create`). This is so you can listen for multiple button clicks in a
 * single subscription and use the `click` value to determine what action to
 * perform.
 * 
 * Emitted values may contain an optional `row`, which should be the full object
 * of the row where the button was clicked (if coming from a `TableButton`), or
 * the row that is selected in a table (if coming from a `TableToolbarButton`).
 * 
 * TODO include multiple rows as optional property for buttons that do allow for
 * multi-select.
 */
export interface ButtonClick {
    click: string;
    row?: any;
}
