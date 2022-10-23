import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithIconButtonsPaginatorBarComponent } from './table-with-icon-buttons-paginator-bar.component';

describe('TableWithIconButtonsPaginatorBarComponent', () => {
  let component: TableWithIconButtonsPaginatorBarComponent;
  let fixture: ComponentFixture<TableWithIconButtonsPaginatorBarComponent>;

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
