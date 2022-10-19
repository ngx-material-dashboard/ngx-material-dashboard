import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { JsonDatastore, JsonModel } from '@ngx-material-dashboard/base-json';
import { Datastore } from '@ngx-material-dashboard/base-json/test/services/datastore.service';
import { DummyObject } from '@ngx-material-dashboard/testing';
import { RemoteDataSourceMock } from '@ngx-material-dashboard/widgets/test/mocks/remote-data-source.service';

import { AbstractPagedCollectionComponent } from './abstract-paged-collection.component';

describe('AbstractPagedCollectionComponent', () => {
    let component: AbstractPagedCollectionComponent<JsonModel>;
    let fixture: ComponentFixture<AbstractPagedCollectionComponent<JsonModel>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AbstractPagedCollectionComponent ],
            imports: [
                HttpClientTestingModule,
                MatPaginatorModule,
                MatSortModule
            ],
            providers: [
                { provide: Datastore, deps: [HttpClient] },
                { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AbstractPagedCollectionComponent);
        component = fixture.componentInstance;
        const datastore = TestBed.inject(JsonDatastore);
        component = fixture.componentInstance;
        component.dataSource = new RemoteDataSourceMock(DummyObject, datastore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
