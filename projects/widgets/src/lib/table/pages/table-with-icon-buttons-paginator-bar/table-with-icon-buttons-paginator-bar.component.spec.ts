import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { TableWithIconButtonsPaginatorBarComponent } from './table-with-icon-buttons-paginator-bar.component';

describe('TableWithIconButtonsPaginatorBarComponent', () => {
  let component: TableWithIconButtonsPaginatorBarComponent<DummyObject>;
  let fixture: ComponentFixture<TableWithIconButtonsPaginatorBarComponent<DummyObject>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableWithIconButtonsPaginatorBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWithIconButtonsPaginatorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
