import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { GridWithIconButtonsPaginatorBarComponent } from './grid-with-icon-buttons-paginator-bar.component';

describe('GridWithIconButtonsPaginatorBarComponent', () => {
  let component: GridWithIconButtonsPaginatorBarComponent<DummyObject>;
  let fixture: ComponentFixture<GridWithIconButtonsPaginatorBarComponent<DummyObject>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridWithIconButtonsPaginatorBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridWithIconButtonsPaginatorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
