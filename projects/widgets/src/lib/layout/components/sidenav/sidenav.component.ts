import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SidenavItem } from '../../interfaces/sidenav.interface';

@Component({
    selector: 'ngx-material-dashboard-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy, OnInit {

    /** The array of items to display in the sidenav. */
    @Input() sidenavItems: SidenavItem[] = [];
    faAngleDown: IconDefinition = faAngleDown;
    faAngleRight: IconDefinition = faAngleRight;
    queryParams: any = {};
    sub: Subscription;
    toggle: { toggle: boolean, children?: boolean[] }[] = [];

    constructor(private route: ActivatedRoute, private router: Router) {
        this.sub = new Subscription();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        this.initSidenavItems();
        const queryParamsSub = this.route.queryParams.subscribe(params => {
            this.queryParams = params;
        });
        this.sub.add(queryParamsSub);

        // listen for changes in route and re-initialize sidenav items in case
        // toggles should change
        const routerSub = this.router.events.subscribe(() => {
            this.initSidenavItems();
        });
        this.sub.add(routerSub);
    }

    private initSidenavItems() {
        let childIndex: number;
        const index = this.sidenavItems.findIndex((item: SidenavItem) => {
            if (item.children !== undefined) {
                childIndex = item.children.findIndex((childItem: SidenavItem) => {
                    if (childItem.route) {
                        return this.router.url.includes(`/${childItem.route.join('/').replace('./', '')}`);
                    } else {
                        return this.router.url.includes(`/${childItem.selector}`);
                    }
                });

                if (childIndex >= 0) {
                    return true;
                } else if (item.route) {
                    return this.router.url.includes(`/${item.route.join('/').replace('./', '')}`);
                } else {
                    return this.router.url.includes(`/${item.selector}`);
                }
            } else if (item.route) {
                return this.router.url.includes(`/${item.route.join('/').replace('./', '')}`);
            } else {
                return this.router.url.includes(`/${item.selector}`);
            }
        });

        this.toggle = new Array<{toggle: boolean}>(this.sidenavItems.length);
        for (let i = 0; i < this.toggle.length; i++) {
            this.toggle[i] = { toggle: index === i };
        }

        this.sidenavItems.forEach((item: SidenavItem, i: number) => {
            if (item.children !== undefined) {
                this.toggle[i].children = [];
                for (let j = 0; j < item.children.length; j++) {
                    this.toggle[i].children?.push(index === i && childIndex === j);
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
        if (sidenavItem.route) {
            // remove './' from beggining of the route to avoid issues comparing
            // sidenav route with router.url
            const filteredRoute = sidenavItem.route.filter((it: any) => it !== './');
            // join filtered route parts
            let route = filteredRoute.join('/');

            if (route === '') {
                return this.router.url === '/';
            } else if (!sidenavItem.queryParams) {
                // if url includes route with '/' at end this allows sidenav to
                // be highlighted for child routes from things like tabs and
                // prevents possible multiple sidenav items from getting
                // highlighted in case they have similar routes
                return this.router.url === route || this.router.url.includes(`/${route}`);
            } else {
                return this.router.url.slice(0, this.router.url.indexOf('?')) === route && this.compareMaps(this.queryParams, sidenavItem.queryParams);
            }
        } else {
            return false;
        }
    }

    isToggled(i: number): boolean {
        if (this.toggle && this.toggle[i]) {
            return this.toggle[i].toggle;
        } else {
            return false;
        }
    }

    isChildToggled(i: number, iChild: number) {
        const children = this.toggle[i].children;
        if (children) {
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
        const sidenavItem = this.sidenavItems[index];
        if (sidenavItem.route) {
            if (sidenavItem.queryParams) {
                this.router.navigate(sidenavItem.route, { queryParams: sidenavItem.queryParams });
            } else {
                this.router.navigate(sidenavItem.route);
            }
        } else {
            this.toggle[index].toggle = !this.toggle[index].toggle;
        }
    }

    selectChild(index: number, childIndex: number) {
        const children = this.sidenavItems[index].children;
        if (children) {
            if (children[childIndex].route) {
                const child = children[childIndex];
                if (child.route && child.queryParams) {
                    this.router.navigate(child.route, { queryParams: child.queryParams });
                } else if (child.route) {
                    this.router.navigate(child.route);
                }
            } else {
                const gChildren = children[childIndex].children;
                const toggleChildren = this.toggle[index].children;
                if (gChildren && toggleChildren) {
                    toggleChildren[childIndex] = !toggleChildren[childIndex];
                }
            }
        }
    }

    selectGrandChild(index: number, childIndex: number, grandChildIndex: number) {
        const children = this.sidenavItems[index].children;
        if (children) {
            const gChildren = children[childIndex].children;
            if (gChildren) {
                const gChild = gChildren[grandChildIndex];
                if (gChild.route && gChild.queryParams) {
                    this.router.navigate(gChild.route, { queryParams: gChild.queryParams });
                } else if (gChild.route) {
                    this.router.navigate(gChild.route);
                }
            }
        }
    }

    compareMaps(obj1: any, obj2: any) {
        const keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);
        let match = true;
        if(keys1.length !== keys2.length) return false;
        for(const key of keys1) { 
            if(obj1[key] !== obj2[key]) {
                match = false; 
                  break; 
            }
        }
        return match;
      }
}
