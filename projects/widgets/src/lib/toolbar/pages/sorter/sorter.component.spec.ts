import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectElement } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';

import { SorterComponent } from './sorter.component';

describe('SorterComponent', () => {
    let component: SorterComponent;
    let fixture: ComponentFixture<SorterComponent>;
    let page: SelectElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SorterComponent],
            imports: [
                MatFormFieldModule,
                MatSelectModule,
                NoopAnimationsModule,
                MockModule(FontAwesomeModule)
            ]
        });

        fixture = TestBed.createComponent(SorterComponent);
        component = fixture.componentInstance;
        component.options = ['id', 'name'];
        fixture.detectChanges();

        page = new SelectElement(fixture);
    });

    beforeEach(fakeAsync(() => {
        page.initOptions();
    }));

    it('should call sortChange emit when user selects option', fakeAsync(() => {
        // given: a spy on the sortChange emit method
        const spy = spyOn(component.sortChange, 'emit');

        // when: an option is selected
        page.select(0);

        // expect: the sortChange emit method should have been called
        expect(spy).toHaveBeenCalled();
    }));
});
