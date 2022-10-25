import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { PagedCollectionWithIconToolbarComponent } from './paged-collection-with-icon-toolbar.component';

describe('PagedCollectionWithIconToolbarComponent', () => {
  let component: PagedCollectionWithIconToolbarComponent<DummyObject>;
  let fixture: ComponentFixture<PagedCollectionWithIconToolbarComponent<DummyObject>>;

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
