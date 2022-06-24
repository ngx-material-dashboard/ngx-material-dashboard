import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedDocumentTabComponent } from './tabbed-document-tab.component';

describe('TabbedDocumentTabComponent', () => {
  let component: TabbedDocumentTabComponent;
  let fixture: ComponentFixture<TabbedDocumentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabbedDocumentTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedDocumentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
