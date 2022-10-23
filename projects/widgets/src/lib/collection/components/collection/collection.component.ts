import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { RemoteDataSource } from '../../../shared/services/remote-data-source.service';

/**
 * The `Collection` defines the most basic properties needed to render a
 * collection. This works with both local and remote data.
 */
@Component({
    template: ''
})
export class CollectionComponent<T extends JsonModel> {

    /**
     * Setter for the dataSource on the component. Initializes the models to
     * render in the collection based on the latest data defined from the
     * dataSource.
     */
    @Input() set dataSource(dataSource: RemoteDataSource<T> | MatTableDataSource<T>) {
        this.dataSource$ = dataSource;
        // subscribe to connect observable to get filtered, paged, sorted
        // data; see below github issue comment
        // https://github.com/angular/components/issues/9419#issuecomment-359594686
        this.dataSource$.connect().subscribe((res: T[]) => {
            this.models = res;
        });
    }
    dataSource$!: RemoteDataSource<T> | MatTableDataSource<T>;
    /** The models to display in collection. */
    models: T[] = [];
}
