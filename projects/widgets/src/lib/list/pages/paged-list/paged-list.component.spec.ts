import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { PagedListComponent } from './paged-list.component';

const testData: DummyObject[] = [];
for (let i = 0; i < 20; i++) {
    testData.push({ id: i.toString() } as DummyObject);
}

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
        component.data = testData;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
