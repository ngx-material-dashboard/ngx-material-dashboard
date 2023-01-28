import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SidenavItem } from '@ngx-material-dashboard/widgets';

const routeSidenavItems: any = {
    'base-json': [
        { route: ['./', 'base-json'], selector: 'base-json', text: 'BaseJson' },
        { route: ['./', 'json-api'], selector: 'json-api', text: 'JsonApi' },
        { route: ['./', 'json'], selector: 'json', text: 'Json' }
    ],
    'json-api': [
        { route: ['./', 'base-json'], selector: 'base-json', text: 'BaseJson' },
        { route: ['./', 'json-api'], selector: 'json-api', text: 'JsonApi' },
        { route: ['./', 'json'], selector: 'json', text: 'Json' }
    ],
    json: [
        { route: ['./', 'base-json'], selector: 'base-json', text: 'BaseJson' },
        { route: ['./', 'json-api'], selector: 'json-api', text: 'JsonApi' },
        { route: ['./', 'json'], selector: 'json', text: 'Json' }
    ],
    testing: [
        {
            route: ['testing', 'elements'],
            selector: 'elements',
            text: 'elements'
        }
    ],
    widgets: [
        {
            route: ['./widgets', 'collection'],
            selector: 'collection',
            text: 'Collection'
        },
        { route: ['./widgets', 'dialog'], selector: 'dialog', text: 'Dialog' },
        { route: ['./widgets', 'form'], selector: 'form', text: 'Form' },
        { route: ['./widgets', 'grid'], selector: 'grid', text: 'Grid' },
        { route: ['./widgets', 'layout'], selector: 'layout', text: 'Layout' },
        { route: ['./widgets', 'list'], selector: 'list', text: 'List' },
        { route: ['./widgets', 'table'], selector: 'table', text: 'Table' },
        {
            route: ['./widgets', 'toolbar'],
            selector: 'toolbar',
            text: 'Toolbar'
        }
    ]
};

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnInit {
    @ViewChild(MatSidenavContainer) sidenav!: MatSidenavContainer;
    sidenavItems: SidenavItem[] = [];

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private router: Router
    ) {}

    ngAfterViewInit(): void {
        this.removeHidden(
            this.elementRef.nativeElement.parentElement?.parentElement
        );
    }
    ngOnInit(): void {
        this.setSidenavItems();
        this.router.events.subscribe(() => {
            this.setSidenavItems();
        });
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
