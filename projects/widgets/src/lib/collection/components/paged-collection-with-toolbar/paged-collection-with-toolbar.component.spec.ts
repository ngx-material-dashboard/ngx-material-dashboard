import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedCollectionWithToolbarComponent } from './paged-collection-with-toolbar.component';

describe('PagedCollectionWithToolbarComponent', () => {
  let component: PagedCollectionWithToolbarComponent;
  let fixture: ComponentFixture<PagedCollectionWithToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedCollectionWithToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedCollectionWithToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
