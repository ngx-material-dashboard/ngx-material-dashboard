/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SidenavItem } from '@ngx-material-dashboard/widgets';
import { Subscription } from 'rxjs';

const routeSidenavItems: any = {
    'base-json': [
        { route: ['base-json'], selector: 'base-json', text: 'base-json' },
        { route: ['json-api'], selector: 'json-api', text: 'json-api' },
        { route: ['json'], selector: 'json', text: 'json' }
    ],
    'json-api': [
        { route: ['base-json'], selector: 'base-json', text: 'base-json' },
        { route: ['json-api'], selector: 'json-api', text: 'json-api' },
        { route: ['json'], selector: 'json', text: 'json' }
    ],
    json: [
        { route: ['base-json'], selector: 'base-json', text: 'base-json' },
        { route: ['json-api'], selector: 'json-api', text: 'json-api' },
        { route: ['json'], selector: 'json', text: 'json' }
    ],
    testing: [
        {
            route: ['testing', 'elements'],
            selector: 'elements',
            text: 'elements'
        },
        {
            route: ['testing', 'fixtures'],
            selector: 'fixtures',
            text: 'fixtures'
        },
        { route: ['testing', 'mocks'], selector: 'mocks', text: 'mocks' },
        { route: ['testing', 'models'], selector: 'models', text: 'models' }
    ],
    widgets: [
        { route: ['widgets', 'alert'], selector: 'alert', text: 'Alert' },
        {
            route: ['widgets', 'collection'],
            selector: 'collection',
            text: 'Collection'
        },
        { route: ['widgets', 'dialog'], selector: 'dialog', text: 'Dialog' },
        { route: ['widgets', 'form'], selector: 'form', text: 'Form' },
        { route: ['widgets', 'grid'], selector: 'grid', text: 'Grid' },
        { route: ['widgets', 'layout'], selector: 'layout', text: 'Layout' },
        { route: ['widgets', 'list'], selector: 'list', text: 'List' },
        { route: ['widgets', 'table'], selector: 'table', text: 'Table' },
        { route: ['widgets', 'toolbar'], selector: 'toolbar', text: 'Toolbar' }
    ]
};

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild(MatSidenavContainer) sidenav!: MatSidenavContainer;
    sidenavItems: SidenavItem[] = [];
    private sub: Subscription = new Subscription();

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private router: Router
    ) {}

    ngAfterViewInit(): void {
        this.removeHidden(
            this.elementRef.nativeElement.parentElement?.parentElement
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        this.setSidenavItems();
        const sub = this.router.events.subscribe(() => {
            this.setSidenavItems();
        });
        this.sub.add(sub);
    }

    setSidenavItems() {
        Object.keys(routeSidenavItems).forEach((key: string) => {
            if (this.router.url.includes(`/${key}`)) {
                this.sidenavItems = routeSidenavItems[key];
            }
        });
    }

    removeHidden(el: HTMLElement | null | undefined): void {
        let parent = el?.querySelector('.sticky')?.parentElement;

        while (parent) {
            const hasOverflow = getComputedStyle(parent).overflow;
            if (hasOverflow !== 'visible' && hasOverflow !== '') {
                parent.style.overflow = 'visible';
            }
            parent = parent.parentElement;
        }
    }
}
