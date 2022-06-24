import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { SidenavItem } from '@ngx-material-dashboard/widgets';

const routeSidenavItems: { [route: string]: SidenavItem[] } = {
    'widgets': [
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

    sidenavItems: SidenavItem[] = [];
    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.url.subscribe(() => {
            if (this.router.url.includes('widgets')) {
                this.sidenavItems = routeSidenavItems['widgets'];
            }
        });
    }
}
