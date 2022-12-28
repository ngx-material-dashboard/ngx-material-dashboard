import { BaseSidenavItem } from './base-sidenav.interface';
import { SidenavItem } from './sidenav.interface';

/**
 * A `SidenavItemWithChildren` defines a
 * [SidenavItem](/widgets/interfaces/sidenav-item) that has sidenavItem
 * children nested underneath it. This keeps SidenavItems with children
 * separate from SidenavItems with routes, since right now these are
 * treated as distinct (i.e. a SidenavItem that has children should not
 * have a route, and vice-versa).
 */
export interface SidenavItemWithChildren extends BaseSidenavItem {
    /** SidenavItem's to nest under this one (route should not be defined if this is). */
    children: SidenavItem[];
}
