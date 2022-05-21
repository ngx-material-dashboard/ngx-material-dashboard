import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedComponent } from './paged.component';

describe('PagedComponent', () => {
  let component: PagedComponent;
  let fixture: ComponentFixture<PagedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
