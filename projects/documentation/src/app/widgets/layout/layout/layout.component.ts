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
            text: 'elements',
            selector: 'elements',
            children: [
                {
                    route: ['./testing', 'elements', 'button'],
                    selector: 'button',
                    text: 'Button'
                },
                {
                    route: ['./testing', 'elements', 'checkbox'],
                    selector: 'checkbox',
                    text: 'Checkbox'
                },
                {
                    route: ['./testing', 'elements', 'collection'],
                    selector: 'collection',
                    text: 'Collection'
                },
                {
                    route: [
                        './testing',
                        'elements',
                        'icon-buttons-with-paginator-bar'
                    ],
                    selector: 'icon-buttons-with-paginator-bar',
                    text: 'IconButtonsWithPaginatorBar'
                },
                {
                    route: ['./testing', 'elements', 'menu'],
                    selector: 'menu',
                    text: 'Menu'
                },
                {
                    route: ['./testing', 'elements', 'page'],
                    selector: 'page',
                    text: 'Page'
                },
                {
                    route: ['./testing', 'elements', 'paged-collection'],
                    selector: 'paged-collection',
                    text: 'PagedCollection'
                },
                {
                    route: [
                        './testing',
                        'elements',
                        'paged-collection-with-toolbar'
                    ],
                    selector: 'paged-collection-with-toolbar',
                    text: 'PagedCollectionWithToolbar'
                },
                {
                    route: ['./testing', 'elements', 'paged-table'],
                    selector: 'paged-table',
                    text: 'PagedTable'
                },
                {
                    route: [
                        './testing',
                        'elements',
                        'paged-table-with-toolbar'
                    ],
                    selector: 'paged-table-with-toolbar',
                    text: 'PagedTableWithToolbar'
                },
                {
                    route: ['./testing', 'elements', 'paginator'],
                    selector: 'paginator',
                    text: 'Paginator'
                },
                {
                    route: ['./testing', 'elements', 'select'],
                    selector: 'select',
                    text: 'Select'
                },
                {
                    route: ['./testing', 'elements', 'sidenav'],
                    selector: 'sidenav',
                    text: 'Sidenav'
                },
                {
                    route: ['./testing', 'elements', 'table'],
                    selector: 'table',
                    text: 'Table'
                },
                {
                    route: ['./testing', 'elements', 'toolbar'],
                    selector: 'toolbar',
                    text: 'Toolbar'
                },
                {
                    route: ['./testing', 'elements', 'toolbar-header'],
                    selector: 'toolbar-header',
                    text: 'ToolbarHeader'
                }
            ]
        },
        {
            text: 'models',
            selector: 'models',
            children: [
                {
                    route: ['./testing', 'models', 'task'],
                    selector: 'task',
                    text: 'Task'
                }
            ]
        },
        {
            text: 'services',
            selector: 'services',
            children: [
                {
                    route: ['./testing', 'services', 'datastore'],
                    selector: 'datastore',
                    text: 'Datastore'
                }
            ]
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
