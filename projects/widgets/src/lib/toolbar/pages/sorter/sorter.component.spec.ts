import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorterComponent } from './sorter.component';

describe('SorterComponent', () => {
  let component: SorterComponent;
  let fixture: ComponentFixture<SorterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SorterComponent ]
    });

    fixture = TestBed.createComponent(SorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
