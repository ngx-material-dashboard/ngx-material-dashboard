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
    /** Number to include as badge with */
    badge?: number;
    /** The icon to display next to the text (optional). */
    icon?: IconDefinition;
    /** Optional parameters to include in route (should be JSON object literal). */
    queryParams?: any;
    /** The CSS selector for the item. */
    selector: string;
    /** The text for the item. */
    text: string;
    /** The text to display as a tooltip over the item (optional). */
    tooltip?: string;
}
