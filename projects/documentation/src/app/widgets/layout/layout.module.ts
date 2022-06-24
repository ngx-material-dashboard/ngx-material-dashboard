import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule as DashboardLayoutModule } from '@ngx-material-dashboard/widgets';
import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatSidenavModule,
        DashboardLayoutModule
    ]
})
export class LayoutModule { }
