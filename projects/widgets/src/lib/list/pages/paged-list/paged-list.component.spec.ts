import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';

import { PagedListComponent } from './paged-list.component';

describe('PagedListComponent', () => {
    let component: PagedListComponent<DummyObject>;
    let fixture: ComponentFixture<PagedListComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ PagedListComponent ],
            imports: [
                HttpClientTestingModule
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
