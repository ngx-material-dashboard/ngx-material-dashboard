import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent<DummyObject>;
  let fixture: ComponentFixture<TableComponent<DummyObject>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
