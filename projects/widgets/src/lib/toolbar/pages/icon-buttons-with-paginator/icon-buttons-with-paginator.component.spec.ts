import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyObject } from '@ngx-material-dashboard/testing';

import { IconButtonsWithPaginatorComponent } from './icon-buttons-with-paginator.component';

describe('IconButtonsWithPaginatorComponent', () => {
  let component: IconButtonsWithPaginatorComponent<DummyObject>;
  let fixture: ComponentFixture<IconButtonsWithPaginatorComponent<DummyObject>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ IconButtonsWithPaginatorComponent ]
    });

    fixture = TestBed.createComponent(IconButtonsWithPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
