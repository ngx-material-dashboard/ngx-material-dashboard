import { Component, ContentChildren, Input, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { CollectionComponent } from '../../../collection/components/collection/collection.component';
import { PagedCollectionComponent } from '../../../collection/components/paged-collection/paged-collection.component';
import { SelectionService } from '../../../shared/services/selection.service';

@Component({
    selector: 'ngx-material-dashboard-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent<T extends JsonModel>
    extends PagedCollectionComponent<T> {

    /** A reference to the columns defined; allows user to define columns inside selector for this component. */
    @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
    /** Columns to display in the table. */
    @Input() displayedColumns: string[] = ['select', 'actions'];
    /** A reference to the table in the template. */
    @ViewChild(MatTable, { static: true }) table!: MatTable<T>;

    /**
     * After the <ng-content> has been initialized, the column definitions defined
     * in the HTML where this component is referenced are available. Once they are
     * available we need to add the definitions to the table manually so the MatTable
     * is aware of all additional columns included.
     */
    ngAfterContentInit(): void {
        this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
    }
}
