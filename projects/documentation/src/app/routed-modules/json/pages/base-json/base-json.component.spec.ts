import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseJsonComponent } from './base-json.component';

describe('BaseJsonComponent', () => {
  let component: BaseJsonComponent;
  let fixture: ComponentFixture<BaseJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
