/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import {
    JsonDatastore,
    JsonApiQueryData,
    ModelType,
    JsonModel
} from '@ngx-material-dashboard/base-json';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';

/**
 * A wrapper for the `DataSource` class that provides a basic way to sort,
 * filter, paginate, and retrieve data from your main data source. Ultimately
 * this relies on an implementation of the `JsonDatastore` which is where the
 * functionality to filter, paginate, and retreive data comes from.
 *
 * There are two main functions to use to sort, filter, paginate, and retrieve
 * data. The `load` function includes parameters to sort, filter, paginate, and
 * retrieve data. All parameters are optional, so if you call `load()` without
 * any parameters, then you will get the broadest data set without any filter,
 * with the default sort of id values in ascending order, and with default
 * number of 25 results. The other function is `refresh()` which just calls
 * `load` using the last parameter values used.
 *
 * #### Basic Usage Example
 * ```typescript
 * class RemoteDataSourceUsageExample<T extends JsonModel> {
 *
 *     dataSource: RemoteDataSource<T>;
 *
 *     constructor(
 *         @Inject(JsonModel) private modelType: ModelType<T>,
 *         private jsonApiService: JsonDatastore
 *     ) {
 *         this.dataSource = new RemoteDataSource(this.modelType, this.jsonApiService);
 *     }
 *
 *     loadData(): void {
 *         this.dataSource.load();
 *     }
 *
 *     refresh(): void {
 *         this.dataSource.refresh();
 *     }
 * }
 *
 * ```
 *
 * > NOTE: The `RemoteDataSource` can be used with any component that paginates
 * > data, whether it is a grid, list, table, or any other kind of paged
 * > component that I can't think of right now.
 */
export class RemoteDataSource<T extends JsonModel> extends DataSource<T> {
    /** The paginatore associated with component where this data source is used. */
    private paginator$?: MatPaginator;
    /** The sorter associated with component where this data source is used. */
    private sort$?: MatSort;
    /** Subject for dataSource connection. */
    protected dataSubject: BehaviorSubject<T[]>;
    /** Subject for when connection to load data is active. */
    protected loadingSubject: BehaviorSubject<boolean>;
    /** The active field to sort on. */
    active?: string;
    /** The data to display in the collection. */
    data: T[];
    /** Observable for data in source. */
    data$: Observable<T[]>;
    /** The direction of the sort (asc or desc). */
    direction?: SortDirection;
    /** The filter to apply when loading data. */
    filter?: any;
    /** The custom headers to include with the request. */
    headers?: HttpHeaders;
    /** Any relationships to include with the request. */
    include?: string;
    /** Indicates when connection to load data is active. */
    loading: Observable<boolean>;
    /** The page of data to get. */
    pageIndex?: number;
    /** The number of results to get. */
    pageSize?: number;
    /** A custom map of params to use for query, set using loadParamMap. */
    params: any;
    /** The total number of items in the table. */
    total: number;
    /** The total number of pages. */
    totalPages?: number;

    /**
     * Returns the paginator for the data source.
     */
    get paginator(): MatPaginator | undefined {
        return this.paginator$;
    }

    /**
     * Sets the paginator for the data source and the subscription for page
     * events so the data source is updated when user changes page or page
     * size.
     */
    set paginator(p: MatPaginator | undefined) {
        this.paginator$ = p;
        this.paginator$?.page.subscribe((next: PageEvent) => {
            this.pageIndex = next.pageIndex;
            this.pageSize = next.pageSize;
            this.refresh();
        });
    }

    /**
     * Returns the sort for the data source.
     */
    get sort(): MatSort | undefined {
        return this.sort$;
    }

    /**
     * Sets the sort for the data source and the subscription for sort events
     * so the data source is updated when the user changes the active sort
     * field or the direction.
     */
    set sort(s: MatSort | undefined) {
        this.sort$ = s;
        this.sort$?.sortChange.subscribe((next: Sort) => {
            this.active = next.active;
            this.direction = next.direction;
            this.refresh();
        });
    }

