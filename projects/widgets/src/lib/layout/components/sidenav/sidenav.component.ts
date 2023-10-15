/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { SidenavItem } from '../../interfaces/sidenav.interface';
import { SidenavUtilService } from '../../services/sidenav-util.service';

/**
 * A wrapper component for the `MatNavList` to be used to render in a
 * `MatSidenav`. This provides all necessary logic and styles to highlight and
 * expand `SidenavItems` according to the current route. It also includes an
 * SCSS mixin for you to configure the colors to use for active sidenav items,
 * so you can ensure the sidenav theme matches the rest of your application.
 *
 * The component is automatically included in the `DefaultLayout`. If you use
 * the `DefaultLayout`, the only thing you need to do is define the array of
 * `SidenavItems` and include it as an input in the tag. You may use this
 * component without the `DefaultLayout` if you want to use it to create your
 * own layout.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```html
 * <div fxLayout="column">
 *     <mat-sidenav-container class="content" fxLayout="row">
 *         <mat-sidenav [mode]="mode">
 *             <ngx-mat-sidenav [sidenavItems]="sidenavItems"></ngx-mat-sidenav>
 *         </mat-sidenav>
 *         <mat-sidenav-content fxFlex>
 *             <router-outlet></router-outlet>
 *         </mat-sidenav-content>
 *     </mat-sidenav-container>
 * </div>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {SidenavItem} from '@ngx-material-dashboard/widgets';
 *
 * @Component({
 *     selector: 'basic-usage-example',
 *     templateUrl: './basic-usage-example.html'
 * })
 * export class BasicUsageExample {
 *     mode = 'side';
 *     sidenavItems: SidenavItem[] = [
 *         { queryParams: { isComplete: false }, route: ['tasks'], text: 'Pending', selector: 'pending' },
 *         { queryParams: { isComplete: false, filter: 'overdue' }, route: ['tasks'], text: 'Over Due', selector: 'over-due' },
 *         { queryParams: { isComplete: true }, route: ['tasks'], text: 'Complete', selector: 'complete' }
 *     ];
 * }
 * ```
 *
 * @overviewDetails
 * #### Features
 *
 * The `Sidenav` has several features including the ability to render nested
 * `SidenavItems`, icons with each `SidenavItem`, custom `tooltips` to render
 * when the user hovers over a `SidenavItem`, a "mini" mode, and the ability
 * to render badges with integer values.
 *
 * ##### Nested SidenavItems
 *
 * The `Sidenav` allows you to define basic or nested `SidenavItems`. A basic
 * `Sidenav` item should have a route defined, while a nested `SidenavItem`
 * should have children defined. Nested `SidenavItems` will expand to display
 * any children. Currently the `Sidenav` will only render 2 levels of
 * `children`, meaning you can only define a parent, child, and grandchildren
 * `SidenavItems`. The grandchildren `SidenavItems` should all define a `route`.
 *
 * ##### Icons
 *
 * You may define a fontawesome icon for each of the items rendered in the
 * `Sidenav`. The icons will be rendered to the left of the text you include
 * for the `SidenavItem`.
 *
 * ##### Tooltip
 *
 * You may define text to render as a `tooltip` for when the user hovers over
 * a `SidenavItem`. The text displayed with the `SidenavItem` itself should be
 * mostly self explanatory, but this allows you to include some additional
 * details to the user when they hover over a `SidenavItem`.
 *
 * See the [Sidenav](/widgets/layout/overview#sidenav) interface documentation for
 * more details on the values to include when defining your `SidenavItems`.
 *
 * ##### Badges
 *
 * If you define badge numbers for any `SidenavItem`, then by default it will
 * render to the right of the text for it's respective `SidenavItem`. This is
 * similar to how you might see the number of unread messages in your inbox. If
 * the sidenav is set with mini mode (i.e. `mode`='rail'), and the sidenav is
 * collapsed, then a MatBadge is used with the number over the icon.
 *
 * ##### Mini
 *
 * A "mini" sidenav that just renders icons. If the input value for mode
 * provided is `rail`, and the sidenav is collapsed, then text is hidden, and
 * only icons are rendered. This mimics the look of a mini sidenav you might
 * see on smaller devices.
 *
 * > NOTE: This requires icons to be defined in each of your sidenavs. Otherwise
 * nothing will render when collapsed.
 *
 * > ANOTHER ONE: This has not been tested with nested sidenavItems, but you
 * will most likely not get a compact sidenav due to nested spacing added
 * Probably best to only use `rail` with flat sidenavs (i.e. sidenavs that
 * don't have children).
 */
