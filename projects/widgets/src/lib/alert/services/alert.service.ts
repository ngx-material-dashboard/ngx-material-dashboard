import { Injectable } from '@angular/core';
import { Subject, Observable, filter, BehaviorSubject } from 'rxjs';
import { AlertType } from '../enums/alert-type.enum';
import { Alert } from '../models/alert.model';

/**
 * The `AlertService` provides convenience methods for emitting alert messages
 * of type error, info, success, and warn.
 */
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private alerts: Alert[] = [];
    private alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<
        Alert[]
    >(this.alerts);
    alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

    private subject = new Subject<Alert>();
    /** Default id to set for alerts. */
    private defaultId = 'default-alert';

    /**
     * An observable for alerts that can be subscribed to for rendering or
     * dealing with alerts.
     *
     * @param id Optional id value to filter on.
     * @returns An observable for alert messages.
     */
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject
            .asObservable()
            .pipe(filter((x) => x && x.id === id));
    }

    /**
     * Emits the given message as an error alert.
     *
     * @param message The message to render in the alert.
     * @param options Optional options to include for alert.
     */
    error(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    /**
     * Emits the given message as an info alert.
     *
     * @param message The message to render in the alert.
     * @param options Optional options to include for alert.
     */
    info(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    /**
     * Emits the given message as a success alert.
     *
     * @param message The message to render in the alert.
     * @param options Optional options to include for alert.
     */
    success(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    /**
     * Emits the given message as a warning alert.
     *
     * @param message The message to render in the alert.
     * @param options Optional options to include for alert.
     */
    warn(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    /**
     * Emits the given alert. You should not need to call this method directly
     * unless you define alerts other than error, info, success, or warn.
     * Leaving this public so that is available as an option though...
     *
     * @param alert The alert to render.
     */
    alert(alert: Alert) {
        if (!alert.message) {
            this.alerts = [];
            this.alertsSubject.next(this.alerts);
        } else {
            // set id for alert if not already set and update subject for onAlert
            alert.id = alert.id || this.defaultId;
            this.subject.next(alert);

            // add alert to array of alerts currently rendered and update subj
            this.alerts.push(alert);
            this.alertsSubject.next(this.alerts);

            // auto close alert if required
            if (alert.autoClose) {
                setTimeout(() => this.removeAlert(alert), 3000);
            }
        }
    }

    /**
     * Clears alerts by emitting an Alert with empty message. AlertComponent has
     * logic to clear alerts when next Alert has empty message.
     *
     * @param id Optional id to set for the alert.
     */
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }

    removeAlert(alert: Alert) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        if (alert.fade) {
            const a = this.alerts.find((x) => x === alert);
            // fade out alert
            if (a) {
                a.fade = true;
            }

            // remove alert after faded out
            setTimeout(() => {
                this.alerts = this.alerts.filter((x) => x !== alert);
                this.alertsSubject.next(this.alerts);
            }, 250);
        } else {
            // remove alert
            this.alerts = this.alerts.filter((x) => x !== alert);
            this.alertsSubject.next(this.alerts);
        }
    }
}
