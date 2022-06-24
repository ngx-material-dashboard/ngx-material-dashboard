import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedTableApiComponent } from './paged-table-api.component';

describe('PagedTableApiComponent', () => {
  let component: PagedTableApiComponent;
  let fixture: ComponentFixture<PagedTableApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedTableApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedTableApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
