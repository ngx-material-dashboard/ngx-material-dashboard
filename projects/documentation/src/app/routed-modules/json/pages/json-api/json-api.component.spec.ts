import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonApiComponent } from './json-api.component';

describe('JsonApiComponent', () => {
  let component: JsonApiComponent;
  let fixture: ComponentFixture<JsonApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
