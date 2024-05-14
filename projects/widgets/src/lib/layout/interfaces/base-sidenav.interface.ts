/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface BaseSidenavItem {
    /** Number to include as badge with the item (optional). */
    badge?: number;
    /**
     * The icon to display next to the text. Use an object of type
     * IconDefinition for a fontawesome icon. Otherwise use the string value of
     * mat-icon you want to use; the same as if you were using mat-icon in your
     * HTML template (optional).
     */
    icon?: IconDefinition | string;
    /** Optional parameters to include in route (should be JSON object literal). */
    queryParams?: any;
    /** The CSS selector for the item. */
    selector: string;
    /** The text for the item. */
    text: string;
    /** The text to display as a tooltip over the item (optional). */
    tooltip?: string;
}
