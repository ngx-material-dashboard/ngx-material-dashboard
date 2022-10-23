import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedCollectionWithIconToolbarComponent } from './paged-collection-with-icon-toolbar.component';

describe('PagedCollectionWithIconToolbarComponent', () => {
  let component: PagedCollectionWithIconToolbarComponent;
  let fixture: ComponentFixture<PagedCollectionWithIconToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedCollectionWithIconToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedCollectionWithIconToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
