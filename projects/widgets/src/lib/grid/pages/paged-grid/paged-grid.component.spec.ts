import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { PagedGridComponent } from './paged-grid.component';

const testData: DummyObject[] = [];
for (let i = 0; i < 20; i++) {
    testData.push({ id: i.toString() } as DummyObject);
}

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
        component.data = testData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
