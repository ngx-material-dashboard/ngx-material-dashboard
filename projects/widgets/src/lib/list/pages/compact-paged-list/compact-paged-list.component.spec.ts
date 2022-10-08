import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { CompactPagedListComponent } from './compact-paged-list.component';

describe('CompactPagedListComponent', () => {
    let component: CompactPagedListComponent<DummyObject>;
    let fixture: ComponentFixture<CompactPagedListComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ CompactPagedListComponent ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompactPagedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
