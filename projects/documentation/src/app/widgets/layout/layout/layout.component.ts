import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { SidenavItem } from '@ngx-material-dashboard/widgets';

const routeSidenavItems: { [route: string]: SidenavItem[] } = {
    'json': [
        { route: ['./json', 'base-json'], text: 'base-json', selector: 'base-json'},
        { route: ['./json', 'json'], text: 'json', selector: 'json' },
        { route: ['./json', 'json-api'], text: 'json-api', selector: 'json-api'}
    ],
    'widgets': [
        { route: ['./widgets', 'abstract-paged-table-with-toolbar'], text: 'AbstractPagedTableWithToolbar', selector: 'abstract-paged-table-with-toolbar'},
        { route: ['./widgets', 'paged-table'], text: 'PagedTable', selector: 'paged-table' },
        { route: ['./widgets', 'paged-table-with-toolbar'], text: 'PagedTableWithToolbar', selector: 'paged-table-with-toolbar' }
    ]
};

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    @ViewChild(MatSidenavContainer) sidenav!: MatSidenavContainer; 
    sidenavItems: SidenavItem[] = [];

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.setSidenavItems();
        this.router.events.subscribe((e) => {
           this.setSidenavItems();
        });
    }

    setSidenavItems() {
        if (this.router.url.includes('widgets')) {
            this.sidenavItems = routeSidenavItems['widgets'];
        } else if (this.router.url.includes('json')) {
            this.sidenavItems = routeSidenavItems['json'];
        }
    }
}
