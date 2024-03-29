import { TestBed } from '@angular/core/testing';
import { Alert } from '../models/alert.model';

import { AlertService } from './alert.service';

describe('AlertService', () => {
    let service: AlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AlertService);
    });

    it('should emit alerts with default-alert id', () => {
        // setup: a subscription on the onAlert method without id parameter
        service.onAlert().subscribe((alert) => {
            expect(alert.id).toEqual('default-alert');
        });

        // then: call an alert method with default id to trigger above sub
        service.info('Info');
    });

    it('should emit alerts with id other than default-alert', () => {
        // setup: a subscription on the onAlert method with custom-alert
        service.onAlert('custom-alert').subscribe((alert) => {
            expect(alert.id).toEqual('custom-alert');
        });

        // then: call an alert method with custom id to trigger above sub
        service.info('Info', { id: 'custom-alert' });
    });

    it('should remove alerts when empty message alert received', () => {
        // given: an existing alert
        service.error('Error', { autoClose: false });

        // when: an empty alert is passed into alert method
        service.alert(new Alert());

        // then: the services alerts should be empty
        service.alerts$.subscribe((alerts) => {
            expect(alerts.length).toEqual(0);
        });
    });
});
