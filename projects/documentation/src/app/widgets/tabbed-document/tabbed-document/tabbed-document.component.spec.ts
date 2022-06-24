import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedDocumentComponent } from './tabbed-document.component';

describe('TabbedDocumentComponent', () => {
  let component: TabbedDocumentComponent;
  let fixture: ComponentFixture<TabbedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabbedDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
