import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedCollectionComponent } from './paged-collection.component';

describe('PagedCollectionComponent', () => {
  let component: PagedCollectionComponent;
  let fixture: ComponentFixture<PagedCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
