import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationStart, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonElement, PageElement } from '@ngx-material-dashboard/testing';
import { ReplaySubject } from 'rxjs';
import { AlertService } from '../../services/alert.service';

import { AlertsComponent } from './alerts.component';

const eventSubject = new ReplaySubject<RouterEvent>(1);

const routerMock = (url: string) => {
    return {
        navigate: jasmine.createSpy('navigate'),
        events: eventSubject.asObservable(),
        url: url
    };
};

class AlertPage extends PageElement {
    removeButtons: ButtonElement[] = [];

    get alerts(): HTMLElement[] {
        return this.queryAll<HTMLElement>('.alert');
    }

    get dismissableAlerts(): HTMLElement[] {
        return this.queryAll<HTMLElement>('.alert-dismissable');
    }

    get dismissAlertButtons(): ButtonElement[] {
        const buttons: ButtonElement[] = [];
        this.dismissableAlerts.forEach((alert) => {
            buttons.push(new ButtonElement(this.fixture, '.close', alert));
        });

        return buttons;
    }
}

describe('AlertsComponent', () => {
    let alertService: AlertService;
    let component: AlertsComponent;
    let fixture: ComponentFixture<AlertsComponent>;
    let page: AlertPage;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AlertsComponent],
            imports: [
                RouterTestingModule,
                MatButtonModule,
                FlexLayoutModule,
                FontAwesomeModule
            ],
            providers: [
                AlertService,
                { provide: Router, useValue: routerMock('') }
            ]
        });
    });

    beforeEach(() => {
        alertService = TestBed.inject(AlertService);
        fixture = TestBed.createComponent(AlertsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        page = new AlertPage(fixture);
    });

    it('should render error alert', () => {
        // when: an error alert is emitted
        alertService.error('Error');
        fixture.detectChanges();

        // then: the alert should be in array of alerts for component
        expect(
            component.alerts.find((it) => it.message === 'Error')
        ).toBeDefined();

        // and: the alert should be rendered in component
        expect(page.query('.alert-danger')).toBeDefined();
    });

    it('should render info alert', () => {
        // when: an info alert is emitted
        alertService.info('Info');
        fixture.detectChanges();

        // then: the alert should be in array of alerts for component
        expect(
            component.alerts.find((it) => it.message === 'Info')
        ).toBeDefined();

        // and: the alert should be rendered in component
        expect(page.query('.alert-info')).toBeDefined();
    });

    it('should render success alert', () => {
        // when: a success alert is emitted
        alertService.success('Success');
        fixture.detectChanges();

        // then: the alert should be in array of alerts for component
        expect(
            component.alerts.find((it) => it.message === 'Success')
        ).toBeDefined();

        // and: the alert should be rendered in component
        expect(page.query('.alert-success')).toBeDefined();
    });

    it('should render warning alert', () => {
        // when: a warning alert is emitted
        alertService.warn('Warn');
        fixture.detectChanges();

        // then: the alert should be in array of alerts for component
        expect(
            component.alerts.find((it) => it.message === 'Warn')
        ).toBeDefined();

        // and: the alert should be rendered in component
        expect(page.query('.alert-warning')).toBeDefined();
    });

    it('should clear alerts when clear method called', () => {
        // given: an existing alert
        alertService.error('Error');
        fixture.detectChanges();

        // when: clear is called
        alertService.clear();
        fixture.detectChanges();

        // then: the alert should not be found
        try {
            page.query('.alert-danger');
        } catch (error: any) {
            expect(error.message).toEqual('.alert-danger not found in fixture');
        }
    });

    it('should keep alerts with keepAfterRouteChange when clear called', () => {
        // given: an existing alert
        alertService.error('Error', { keepAfterRouteChange: true });
        fixture.detectChanges();

        // when: clear is called
        alertService.clear();
        fixture.detectChanges();

        // then: the message should still be displayed
        expect(page.query('.alert-danger')).toBeDefined();
    });

    it('should remove alert without timeout when fade is false', () => {
        // given: fade set to false
        component.fade = false;
        fixture.detectChanges();

        // and: an existing alert
        alertService.error('Error', { autoClose: false });
        fixture.detectChanges();

        // when: clear is called
        alertService.clear();
        fixture.detectChanges();

        // then: the alert should be removed
        try {
            page.query('.alert-danger');
        } catch (error: any) {
            expect(error.message).toEqual('.alert-danger not found in fixture');
        }
    });

    it('should clear alerts when navigation starts', () => {
        // given: an existing alert
        alertService.error('Error');
        fixture.detectChanges();

        // when: navigation starts
        eventSubject.next(new NavigationStart(0, '/a-new-url'));
        fixture.detectChanges();

        // then: the alert should be removed
        try {
            page.query('.alert-danger');
        } catch (error: any) {
            expect(error.message).toEqual('.alert-danger not found in fixture');
        }
    });

    it('should remove alert when close button clicked', async () => {
        // given: an existing alert
        component.fade = false;
        alertService.error('Error');
        fixture.detectChanges();

        // and: the close button for the alert
        const closeButtons: ButtonElement[] = page.dismissAlertButtons;
        const close = closeButtons[0];

        // when: the close button is clicked
        await close.click();

        // then: the alert should be removed
        try {
            page.query('.alert-danger');
        } catch (error: any) {
            expect(error.message).toEqual('.alert-danger not found in fixture');
        }
    });

    it('should remove autoClose alerts after set time', fakeAsync(() => {
        // given: a default alert that auto closes
        alertService.error('Error');
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

    it('should not remove alert multiple times', fakeAsync(() => {
        // given: existing alert
        alertService.error('Error');
        fixture.detectChanges();
        const alert = component.alerts[0];

        // when: more time than auto close timeout passes
        tick(5000);
        fixture.detectChanges();

        // then: there should be any issue trying to remove alert again
        expect(() => component.removeAlert(alert)).not.toThrowError();
    }));
});
