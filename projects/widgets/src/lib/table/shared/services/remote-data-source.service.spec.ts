import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JsonDatastore, JsonModel } from '@ngx-material-dashboard/base-json';
import { Observable, of } from 'rxjs';

import { Datastore } from '../../../../../test/mocks/datastore.service';
import { RemoteDataSource } from './remote-data-source.service';

/**
 * Use a mock of the JsonApiModel so we don't need to worry about
 * including providers for data parameters in tests.
 */
class JsonModelMock extends JsonModel {
    public save(
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<this> {
        return of(this);
    }
}

describe('RemoteDataSourceService', () => {
    let service: RemoteDataSource<JsonModelMock>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: JsonDatastore, useValue: Datastore },
                { provide: JsonModel, useClass: JsonModelMock }
            ]
        });
        const datastore = TestBed.inject(JsonDatastore);
        service = new RemoteDataSource(JsonModelMock, datastore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
