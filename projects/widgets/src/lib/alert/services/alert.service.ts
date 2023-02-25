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
    alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
    alerts: Observable<Alert[]> = this.alertsSubject.asObservable();
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
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
        this.alertsSubject.next([...this.alertsSubject.value, alert]);
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
}
