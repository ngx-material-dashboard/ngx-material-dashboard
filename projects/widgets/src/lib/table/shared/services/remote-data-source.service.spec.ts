import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JsonApiModel } from '@ngx-material-dashboard/json-api';

import { RemoteDataSource } from './remote-data-source.service';

/**
 * Use a mock of the JsonApiModel so we don't need to worry about
 * including providers for data parameters in tests.
 */
class JsonApiModelMock {}

describe('RemoteDataSourceService', () => {
    let service: RemoteDataSource<JsonApiModel>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: JsonApiModel, useClass: JsonApiModelMock },
            ]
        });
        service = TestBed.inject(RemoteDataSource);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
