import { HttpHeaders } from "@angular/common/http";
import { SortDirection } from "@angular/material/sort";
import { JsonModel } from "@ngx-material-dashboard/base-json";
import { RemoteDataSource } from "../../src/lib/collection/services/remote-data-source.service";

/**
 * The RemoteDataSourceMock class is meant to mock the basic behavior of the
 * RemoteDataSource service class for use in karma tests. Currently the main
 * function that needs to be mocked is the load function to avoid making any
 * actual requests.
 */
export class RemoteDataSourceMock<T extends JsonModel> extends RemoteDataSource<T> {
    
    /** The test data to use when the load method is called. */
    private testData: T[] = [];

    /** Sets the data needed for testing. */
    setTestData(testData: T[]) {
        this.testData = testData;
    }

    override load(
        filter: {} = {},
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

        // just set the data and call the next function on the dataSubject so
        // data is emitted and loaded into component during test
        this.data = this.testData as T[];
        this.dataSubject.next(this.data);
    }
}