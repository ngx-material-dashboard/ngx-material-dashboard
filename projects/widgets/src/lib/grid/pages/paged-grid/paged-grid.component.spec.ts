import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { AbstractPagedCollectionComponent } from '../../../collection/pages/abstract-paged-collection/abstract-paged-collection.component';
import { GridComponent } from '../../components/grid/grid.component';

import { PagedGridComponent } from './paged-grid.component';

describe('PagedGridComponent', () => {
    let component: PagedGridComponent<DummyObject>;
    let fixture: ComponentFixture<PagedGridComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AbstractPagedCollectionComponent,
                GridComponent,
                PagedGridComponent,
            ],
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                MatGridListModule,
                MatPaginatorModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PagedGridComponent);
        component = fixture.componentInstance;
        component.data = TEST_DATA;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
