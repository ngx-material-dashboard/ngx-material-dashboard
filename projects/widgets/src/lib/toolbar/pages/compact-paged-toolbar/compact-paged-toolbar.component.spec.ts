import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { CompactPagedToolbarComponent } from './compact-paged-toolbar.component';

describe('CompactPagedToolbarComponent', () => {
    let component: CompactPagedToolbarComponent<DummyObject>;
    let fixture: ComponentFixture<CompactPagedToolbarComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ CompactPagedToolbarComponent ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompactPagedToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
