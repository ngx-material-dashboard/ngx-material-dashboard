import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedListWithRaisedButtonsBarComponent } from './paged-list-with-raised-buttons-bar.component';

describe('PagedListWithRaisedButtonsBarComponent', () => {
  let component: PagedListWithRaisedButtonsBarComponent;
  let fixture: ComponentFixture<PagedListWithRaisedButtonsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedListWithRaisedButtonsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedListWithRaisedButtonsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
