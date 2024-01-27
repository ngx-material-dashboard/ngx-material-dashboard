/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';

import { AlertsComponent } from '../../components/alerts/alerts.component';
import { AlertService } from '../../services/alert.service';

/**
 * `Alert` handles rendering and managing the OverlayRef needed to render
 * alerts on screen (on top of main content).
 */
@Component({
    selector: 'ngx-mat-alert',
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
                    this.overlayRef = this.overlay.create();
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
                }
            }
        });
        this.sub.add(sub);

        // create subscription to check for alert array length, if there aren't
        // any alerts, then clear the overlay so components below can be
        // clicked; include debounceTime in case additional alerts fire so the
        // overlay is kept and we don't miss rendering any alerts...
        const subArray = this.alertService.alerts$
            .pipe(debounceTime(500))
            .subscribe((res) => {
                if (res.length === 0) {
                    this.overlayRef?.dispose();
                    this.overlayRef = undefined;
                }
            });
        this.sub.add(subArray);
    }
}
