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
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderUserLoginComponent } from './components/header-user-login/header-user-login.component';
import { HeaderUserMenuComponent } from './components/header-user-menu/header-user-menu.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DefaultLayoutComponent } from './pages/default-layout/default-layout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './services/loading.service';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HeaderUserLoginComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        DefaultLayoutComponent,
        SidenavComponent,
        LoadingComponent,
        ThemeSwitcherComponent
    ],
    exports: [
        DefaultLayoutComponent,
        LoadingComponent,
        SidenavComponent,
        ThemeSwitcherComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatBadgeModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatToolbarModule,
        FontAwesomeModule,
        ToolbarModule
    ],
    providers: [LoadingService]
})
export class LayoutModule {}
