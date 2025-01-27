/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule as DashboardLayoutModule } from '@ngx-material-dashboard/widgets';
import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatSidenavModule,
        DashboardLayoutModule
    ]
})
export class LayoutModule {}
