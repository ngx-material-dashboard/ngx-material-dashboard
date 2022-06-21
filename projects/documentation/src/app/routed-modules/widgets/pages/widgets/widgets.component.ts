import { Component, OnInit } from '@angular/core';
import { SidenavItem } from '@ngx-material-dashboard/widgets';

@Component({
    selector: 'app-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

    sidenavItems: SidenavItem[] = [
        { route: ['paged-table'], text: 'PagedTable', selector: 'paged-table' },
        { route: ['paged-table-with-toolbar'], text: 'PagedTableWithToolbar', selector: 'paged-table-with-toolbar' }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
