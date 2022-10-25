import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { PagedGridWithRaisedButtonsBarComponent } from './paged-grid-with-raised-buttons-bar.component';

describe('PagedGridWithRaisedButtonsBarComponent', () => {
  let component: PagedGridWithRaisedButtonsBarComponent<DummyObject>;
  let fixture: ComponentFixture<PagedGridWithRaisedButtonsBarComponent<DummyObject>>;

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
