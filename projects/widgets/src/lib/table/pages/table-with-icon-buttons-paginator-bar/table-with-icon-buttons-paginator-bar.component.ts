import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { SelectionService } from '../../../shared/services/selection.service';
import { PagedCollectionWithIconToolbarComponent } from '../../../collection/components/paged-collection-with-icon-toolbar/paged-collection-with-icon-toolbar.component';
import { TableComponent } from '../../components/table/table.component';

@Component({
    selector: 'ngx-material-dashboard-table-with-icon-buttons-paginator-bar',
    templateUrl: './table-with-icon-buttons-paginator-bar.component.html',
    styleUrls: ['./table-with-icon-buttons-paginator-bar.component.css']
})
export class TableWithIconButtonsPaginatorBarComponent<T extends JsonModel>
    extends PagedCollectionWithIconToolbarComponent<T> implements AfterContentInit {

    /** Columns to display in the table. */
    @Input() displayedColumns: string[] = ['select', 'actions'];
    /** A reference to the table in the template. */
    @ContentChild(TableComponent) table!: TableComponent<T>;
    /** A reference to the sort defined for the component. */
    override sort$: MatSort;

    constructor(matSort: MatSort, selectionService: SelectionService<T>) {
        super(selectionService);
        this.sort$ = matSort;
    }

    ngAfterContentInit(): void {
        this.dataSource = this.table.dataSource$;
    }
}
