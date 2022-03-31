import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDropDownComponent } from './filter-drop-down.component';

describe('FilterDropDownComponent', () => {
  let component: FilterDropDownComponent;
  let fixture: ComponentFixture<FilterDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDropDownComponent ]
    })
    .compileComponents();
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
