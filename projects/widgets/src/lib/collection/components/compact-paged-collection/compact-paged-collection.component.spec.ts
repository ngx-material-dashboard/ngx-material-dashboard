import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { CompactPagedCollectionComponent } from './compact-paged-collection.component';

describe('CompactPagedCollectionComponent', () => {
    let component: CompactPagedCollectionComponent<DummyObject>;
    let fixture: ComponentFixture<CompactPagedCollectionComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ CompactPagedCollectionComponent ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompactPagedCollectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
