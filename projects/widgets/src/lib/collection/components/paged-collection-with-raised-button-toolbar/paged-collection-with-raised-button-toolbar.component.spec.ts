import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { PagedCollectionWithRaisedButtonToolbarComponent } from './paged-collection-with-raised-button-toolbar.component';

describe('PagedCollectionWithRaisedButtonToolbarComponent', () => {
  let component: PagedCollectionWithRaisedButtonToolbarComponent<DummyObject>;
  let fixture: ComponentFixture<PagedCollectionWithRaisedButtonToolbarComponent<DummyObject>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedCollectionWithRaisedButtonToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedCollectionWithRaisedButtonToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
