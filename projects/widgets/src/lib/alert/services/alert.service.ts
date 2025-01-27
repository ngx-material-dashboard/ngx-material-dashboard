/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { Injectable } from '@angular/core';
import { Subject, Observable, filter, BehaviorSubject } from 'rxjs';
import { AlertType } from '../enums/alert-type.enum';
import { AlertInterface } from '../interfaces/alert.interface';
import { Alert } from '../models/alert.model';

/**
 * The `AlertService` provides convenience methods for emitting alert messages
 * of type error, info, success, and warn.
 */
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    /** List of alerts that should be rendered on screen. */
    private alerts: Alert[] = [];
    /** Subject used to emit latest list of alerts. */
    private alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<
        Alert[]
    >(this.alerts);
    /** Observable of list of alerts. */
    alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

    /** Subject used to emit latest alert added to array of alerts. */
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
    error(message: string, options?: AlertInterface): void {
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    /**
     * Emits the given message as an info alert.
     *
     * @param message The message to render in the alert.
     * @param options Optional options to include for alert.
     */
    info(message: string, options?: AlertInterface): void {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    /**
     * Emits the given message as a success alert.
     *
     * @param message The message to render in the alert.
     * @param options Optional options to include for alert.
     */
    success(message: string, options?: AlertInterface): void {
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    /**
     * Emits the given message as a warning alert.
     *
     * @param message The message to render in the alert.
     * @param options Optional options to include for alert.
     */
    warn(message: string, options?: AlertInterface): void {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    /**
     * Emits the given alert. You should not need to call this method directly
     * unless you define alerts other than error, info, success, or warn.
     * Leaving this public so that is available as an option though...
     *
     * @param alert The alert to render.
     */
    alert(alert: Alert): void {
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
    clear(id = this.defaultId): void {
        this.subject.next(new Alert({ id }));
    }

    /**
     * Removes the given alert from array of alerts (if it is still in array).
     *
     * @param alert The alert to remove;
     */
    removeAlert(alert: Alert): void {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        this.alerts = this.alerts.filter((x) => x !== alert);
        this.alertsSubject.next(this.alerts);
    }
}
