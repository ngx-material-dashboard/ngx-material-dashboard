import { AfterViewInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { CompactPagedCollectionComponent } from '../../../collection/components/compact-paged-collection/compact-paged-collection.component';
import { RemoteDataSource } from '../../../services/remote-data-source.service';
import { Button } from '../../../shared/interfaces/button.interface';
import { SelectionService } from '../../shared/services/selection.service';

@Component({
    selector: 'ngx-material-dashboard-compact-paged-table',
    templateUrl: './compact-paged-table.component.html',
    styleUrls: ['./compact-paged-table.component.css']
})
export class CompactPagedTableComponent<T extends JsonModel>
    extends CompactPagedCollectionComponent<T>
    implements AfterViewInit {

    /** A reference to the columns defined; allows user to define columns inside selector for this component. */
    @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;
    /** Columns to display in the table. */
    @Input() displayedColumns: string[] = ['select', 'actions'];
    /** A reference to the table in the template. */
    @ViewChild(MatTable, { static: true }) table!: MatTable<T>;
    @ViewChild(MatSort) sort!: MatSort;

    // set sort(sort: MatSort) {
    //     this.sort$ = sort;
    //     this.initPageSub();
    //     this.initSortSubs();
    // }

    /**
     * Creates a new PagedTableComponent. Note that the matSort directive is
     * included in the constructor per the answer provided at the stackoverflow
     * question here: https://stackoverflow.com/a/58548837. Apparently there is
     * an issue accessing directives included directly in components and the
     * only way to access them is with DI.
     * 
     * @param selectionService Service used to handle when user selects rows.
     */
    constructor(selectionService: SelectionService<T>) {
        super(selectionService);
        // this.sort = matSort;
        //this.tableButtonClick = new EventEmitter<ButtonClick>();
    }

    override initSortSubs(): void {
        if (this.sort) {
            const sortSub = this.sort.sortChange.subscribe((sort: Sort) => {
                if (this.dataSource$ instanceof RemoteDataSource) {
                    this.dataSource$.sort = sort.active;
                    this.dataSource$.order = sort.direction;
                    this.dataSource$.pageIndex = 0;
                    this.dataSource$.refresh();
                } else {
                    super.initSortSubs();
                }
            });
            this.sub.add(sortSub);
        }
    }

    /**
     * After the <ng-content> has been initialized, the column definitions defined
     * in the HTML where this component is referenced are available. Once they are
     * available we need to add the definitions to the table manually so the MatTable
     * is aware of all additional columns included.
     */
    ngAfterContentInit(): void {
        this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
        //this.dataSource$.sort = this.sort$;
    }

    // override ngAfterViewInit(): void {
    //     super.ngAfterViewInit();
        
    // }
}