import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { CollectionComponent } from './collection.component';

describe('CollectionComponent', () => {
    let component: CollectionComponent<DummyObject>;
    let fixture: ComponentFixture<CollectionComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ CollectionComponent ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CollectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
