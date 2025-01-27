/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { BaseSidenavItem } from './base-sidenav.interface';
import { SidenavItem } from './sidenav.interface';

/**
 * A `SidenavItemWithChildren` defines a
 * [SidenavItem](/widgets/layout/overview#sidenav-item) that has sidenavItem
 * children nested underneath it. This keeps SidenavItems with children
 * separate from SidenavItems with routes, since right now these are
 * treated as distinct (i.e. a SidenavItem that has children should not
 * have a route, and vice-versa).
 */
export interface SidenavItemWithChildren extends BaseSidenavItem {
    /** SidenavItem's to nest under this one (route should not be defined if this is). */
    children: SidenavItem[];
}
