import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AlertType } from '../../enums/alert-type.enum';
import { Alert } from '../../models/alert.model';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'ngx-material-dashboard-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnDestroy, OnInit {
    @Input() id = 'default-alert';
    @Input() fade = true;

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
        // subscribe to new alert notifications
        const alertSub = this.alertService
            .onAlert(this.id)
            .subscribe((alert) => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    this.alerts = this.alerts.filter(
                        (x) => x.keepAfterRouteChange
                    );

                    // remove 'keepAfterRouteChange' flag on the rest
                    // ...why? so they can be cleared if cleared again?
                    this.alerts.forEach((x) => delete x.keepAfterRouteChange);
                    this.alertService.alertsSubject.next(this.alerts);
                    return;
                }

                // add alert to array
                this.alerts.push(alert);
                this.alertService.alertsSubject.next(this.alerts);

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
            });
        this.sub.add(alertSub);

        // clear alerts on location change
        const routeSub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
        this.sub.add(routeSub);
    }

    removeAlert(alert: Alert) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            const a = this.alerts.find((x) => x === alert);
            // fade out alert
            if (a) {
                a.fade = true;
            }

            // remove alert after faded out
            setTimeout(() => {
                this.alerts = this.alerts.filter((x) => x !== alert);
                this.alertService.alertsSubject.next(this.alerts);
            }, 250);
        } else {
            // remove alert
            this.alerts = this.alerts.filter((x) => x !== alert);
            this.alertService.alertsSubject.next(this.alerts);
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
