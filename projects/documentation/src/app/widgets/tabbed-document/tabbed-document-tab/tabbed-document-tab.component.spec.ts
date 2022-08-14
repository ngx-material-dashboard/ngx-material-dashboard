import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { AnchorService } from '../../../shared/anchor/anchor.service';
import { ScrollspyNavLayoutComponent } from '../../scrollspy-nav-layout/scrollspy-nav-layout.component';
import { ScrollspyNavComponent } from '../../scrollspy-nav/scrollspy-nav.component';

import { TabbedDocumentTabComponent } from './tabbed-document-tab.component';

describe('TabbedDocumentTabComponent', () => {
    let component: TabbedDocumentTabComponent;
    let fixture: ComponentFixture<TabbedDocumentTabComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockComponent(ScrollspyNavComponent),
                MockComponent(ScrollspyNavLayoutComponent),
                TabbedDocumentTabComponent
            ],
            imports: [
                RouterTestingModule,
                MatButtonModule
            ],
            providers: [AnchorService]
        });
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
