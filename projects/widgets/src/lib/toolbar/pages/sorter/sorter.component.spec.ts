import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectElement } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';

import { SorterComponent } from './sorter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { SortOption } from '../../..';

describe('SorterComponent', () => {
    let component: SorterComponent;
    let fixture: ComponentFixture<SorterComponent>;
    let page: SelectElement;

    describe('active independent tests', () => {
        beforeEach(() => {
            const testBed = init(['id', 'name']);
            component = testBed.component;
            fixture = testBed.fixture;
            page = testBed.page;
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

    describe('No initial active value', () => {
        beforeEach(() => {
            const testBed = init(['id', 'name']);
            component = testBed.component;
            fixture = testBed.fixture;
            page = testBed.page;
        });

        beforeEach(fakeAsync(() => {
            page.initOptions();
        }));

        it('should have activeDisplay undefined by default', () => {
            expect(component.activeDisplay).toBeUndefined();
        });
    });

    describe('Initial active value', () => {
        beforeEach(() => {
            const testBed = init(['id', 'name'], 'id', 'asc');
            component = testBed.component;
            fixture = testBed.fixture;
            page = testBed.page;
        });

        beforeEach(fakeAsync(() => {
            page.initOptions();
        }));

        it('should set activeDisplay by default', () => {
            expect(component.activeDisplay).toEqual('id');
        });
    });

    describe('SortOption array used for fields', () => {
        beforeEach(() => {
            const testBed = init(
                [
                    { field: 'id', text: 'ID' },
                    { field: 'name', text: 'Name' }
                ],
                'id',
                'asc'
            );
            component = testBed.component;
            fixture = testBed.fixture;
            page = testBed.page;
        });

        beforeEach(fakeAsync(() => {
            page.initOptions();
        }));

        it('should set activeDisplay by default', () => {
            expect(component.activeDisplay).toEqual('ID');
        });
    });
});

function init(
    options: SortOption[] | string[],
    active?: string,
    direction?: SortDirection
) {
    TestBed.configureTestingModule({
        declarations: [SorterComponent],
        imports: [
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatSelectModule,
            NoopAnimationsModule,
            MockModule(FontAwesomeModule)
        ]
    });

    const fixture = TestBed.createComponent(SorterComponent);
    const component = fixture.componentInstance;
    if (active && direction) {
        component.active = active;
        component.direction = direction;
    }
    component.options = options;
    fixture.detectChanges();

    return { fixture, component, page: new SelectElement(fixture) };
}
