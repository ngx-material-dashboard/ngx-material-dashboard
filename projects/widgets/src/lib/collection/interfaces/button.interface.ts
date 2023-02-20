import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * A button to render with a collection item. It is merely a wrapper for the
 * `mat-icon-button`, so there is only an icon associated with it, it does not
 * contain any text.
 *
 * @overviewDetails
 * #### Basic Usage Example
 *
 * ```typescript
 * import {Button} from '@ngx-material-dashboard/button.interface';
 *
 * const EDIT_BUTTON: Button = {
 *     icon: faEdit,
 *     click: 'edit'
 * }
 * ```
 */
export interface Button {
    /** The action the button performs (i.e. 'add', 'edit'). */
    click: string;
    /** The icon to display in the button. */
    icon: IconDefinition;
}
