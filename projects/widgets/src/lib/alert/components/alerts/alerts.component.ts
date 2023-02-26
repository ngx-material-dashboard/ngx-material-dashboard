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

    removeAlert(alert: Alert) {
        this.alertService.removeAlert(alert);
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
