/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { BaseSidenavItem } from './base-sidenav.interface';

/**
 * A `SidenavItemWithRoute` defines a
 * [SidenavItem](/widgets/interfaces/sidenav-item) that has a route
 * defined. This keeps SidenavItems with routes separate from SidenavItems
 * with routes, since right now these are treated as distinct (i.e. a
 * SidenavItem that has routes should not have children, and vice-versa).
 */
export interface SidenavItemWithRoute extends BaseSidenavItem {
    /** The route to use when the item is clicked (children should not be defined if this is). */
    route: any[];
}