    constructor(
        private modelType: ModelType<T>,
        private baseModelService: JsonDatastore
    ) {
        super();

        this.data = [];
        this.loadingSubject = new BehaviorSubject<boolean>(false);
        this.loading = this.loadingSubject.asObservable();
        this.dataSubject = new BehaviorSubject<T[]>([]);
        this.data$ = this.dataSubject.asObservable();
        this.total = 0;
    }

    connect(collectionViewer?: CollectionViewer): Observable<T[]> {
        // this.logger.info("RemoteDataSource: Connecting data source");
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer?: CollectionViewer): void {
        // this.logger.info("RemoteDataSource: Disconnecting data source");
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

    /**
     * Loads the data for the collection. This does make a lot of assumptions
     * in the paged-based and sort/order strategies, and creates query
     * parameters like the following:
     *
     * {
     *      page_size: 20
     *      page: 0
     *      filter: { name: 'Stark' },
     *      sort: 'id',
     *      order: 'asc',
     *      include: 'relationship1,relationship2'
     * }
     *
     * If you want more control over the format of the query parameters, but
     * don't want to re-implement this entire class, then use loadParamMap.
     * You should use this method or the loadParamMap, but not both. Otherwise
     * refresh will not work as expected.
     *
     * @param filter The filter to apply when loading the data.
     * @param sort The column to sort the data.
     * @param order The order to sort the data ("asc" or "desc").
     * @param pageIndex The page of data to get.
     * @param pageSize The number of results to get.
     * @param include Comma separated list of relationships to include in results.
     * @param headers Custom header values.
     */
    load(
        filter: any = {},
        active: string = 'id',
        direction: SortDirection = 'asc',
        pageIndex: number = 0,
        pageSize: number = 20,
        include = '',
        headers: HttpHeaders = new HttpHeaders()
    ): void {
        this.filter = filter;
        this.active = active;
        this.direction = direction;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.include = include;
        this.headers = headers;

        const params = {
            page_size: pageSize.toString(),
            page: pageIndex.toString(),
            filter,
            sort: active,
            order: direction,
            include
        };

        // paged query for models that match the given filter and order results
        this.loadUtil(params);
    }

    /**
     * Loads the data for the collection using custom map of params. This
     * provides more control over the format of the parameters to include in
     * query requests without having to implement your own remote data source.
     * For example, if your server uses a different page-based strategy from
     * the one defined in the original load method.
     *
     * **NOTE: refresh will still work and be called using the given params.
     * You should use this method or the load, but not both. Otherwise refresh
     * will not work as expected.
     *
     * @param params Parameters to include in query (filter, paging, sorting).
     * @param headers Custom header values.
     */
    loadParamMap(params: any, headers: HttpHeaders = new HttpHeaders()) {
        this.headers = headers;
        this.params = params;
        this.loadUtil(params);
    }

    /**
     * Sends the HTTP request to load data for the collection.
     *
     * @param params Parameters to include in query (filter, paging, sorting).
     */
    private loadUtil(params: any) {
        this.baseModelService
            .findAll(this.modelType, params)
            .subscribe((res: JsonApiQueryData<T>) => {
                // update meta data (totalPages based on total results and pageSize)
                this.total = res.getMeta().meta.total;
                if (this.pageSize) {
                    this.totalPages = this.total / this.pageSize;
                }

                // update data for source with models returned from query
                this.data = res.getModels() as T[];
                this.dataSubject.next(this.data);
            });
    }

    /**
     * Reload the data using current paging and query parameters.
     */
    refresh(): void {
        if (this.params) {
            this.loadParamMap(this.params, this.headers);
        } else {
            this.load(
                this.filter,
                this.active,
                this.direction,
                this.pageIndex,
                this.pageSize,
                this.include,
                this.headers
            );
        }
    }
}
