/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { AnimationEvent } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { fadeAnimation } from '../../animations/fade.animation';
import { AlertType } from '../../enums/alert-type.enum';
import { Alert } from '../../models/alert.model';
import { AlertService } from '../../services/alert.service';

/**
 * `Alerts` handles rendering array of alerts to screen, and controls how
 * alerts are displayed (i.e. color/class based on type of alert).
 */
@Component({
    selector: 'ngx-mat-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.css'],
    animations: [fadeAnimation]
})
export class AlertsComponent implements OnDestroy, OnInit {
    @Input() id = 'default-alert';

    alerts: Alert[] = [];
    faTimes: IconDefinition = faTimes;
    sub: Subscription;

    constructor(private router: Router, private alertService: AlertService) {
        this.sub = new Subscription();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit() {
        const sub = this.alertService.alerts$.subscribe((res) => {
            this.alerts = res;
        });
        this.sub.add(sub);

        // clear alerts on location change
        const routeSub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
        this.sub.add(routeSub);
    }

    /**
     * Removes the given alert from array of alerts and therefore the screen,
     * as long as the alert is still on the screen.
     *
     * @param alert The alert to remove.
     */
    removeAlert(alert: Alert, event?: AnimationEvent) {
        if ((event && event.toState === 'void') || !event) {
            this.alertService.removeAlert(alert);
        }
    }

    cssClass(alert: Alert): string {
        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Info]: 'alert-info',
            [AlertType.Warning]: 'alert-warning'
        };

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }
}
