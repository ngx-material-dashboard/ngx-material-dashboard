import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';

import { PagedGridComponent } from './paged-grid.component';

describe('PagedGridComponent', () => {
    let component: PagedGridComponent<DummyObject>;
    let fixture: ComponentFixture<PagedGridComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ PagedGridComponent ],
            imports: [
                HttpClientTestingModule
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
