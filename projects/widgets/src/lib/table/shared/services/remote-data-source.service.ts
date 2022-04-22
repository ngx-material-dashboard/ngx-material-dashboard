import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { JsonDatastore, JsonApiQueryData, ModelType, JsonModel } from '@ngx-material-dashboard/base-json';
export class RemoteDataSource<T extends JsonModel> extends DataSource<T> {

    /** The data to display in the table. */
    data: T[];
    /** The filter to apply when loading data. */
    filter?: {};
    /** The custom headers to include with the request. */
    headers?: HttpHeaders;
    /** Any relationships to include with the request. */
    include?: string;
    /** Indicates when connection to load data is active. */
    loading: Observable<boolean>;
    /** The order to sort the data */
    order?: string;
    /** The page of data to get. */
    pageIndex?: number;
    /** The number of results to get. */
    pageSize?: number;
    /** The column to sort the data. */
    sort?: string;
    /** The total number of items in the table. */
    total: number;
    /** The total number of pages. */
    totalPages?: number;
    /** The model type for the datastore. */
    // type: ModelType<JsonModel>;
    /** Subject for dataSource connection. */
    protected dataSubject: BehaviorSubject<T[]>;
    /** Subject for when connection to load data is active. */
    protected loadingSubject: BehaviorSubject<boolean>;

    constructor(
        private modelType: ModelType<T>,
        private baseModelService: JsonDatastore
    ) {
        super();

        this.data = [];
        this.loadingSubject = new BehaviorSubject<boolean>(false);
        this.loading = this.loadingSubject.asObservable();
        this.dataSubject = new BehaviorSubject<T[]>([]);
        this.total = 0;
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        // this.logger.info("RemoteDataSource: Connecting data source");
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        // this.logger.info("RemoteDataSource: Disconnecting data source");
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

    /**
     * Loads the data for the table.
     *
     * @param filter The filter to apply when loading the data.
     * @param sort The column to sort the data.
     * @param order The order to sort the data ("asc" or "desc").
     * @param pageIndex The page of data to get.
     * @param pageSize The number of results to get.
     */
    load(
        filter: {} = {},
        sort: string = 'id',
        order: string = 'asc',
        pageIndex: number = 0,
        pageSize: number = 20,
        include = '',
        headers: HttpHeaders = new HttpHeaders()
    ): void {
        this.filter = filter;
        this.sort = sort;
        this.order = order;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.include = include;
        this.headers = headers;

        // paged query for models that match the given filter and order results
        this.baseModelService.findAll(
            this.modelType,
            {
                page_size: pageSize.toString(),
                page: pageIndex.toString(),
                filter,
                sort,
                order,
                include
            }
        ).subscribe((res: JsonApiQueryData<T>) => {
            // update meta data (totalPages based on total results and pageSize)
            this.total = res.getMeta().meta.total;
            if (this.pageSize) {
                this.totalPages = this.total / this.pageSize;
            }

            // update data for source with models returned from query
            this.data = res.getModels();
            this.dataSubject.next(this.data as T[]);
        });
    }

    /**
     * The orderBy parameter includes the direction and column to sort; if the
     * order is desc, then 'ORDERBYDESC' is used. 'ORDERBY' defaults to
     * ascending order.
     * TODO allow sort and order by multiple columns; should just be concatenating
     * additional parameters so something like '^ORDERBYname^ORDERBYcreated_on'.
     */
    private get orderBy(): string {
        return `^ORDERBY${ this.order === 'desc' ? 'DESC' : '' }${ this.sort }`;
    }

    /**
     * Reload the data using current paging and query parameters.
     */
    refresh(): void {
        this.load(this.filter, this.sort, this.order, this.pageIndex, this.pageSize, this.include, this.headers);
    }
}
