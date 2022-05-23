import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { AbstractPagedComponent } from './abstract-paged.component';

describe('AbstractPagedComponent', () => {
    let component: AbstractPagedComponent<DummyObject>;
    let fixture: ComponentFixture<AbstractPagedComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AbstractPagedComponent ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AbstractPagedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
