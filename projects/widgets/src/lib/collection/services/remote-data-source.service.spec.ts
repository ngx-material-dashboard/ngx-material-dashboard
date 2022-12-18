import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
    JsonApiQueryData,
    JsonDatastore,
    JsonModel
} from '@ngx-material-dashboard/base-json';
import { Datastore, getTaskData } from '@ngx-material-dashboard/testing';
import { JsonModelMock } from '@ngx-material-dashboard/widgets/test/mocks/json-model.mock';
import { of } from 'rxjs';

import { RemoteDataSource } from './remote-data-source.service';

describe('RemoteDataSourceService', () => {
    let datastore: JsonDatastore;
    let service: RemoteDataSource<JsonModelMock>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatSortModule],
            providers: [
                { provide: JsonDatastore, useClass: Datastore },
                { provide: JsonModel, useClass: JsonModelMock },
                { provide: ChangeDetectorRef, useClass: ChangeDetectorRef }
            ]
        });
        datastore = TestBed.inject(JsonDatastore);
        service = new RemoteDataSource(JsonModelMock, datastore);
    });

    it('should return MatSort from getter when matSort$ defined', () => {
        // given: a MatSort
        const sort = new MatSort();

        // when: the sort is set for the service
        service.sort = sort;

        // expect: sort for service should be given sort
        expect(service.sort).toBe(sort);
    });

    it('should call findAll method from baseModelService when sortChange called', () => {
        // given: a spy on the datastore findAll method
        const TEST_DATA = getTaskData(20);
        const spy = spyOn(datastore, 'findAll').and.returnValue(
            of(
                new JsonApiQueryData(TEST_DATA, {
                    meta: { total: TEST_DATA.length }
                })
            )
        );

        // and: a defined MatS
        const sort = new MatSort();
        service.sort = sort;

        // when: the sortChange subscription is triggered
        sort.sortChange.next({
            active: 'name',
            direction: 'asc'
        });

        // then: the findAll method should have been called on the datastore
        expect(spy).toHaveBeenCalled();
    });

    it('should return undefined from getter if sort not defined', () => {
        service.sort = undefined; // ensure sort is undefined

        expect(service.sort).toBeUndefined();
    });

    it('should return MatPaginator from getter when paginator defined', () => {
        // given: a MatPaginator
        const changeDetectorRef = TestBed.inject(ChangeDetectorRef);
        const paginator = new MatPaginator(
            new MatPaginatorIntl(),
            changeDetectorRef
        );

        // when: the paginator is set for the service
        service.paginator = paginator;

        // expect: paginator for service should be given paginator
        expect(service.paginator).toBe(paginator);
    });

    it('should return undefined from getter if paginator not set', () => {
        service.paginator = undefined; // ensure paginator undefined

        expect(service.paginator).toBeUndefined();
    });

    it('should call load with default params', () => {
        // given: a spy on the datastore findAll method
        const TEST_DATA = getTaskData(20);
        const spy = spyOn(datastore, 'findAll').and.returnValue(
            of(
                new JsonApiQueryData(TEST_DATA, {
                    meta: { total: TEST_DATA.length }
                })
            )
        );

        // when: load method is called without any params
        service.load();

        // expect: the findAll method should have been called
        expect(spy).toHaveBeenCalled();
    });
});
