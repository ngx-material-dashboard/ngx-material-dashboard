import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * A button to render in a table row. Since this is rendered in a row with
 * table data, it is rendered as a `mat-icon-button`. So there is only an
 * icon associated with it, it does not contain any text.
 * 
 * @overviewDetails
 * ## Basic Usage Example
 * 
 * ```typescript
 * import {TableToolbarButton} from '@ngx-material-dashboard/table-toolbar-button.interface';
 * 
 * const EDIT_BUTTON: TableButton = {
 *     icon: faEdit,
 *     click: 'edit'
 * }
 * ```
 */
export interface TableButton {
    /** The action the button performs (i.e. 'add', 'edit'). */
    click: string;
    /** The icon to display in the button. */
    icon: IconDefinition;
}
