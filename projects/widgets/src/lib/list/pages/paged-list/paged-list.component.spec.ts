import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { AbstractPagedComponent } from '../../../paginator/pages/paged/abstract-paged.component';
import { ListComponent } from '../../components/list/list.component';

import { PagedListComponent } from './paged-list.component';

describe('PagedListComponent', () => {
    let component: PagedListComponent<DummyObject>;
    let fixture: ComponentFixture<PagedListComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AbstractPagedComponent,
                ListComponent,
                PagedListComponent
            ],
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                MatPaginatorModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PagedListComponent);
        component = fixture.componentInstance;
        component.data = TEST_DATA;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
