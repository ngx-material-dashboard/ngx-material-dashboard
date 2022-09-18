import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { AbstractPagedCollectionComponent } from './abstract-paged-collection.component';

describe('AbstractPagedCollectionComponent', () => {
    let component: AbstractPagedCollectionComponent<JsonModel>;
    let fixture: ComponentFixture<AbstractPagedCollectionComponent<JsonModel>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AbstractPagedCollectionComponent ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AbstractPagedCollectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
