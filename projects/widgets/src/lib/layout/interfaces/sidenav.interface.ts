import { SidenavItemWithChildren } from './sidenav-with-children.interface';
import { SidenavItemWithRoute } from './sidenav-with-route.interface';

/**
 * An item to render inside the `Sidenav`. A `Sidenav` can have any number of
 * `SidenavItems`. A `SidenavItem` should either direct the user to a specific
 * route in the application, or contain nested `SidenavItem` `children` which
 * should have the same constraints.
 *
 * #### Features
 *
 * All `SidenavItems` should define `text` and a `selector`. The `text` is the
 * text to render for the item in the `Sidenav`, and the `selector` is a CSS
 * selector for the item mainly used for easy access in unit tests. Other than
 * that you must define either a `route` or `children` for each `SidenavItem`,
 * but you should not (and can't) define both. Any other properties are
 * optional.
 *
 * ##### route
 *
 * A routed `SidenavItem` should define the `route`, and will redirect the user
 * to the provided route when they click on it. When you include a `route` you
 * can also include optional `queryParams` to be used with the route. The
 * `queryParams` should be a JSON object literal of params to include in route.
 * If you include a `route`, then you should not include `children`.
 *
 * ```typescript
 * import {SidenavItem} from '@ngx-material-dashboard/widget`;
 *
 * const sidenavItem = { queryParams: { isComplete: false }, route: ['tasks'], text: 'Pending', selector: 'pending' };
 * ```
 *
 * ##### children
 *
 * A `SidenavItem` with `children` will nest the children under the parent.
 * Currently the `Sidenav` will only render 2 levels of `children`, meaning you
 * can only define a parent, child, and grandchildren `SidenavItems`. The
 * grandchildren `SidenavItems` should all define a `route`. If you include
 * children, then you should not include a `route`.
 *
 * ```typescript
 * import {SidenavItem} from '@ngx-material-dashboard/widget`;
 *
 * const childSidenavItem = { route: ['tasks'], text: 'Pending', selector: 'pending' };
 * const parentSidenavItem = { children: [childSidenavItem], text: 'Tasks', selector: 'tasks'};
 * ```
 *
 * ##### icon
 *
 * You may include an optional `icon` to render next to the text for the item.
 * The `icon` must be a `fontawesome` `IconDefintion`.
 *
 * ```typescript
 * import {faClipboardList} from '@fortawesome/free-solid-svg-icons';
 * import {SidenavItem} from '@ngx-material-dashboard/widget`;
 *
 * const sidenavItem = { icon: faClipboardList, route: ['tasks'], text: 'Pending', selector: 'pending' };
 * ```
 *
 * ##### tooltip
 *
 * You may include optional text to display as a tooltip when the user hovers
 * over the item.
 *
 * ```typescript
 * import {SidenavItem} from '@ngx-material-dashboard/widget`;
 *
 * const sidenavItem = { route: ['tasks'], text: 'Pending', selector: 'pending', tooltip: 'Manage Pending Tasks' };
 * ```
 */
export type SidenavItem = SidenavItemWithChildren | SidenavItemWithRoute;
