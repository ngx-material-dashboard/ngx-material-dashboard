import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JsonDatastore, JsonModel } from '@ngx-material-dashboard/base-json';
import { Datastore } from '@ngx-material-dashboard/testing';
import { JsonModelMock } from '@ngx-material-dashboard/widgets/test/mocks/json-model.mock';
import { Observable, of } from 'rxjs';

import { RemoteDataSource } from './remote-data-source.service';

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
