import { HttpHeaders } from "@angular/common/http";
import { JsonApiModel } from "@ngx-material-dashboard/json-api";
import { RemoteDataSource } from "@ngx-material-dashboard/widgets";

/**
 * The RemoteDataSourceMock class is meant to mock the basic behavior of the
 * RemoteDataSource service class for use in karma tests. Currently the main
 * function that needs to be mocked is the load function to avoid making any
 * actual requests.
 */
export class RemoteDataSourceMock<T extends JsonApiModel> extends RemoteDataSource<T> {
    
    /** The test data to use when the load method is called. */
    private testData: T[] = [];

    /** Sets the data needed for testing. */
    setTestData(testData: T[]) {
        this.testData = testData;
    }

    override load(
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

        // just set the data and call the next function on the dataSubject so
        // data is emitted and loaded into component during test
        this.data = this.testData as T[];
        this.dataSubject.next(this.data);
    }
}