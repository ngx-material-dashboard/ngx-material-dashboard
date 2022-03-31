import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '../../../../../test/mocks/dummy-object.mock';

import { AbstractPagedTableWithToolbarComponent } from './abstract-paged-table-with-toolbar.component';

describe('AbstractPagedTableWithToolbarComponent', () => {
    let component: AbstractPagedTableWithToolbarComponent<DummyObject>;
    let fixture: ComponentFixture<AbstractPagedTableWithToolbarComponent<DummyObject>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [ AbstractPagedTableWithToolbarComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AbstractPagedTableWithToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
