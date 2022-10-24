import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedGridWithRaisedButtonsBarComponent } from './paged-grid-with-raised-buttons-bar.component';

describe('PagedGridWithRaisedButtonsBarComponent', () => {
  let component: PagedGridWithRaisedButtonsBarComponent;
  let fixture: ComponentFixture<PagedGridWithRaisedButtonsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedGridWithRaisedButtonsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedGridWithRaisedButtonsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
