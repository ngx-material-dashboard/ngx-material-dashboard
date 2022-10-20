import { JsonModel } from "@ngx-material-dashboard/base-json";

/**
 * The value emitted when a `TableButton` or `ToolbarButton` is clicked,
 * which includes a string representation of the button that was clicked (i.e.
 * if a create button is clicked, then the `click` value would be something
 * like `create`). This is so you can call a single function with the emitted
 * value and use the `click` property to determine what action to perform.
 * 
 * Emitted values may contain an optional `row`, which should be the full object
 * of the row where the button was clicked (if coming from a `TableButton`), or
 * the row that is selected in a table (if coming from a `ToolbarButton`).
 * 
 * TODO include multiple rows as optional property for buttons that do allow for
 * multi-select.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-paged-table-with-toolbar [buttons]="toolbarButtons" (buttonClick)="onButtonClick($event)">
 *   <!-- column templates -->
 * </ngx-material-dashboard-paged-table-with-toolbar>
 * ```
 * ```typescript
 * @Component({
 *     selector: 'button-click-basic-usage-example',
 *     template: 'button-click-basic-usage-example.html'
 * })
 * export class ButtonClickBasicUsageExample {
 *     
 *     onButtonClick(event: ButtonClick) {
 *         if (event.click === 'create') {
 *             // handle create event
 *         } else if (event.click === 'edit' && event.row?.id) {
 *             // handle edit event
 *         }
 *     }
 * }
 * ```
 */
export interface ButtonClick {
    /** The text of the button that was clicked. */
    click: string;
    /** The item associated with the button that was clicked. */
    row?: JsonModel;
}
