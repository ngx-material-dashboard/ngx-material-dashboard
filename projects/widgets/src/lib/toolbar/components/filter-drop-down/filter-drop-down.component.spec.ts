import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuElement } from '@ngx-material-dashboard/testing';

import { FilterDropDownComponent } from './filter-drop-down.component';

describe('FilterDropDownComponent', () => {
    let component: FilterDropDownComponent;
    let fixture: ComponentFixture<FilterDropDownComponent>;
    let page: MenuElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FilterDropDownComponent],
            imports: [
                ReactiveFormsModule,
                MatButtonModule,
                MatDialogModule,
                MatDividerModule,
                NoopAnimationsModule,
                FontAwesomeModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterDropDownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        page = new MenuElement(fixture, [
            '.marker-button-clear',
            '.marker-button-search'
        ]);
    });

    beforeEach(() => {
        page.initButtons();
    });

    it('should emit true when user clicks clear button', () => {
        const spy = spyOn(component.clearSearchForm, 'emit');
        page.clickButton('.marker-button-clear');
        fixture.detectChanges();

        expect(spy).toHaveBeenCalledWith(true);
    });

    it('should emit true when search button clicked in filter', () => {
        const spy = spyOn(component.searchClick, 'emit');
        page.clickButton('.marker-button-search');
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    });
});
