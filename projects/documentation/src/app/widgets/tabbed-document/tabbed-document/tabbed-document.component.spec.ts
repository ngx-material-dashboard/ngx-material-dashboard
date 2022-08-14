import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';

import { TabbedDocumentComponent } from './tabbed-document.component';

describe('TabbedDocumentComponent', () => {
    let component: TabbedDocumentComponent;
    let fixture: ComponentFixture<TabbedDocumentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ TabbedDocumentComponent ],
            imports: [
                RouterTestingModule,
                MatTabsModule
            ]
        });
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
