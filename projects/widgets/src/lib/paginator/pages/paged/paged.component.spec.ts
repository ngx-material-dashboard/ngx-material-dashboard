import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { AbstractPagedComponent } from './paged.component';

describe('AbstractPagedComponent', () => {
    let component: AbstractPagedComponent<DummyObject>;
    let fixture: ComponentFixture<AbstractPagedComponent<DummyObject>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ AbstractPagedComponent ]
        })
        .compileComponents();
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
