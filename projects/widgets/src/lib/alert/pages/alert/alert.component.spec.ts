import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
    ComponentFixture,
    fakeAsync,
    inject,
    TestBed,
    tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageElement } from '@ngx-material-dashboard/testing';
import { AlertsComponent } from '../../components/alerts/alerts.component';
import { AlertService } from '../../services/alert.service';

import { AlertComponent } from './alert.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class Page extends PageElement {
    private container!: OverlayContainer;
    containerElement!: HTMLElement;

    constructor(fixture: ComponentFixture<AlertComponent>) {
        super(fixture);
        inject([OverlayContainer], (oc: OverlayContainer) => {
            this.container = oc;
            this.containerElement = oc.getContainerElement();
        })();
    }
}

describe('AlertComponent', () => {
    let service: AlertService;
    let fixture: ComponentFixture<AlertComponent>;
    let page: Page;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AlertComponent, AlertsComponent],
            imports: [
                CommonModule,
                NoopAnimationsModule,
                OverlayModule,
                RouterTestingModule,
                FontAwesomeModule
            ],
            providers: [AlertService]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(AlertService);
        fixture = TestBed.createComponent(AlertComponent);
        fixture.detectChanges();

        page = new Page(fixture);
    });

    it('should create overlay when alert is created', () => {
        service.error('Error', { autoClose: false });
        fixture.detectChanges();

        expect(
            page.query('.alert-danger', page.containerElement)
        ).toBeDefined();
    });

    it('should create and destroy overlay when default autoClose alert created', fakeAsync(() => {
        // given: a default alert that auto closes
        service.error('Error');
        fixture.detectChanges();

        // when: more time than auto close timeout passes
        tick(5000);
        fixture.detectChanges();

        // then: the overlay should be destroyed and the alert should be removed
        try {
            page.query('.alert-danger');
        } catch (error: any) {
            expect(error.message).toEqual('.alert-danger not found in fixture');
        }
    }));
});
