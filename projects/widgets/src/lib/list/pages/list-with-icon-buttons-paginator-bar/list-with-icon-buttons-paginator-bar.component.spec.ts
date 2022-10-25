import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { ListWithIconButtonsPaginatorBarComponent } from './list-with-icon-buttons-paginator-bar.component';

describe('ListWithIconButtonsPaginatorBarComponent', () => {
  let component: ListWithIconButtonsPaginatorBarComponent<DummyObject>;
  let fixture: ComponentFixture<ListWithIconButtonsPaginatorBarComponent<DummyObject>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWithIconButtonsPaginatorBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWithIconButtonsPaginatorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
