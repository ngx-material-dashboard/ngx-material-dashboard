/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './pages/alert/alert.component';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayModule } from '@angular/cdk/overlay';
import { AlertsComponent } from './components/alerts/alerts.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [AlertComponent, AlertsComponent],
    exports: [AlertComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        OverlayModule,
        FontAwesomeModule
    ]
})
export class AlertModule {}
