import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AnchorService } from '../../../shared/anchor/anchor.service';

import { TabbedDocumentTabComponent } from './tabbed-document-tab.component';

describe('TabbedDocumentTabComponent', () => {
    let component: TabbedDocumentTabComponent;
    let fixture: ComponentFixture<TabbedDocumentTabComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ TabbedDocumentTabComponent ],
            imports: [RouterTestingModule],
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