@Component({
    selector: 'ngx-mat-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy, OnInit {
    @Input() isExpanded: boolean = false;
    @Input() mode: any = 'side';
    /** The array of items to display in the sidenav. */
    @Input() set sidenavItems(sidenavItems: SidenavItem[]) {
        this.sidenavItems$ = sidenavItems;
        this.initSidenavItems();
    }
    @ViewChild('navList', { read: ElementRef }) navList!: ElementRef;
    /** Angle down icon displayed for expanded sidenav items. */
    faAngleDown: IconDefinition = faAngleDown;
    /** Angle right icon displayed for collapsed sidenav items. */
    faAngleRight: IconDefinition = faAngleRight;
    /** Any query params  */
    queryParams: any = {};
    /** The array of items to display in the sidenav. */
    sidenavItems$: SidenavItem[] = [];
    /** The subscriptions for the component. */
    sub: Subscription;
    /** Tracks the toggle status for items in sidenav. */
    toggle: { toggle: boolean; children: boolean[] }[] = [];

    /**
     * Returns true if the text should be rendered with each SidenavItem. Text
     * should be rendered with each SidenavItem by default or if the mode is
     * rail (i.e. mini) and the sidenav is expanded. If the sidenav is not
     * expanded and the mode is rail, then text should not be rendered. This
     * makes the sidenav "responsive" to when it collapses for mini mode so
     * only the icon is rendered (since that is all that should show anyway).
     */
    get renderText() {
        return (
            this.mode !== 'rail' || (this.mode === 'rail' && this.isExpanded)
        );
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sidenavUtilService: SidenavUtilService
    ) {
        this.sub = new Subscription();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        this.initSidenavItems();
        const queryParamsSub = this.route.queryParams.subscribe((params) => {
            this.queryParams = params;
            this.initSidenavItems();
        });
        this.sub.add(queryParamsSub);

        const sidenavSub = this.sidenavUtilService.sidenavMenuChanges.subscribe(
            (next) => {
                this.isExpanded = next;
            }
        );
        this.sub.add(sidenavSub);
    }

    /**
     * Returns item's badge text if it exists, truncating any number greater
     * than 100 to "99+".
     *
     * @param item The item to render the badge for.
     * @returns The text to render for the badge if it exists.
     */
    getBadge(item: SidenavItem): string | null {
        if (item.badge) {
            return item.badge < 100 ? item.badge.toString() : '99+';
        } else {
            return null;
        }
    }

    /**
     * Returns array of child SidenavItems if they exist for given item.
     *
     * @param item SidenavItem to get children from (if they exist).
     * @returns Children SidenavItems of given item (if they exist).
     */
    getChildrenByItem(item: SidenavItem): SidenavItem[] | undefined {
        if ('children' in item) {
            return item.children;
        } else {
            return undefined;
        }
    }

    /**
     * Initializes sidenav items and toggle state based on current URL.
     */
    private initSidenavItems() {
        let childIndex: number;
        const index = this.sidenavItems$.findIndex((item: SidenavItem) => {
            if ('children' in item) {
                childIndex = item.children.findIndex(
                    (childItem: SidenavItem) => {
                        if ('route' in childItem) {
                            return this.router.url.includes(
                                `/${item.selector}/${childItem.route
                                    .join('/')
                                    .replace('./', '')}`
                            );
                        } else {
                            return this.router.url.includes(
                                `/${item.selector}/${childItem.selector}`
                            );
                        }
                    }
                );

                if (childIndex >= 0) {
                    return true;
                    // I don't think below else if ever comes to pass or even makes sense
                    // really since a sidenavItem with children will most likely not have
                    // a route
                    // } else if (item.route) {
                    //     return this.router.url.includes(`/${item.route.join('/').replace('./', '')}`);
                } else {
                    return (
                        this.router.url.endsWith(`/${item.selector}`) ||
                        this.router.url.includes(`/${item.selector}/`)
                    );
                }
            } else {
                return this.router.url.includes(
                    `/${item.route.join('/').replace('./', '')}`
                );
            }
        });

        this.toggle = new Array<{ toggle: boolean; children: boolean[] }>(
            this.sidenavItems$.length
        );
        for (let i = 0; i < this.toggle.length; i++) {
            this.toggle[i] = { toggle: index === i, children: [] };
        }

        this.sidenavItems$.forEach((item: SidenavItem, i: number) => {
            if ('children' in item) {
                //this.toggle[i].children = [];
                for (let j = 0; j < item.children.length; j++) {
                    this.toggle[i].children.push(
                        index === i && childIndex === j
                    );
                }
            }
        });
    }

    /**
     * Returns true if the current URL ends with the route in the given
     * SidenavItem. Used to determine when to add the selected-list-item
     * class to a mat-list-item in the sidenav.
     *
     * @param sidenavItem The sidenav item to test against the current URL.
     * @returns true if the current URL ends with the route in the given SidenavItem.
     */
    isActive(sidenavItem: SidenavItem, parent?: SidenavItem): boolean {
        if ('route' in sidenavItem) {
            // remove './' from beggining of the route to avoid issues comparing
            // sidenav route with router.url
            const filteredRoute = sidenavItem.route.filter(
                (it: any) => it !== './'
            );
            // join filtered route parts
            const route = filteredRoute.join('/');

            if (route === '') {
                return this.router.url === '/';
            } else if (!sidenavItem.queryParams) {
                // if url includes route with '/' at end this allows sidenav to
                // be highlighted for child routes from things like tabs and
                // prevents possible multiple sidenav items from getting
                // highlighted in case they have similar routes; checking for
                // endsWith ensures items without child routes are highlighted
                // as well
                return (
                    this.router.url === route ||
                    this.router.url.includes(`/${route}/`) ||
                    this.router.url.endsWith(`/${route}`)
                );
            } else {
                const currentRoute = this.router.url.slice(
                    0,
                    this.router.url.indexOf('?')
                );
                return (
                    (currentRoute === route || currentRoute === `/${route}`) &&
                    this.compareMaps(this.queryParams, sidenavItem.queryParams)
                );
            }
        } else {
            return false;
        }
    }

    /**
     * Returns true if the sidenav item associated with the given index in the
     * toggle property is toggled. NOTE: toggling is disabled for rail sidenav
     * when it is collapsed; there is not enough space to render children in
     * this case, so prevent children from being rendered here (probably
     * shouldn't have children with rail sidenav, but nothing preventing that
     * for now...).
     *
     * @param i The index of the sidenav item in the toggle property.
     * @returns True if the sidenav item is toggled.
     */
    isToggled(i: number): boolean {
        if (this.toggle && this.toggle[i]) {
            return (
                (this.mode !== 'rail' ||
                    (this.mode === 'rail' && this.isExpanded)) &&
                this.toggle[i].toggle
            );
        } else {
            return false;
        }
    }

    /**
     * Returns true if the child sidenav item associated with the given parent
     * index and child index in the toggle property is toggled.
     *
     * @param i The index of the parent sidenav item.
     * @param iChild The index of the child sidenav item.
     * @returns True if the child sidenav item is toggled.
     */
    isChildToggled(i: number, iChild: number) {
        const children = this.toggle[i].children;
        if (children && children[iChild]) {
            return children[iChild];
        } else {
            return false;
        }
    }

    /**
     * Navigates to the route of the given sidenavItem (if it exists).
     *
     * @param index The sidenav item selected.
     */
    select(index: number): void {
        const sidenavItem = this.sidenavItems$[index];
        if ('route' in sidenavItem) {
            if (sidenavItem.queryParams) {
                this.router.navigate(sidenavItem.route, {
                    queryParams: sidenavItem.queryParams
                });
            } else {
                this.router.navigate(sidenavItem.route);
            }
        } else if (this.toggle[index]) {
            this.toggle[index].toggle = !this.toggle[index].toggle;
        }
    }

    /**
     * Navigates to the route of the given child sidenav item.
     *
     * @param index The index of the parent.
     * @param childIndex The index of the child.
     */
    selectChild(index: number, childIndex: number) {
        const sidenavItem = this.sidenavItems$[index];
        if ('children' in sidenavItem) {
            const children = sidenavItem.children;
            const child = children[childIndex];
            if ('route' in child) {
                if (child.route && child.queryParams) {
                    this.router.navigate(child.route, {
                        queryParams: child.queryParams
                    });
                } else if (child.route) {
                    this.router.navigate(child.route);
                }
            } else {
                const gChildren = child.children;
                const toggleChildren = this.toggle[index].children;
                if (gChildren && toggleChildren) {
                    toggleChildren[childIndex] = !toggleChildren[childIndex];
                }
            }
        }
    }

    /**
     * Navigates to the route of the given grandchild.
     *
     * @param index The index of the parent.
     * @param childIndex The index of the child.
     * @param grandChildIndex The index of the grandchild.
     */
    selectGrandChild(
        index: number,
        childIndex: number,
        grandChildIndex: number
    ) {
        const parent = this.sidenavItems$[index];
        if ('children' in parent) {
            const children = parent.children;
            const child = children[childIndex];
            if ('children' in child) {
                const gChildren = child.children;
                const gChild = gChildren[grandChildIndex];
                if ('route' in gChild) {
                    if (gChild.queryParams) {
                        this.router.navigate(gChild.route, {
                            queryParams: gChild.queryParams
                        });
                    } else {
                        this.router.navigate(gChild.route);
                    }
                }
            }
        }
    }

    /**
     * Compares the given maps and returns true if they are equal. The given
     * maps are equal if they have the same keys and associated values.
     *
     * @param obj1 A map to compare.
     * @param obj2 Another map to compare.
     * @returns True if the given maps are equal.
     */
    compareMaps(obj1: any, obj2: any) {
        const keys1 = Object.keys(obj1),
            keys2 = Object.keys(obj2);
        let match = true;
        if (keys1.length !== keys2.length) return false;
        for (const key of keys1) {
            // handle case obj1[key] is boolean (which are treated as strings
            // in queryParams); TODO probably handle case for when obj1[key] is
            // number... any other cases? parameters with spaces?
            const boolVal = obj1[key].toLowerCase() === 'true';
            if (obj1[key] !== obj2[key] && boolVal !== obj2[key]) {
                match = false;
                break;
            }
        }
        return match;
    }
}
