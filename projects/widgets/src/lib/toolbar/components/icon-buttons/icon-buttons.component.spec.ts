import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonsComponent } from './icon-buttons.component';

describe('IconButtonsComponent', () => {
  let component: IconButtonsComponent;
  let fixture: ComponentFixture<IconButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ IconButtonsComponent ]
    });

    fixture = TestBed.createComponent(IconButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
