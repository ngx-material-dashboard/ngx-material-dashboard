import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FilterDropDownComponent } from './filter-drop-down.component';

describe('FilterDropDownComponent', () => {
    let component: FilterDropDownComponent;
    let fixture: ComponentFixture<FilterDropDownComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FilterDropDownComponent],
            imports: [
                ReactiveFormsModule,
                MatDividerModule,
                MatMenuModule,
                FontAwesomeModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterDropDownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
