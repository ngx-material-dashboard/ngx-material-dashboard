import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedGridWithToolbarComponent } from './paged-grid-with-toolbar.component';

describe('PagedGridWithToolbarComponent', () => {
  let component: PagedGridWithToolbarComponent;
  let fixture: ComponentFixture<PagedGridWithToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedGridWithToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedGridWithToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
