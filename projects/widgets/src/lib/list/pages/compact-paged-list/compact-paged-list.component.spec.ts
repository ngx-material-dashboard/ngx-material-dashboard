import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, DummyObject } from '@ngx-material-dashboard/testing';
import { RemoteDataSourceMock } from '@ngx-material-dashboard/widgets/test/mocks/remote-data-source.service';
import { CompactPagedToolbarComponent } from '../../../toolbar/pages/compact-paged-toolbar/compact-paged-toolbar.component';
import { ListComponent } from '../../components/list/list.component';

import { CompactPagedListComponent } from './compact-paged-list.component';

describe('CompactPagedListComponent', () => {
    let component: CompactPagedListComponent<DummyObject>;
    let fixture: ComponentFixture<CompactPagedListComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CompactPagedListComponent,
                CompactPagedToolbarComponent,
                ListComponent
            ],
            imports: [
                HttpClientTestingModule,
                MatPaginatorModule,
                MatSortModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: Datastore, deps: [HttpClient] },
                { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompactPagedListComponent);
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
