import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { RemoteDataSource } from '../../../services/remote-data-source.service';

@Component({
    template: ''
})
export class AbstractPagedComponent<T extends JsonModel> implements OnInit {

    /**
     * Setter for paged data. This re-initializes the dataSource everytime data changes.
     * TODO: only re-initialize when necessary; just update data otherwise
     */
     @Input() set data(data: T[] | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    /** The dataSource for the paged data. */
    @Input() set dataSource(data: T[] | RemoteDataSource<T> | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    @Input() modelType: string = 'data';
    /** The max number of pages to display in the paginator. Defaults to 10 (does not include 'First', 'Prev', 'Next', 'Last'). */
    @Input() maxPages = 10;
    /** Number of items to display on a page. Defaults to 25. */
    @Input() pageSize = 25;
    /** A reference to the paginator in the template. */
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource$!: RemoteDataSource<T> | MatTableDataSource<T>;
    sub: Subscription;

    @ContentChild('model', { static: false }) template!: TemplateRef<any>;

    constructor() {
        this.sub = new Subscription();
    }

    ngOnInit(): void {
    }

    initDataSource(data: T[] | RemoteDataSource<T>): void {
        if (data instanceof RemoteDataSource) {
            this.dataSource$ = data;
            this.initPageSub();
        } else {
            this.dataSource$ = new MatTableDataSource(data);
            this.dataSource$.paginator = this.paginator;
        }
    }

    initPageSub(): void {
        if (this.paginator) {
            const pageSub = this.paginator.page.subscribe((page: PageEvent) => {
                if (this.dataSource$ instanceof RemoteDataSource) {
                    // calculate offset using pageSize and pageIndex from PageEvent
                    this.dataSource$.pageIndex = page.pageIndex;
                    this.dataSource$.pageSize = page.pageSize;
                    this.dataSource$.refresh();
                }
            });
            this.sub.add(pageSub);
        }
    }

}
