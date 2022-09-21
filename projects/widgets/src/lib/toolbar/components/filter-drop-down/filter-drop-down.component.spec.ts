import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FilterDropDownComponent } from './filter-drop-down.component';

describe('FilterDropDownComponent', () => {
    let component: FilterDropDownComponent;
    let fixture: ComponentFixture<FilterDropDownComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ FilterDropDownComponent ],
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
