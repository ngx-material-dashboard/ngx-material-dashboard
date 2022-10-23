import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedButtonToolbarComponent } from './raised-button-toolbar.component';

describe('RaisedButtonToolbarComponent', () => {
  let component: RaisedButtonToolbarComponent;
  let fixture: ComponentFixture<RaisedButtonToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisedButtonToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedButtonToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
