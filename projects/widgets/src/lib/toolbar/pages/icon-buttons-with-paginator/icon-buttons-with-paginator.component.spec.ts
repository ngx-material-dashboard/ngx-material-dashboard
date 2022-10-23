import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonsWithPaginatorComponent } from './icon-buttons-with-paginator.component';

describe('IconButtonsWithPaginatorComponent', () => {
  let component: IconButtonsWithPaginatorComponent;
  let fixture: ComponentFixture<IconButtonsWithPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconButtonsWithPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconButtonsWithPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
