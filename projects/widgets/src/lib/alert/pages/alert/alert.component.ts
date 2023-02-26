import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertsComponent } from '../../components/alerts/alerts.component';
import { AlertService } from '../../services/alert.service';

/**
 * `Alert` handles rendering and managing the OverlayRef needed to render
 * alerts on screen (on top of main content).
 */
@Component({
    selector: 'ngx-material-dashboard-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnDestroy, OnInit {
    private overlayRef?: OverlayRef;
    private sub: Subscription;

    constructor(private alertService: AlertService, private overlay: Overlay) {
        this.sub = new Subscription();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        const sub = this.alertService.onAlert().subscribe((alert) => {
            if (alert.message) {
                // create overlay if overlayRef not defined
                if (!this.overlayRef) {
                    const overlayRef = this.overlay.create();
                    this.overlayRef = overlayRef;
                    this.overlayRef.updateSize({ width: '100%' });

                    //create portal to render component
                    const componentPortal = new ComponentPortal(
                        AlertsComponent
                    );

                    // render portal in overlay
                    const compRef = this.overlayRef.attach(componentPortal);

                    // set alerts on AlertsComponent since subscription for
                    // onAlert there won't work for this one as its already
                    // been fired
                    compRef.instance.alerts = [alert];

                    // auto close alert if required
                    if (alert.autoClose) {
                        setTimeout(
                            () => compRef.instance.removeAlert(alert),
                            3000
                        );
                    }
                }
            }
        });
        this.sub.add(sub);

        // create subscription for clear overlay event emitter and
        // dispose of the overlay so components behind are availabe
        const subArray = this.alertService.alerts$.subscribe((res) => {
            if (res.length === 0) {
                this.overlayRef?.dispose();
                this.overlayRef = undefined;
            }
        });
        this.sub.add(subArray);
    }
}
