import { AfterViewInit, Component, ContentChild, Input } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { PagedCollectionWithRaisedButtonToolbarComponent } from '../../../collection/components/paged-collection-with-raised-button-toolbar/paged-collection-with-raised-button-toolbar.component';
import { PagedTableComponent } from '../paged-table/paged-table.component';

@Component({
    selector: 'ngx-material-dashboard-paged-table-with-raised-buttons-bar',
    templateUrl: './paged-table-with-raised-buttons-bar.component.html',
    styleUrls: ['./paged-table-with-raised-buttons-bar.component.css']
})
export class PagedTableWithRaisedButtonsBarComponent<T extends JsonModel> 
    extends PagedCollectionWithRaisedButtonToolbarComponent<T> implements AfterViewInit {

    /** Columns to display in the table. */
    @Input() displayedColumns: string[] = ['select', 'actions'];
    /** A reference to the table in the template. */
    @ContentChild('pagedCollection') table!: PagedTableComponent<T>;

    override ngAfterViewInit(): void {
        this.paginator$ = this.table.paginator$;
        this.sort$ = this.table.sort$;
        this.dataSource = this.table.dataSource$;
        super.ngAfterViewInit();
    }
}
