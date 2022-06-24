import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedTableOverviewComponent } from './paged-table-overview.component';

describe('PagedTableOverviewComponent', () => {
  let component: PagedTableOverviewComponent;
  let fixture: ComponentFixture<PagedTableOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedTableOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedTableOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
