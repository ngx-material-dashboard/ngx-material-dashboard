import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedGridComponent } from './paged-grid.component';

describe('PagedGridComponent', () => {
  let component: PagedGridComponent;
  let fixture: ComponentFixture<PagedGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
