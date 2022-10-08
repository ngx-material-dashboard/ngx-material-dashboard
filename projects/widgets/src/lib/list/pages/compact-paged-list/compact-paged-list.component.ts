import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { CompactPagedCollectionComponent } from '../../../collection/components/compact-paged-collection/compact-paged-collection.component';
import { RemoteDataSource } from '../../../services/remote-data-source.service';
import { SelectionService } from '../../../table/shared/services/selection.service';

@Component({
    selector: 'ngx-material-dashboard-compact-paged-list',
    templateUrl: './compact-paged-list.component.html',
    styleUrls: ['./compact-paged-list.component.css']
})
export class CompactPagedListComponent <T extends JsonModel>
    extends CompactPagedCollectionComponent<T> {

    constructor(
        selectionService: SelectionService<T>,
    ) {
        super(selectionService);
        if (!this.dataSource$) {
            this.dataSource$ = new MatTableDataSource();
            this.initDataSource([]);
        }
        this.selection = new SelectionModel<T>(this.multiple$, []);
        this.sub = new Subscription();
        // this.collectionButtonClick = new EventEmitter<ButtonClick>();
    }

    override initDataSource(data: T[] | RemoteDataSource<T>): void {
        super.initDataSource(data);
        if (data instanceof RemoteDataSource) {
            this.initSortSubs();
        } else {
            // this.dataSource$.sort = this.sort$;
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        if (this.dataSource$ instanceof RemoteDataSource) {
            this.initPageSub();
        }

        this.initSortSubs();
    }
}
