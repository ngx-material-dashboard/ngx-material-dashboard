import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { PagedCollectionWithToolbarComponent } from './paged-collection-with-toolbar.component';

describe('PagedCollectionWithToolbarComponent', () => {
  let component: PagedCollectionWithToolbarComponent<DummyObject>;
  let fixture: ComponentFixture<PagedCollectionWithToolbarComponent<DummyObject>>;

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
