import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { PagedTableWithRaisedButtonsBarComponent } from './paged-table-with-raised-buttons-bar.component';

describe('PagedTableWithRaisedButtonsBarComponent', () => {
  let component: PagedTableWithRaisedButtonsBarComponent<DummyObject>;
  let fixture: ComponentFixture<PagedTableWithRaisedButtonsBarComponent<DummyObject>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedTableWithRaisedButtonsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedTableWithRaisedButtonsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
