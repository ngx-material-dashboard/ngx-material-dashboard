import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { DrawerRailModule } from 'angular-material-rail-drawer';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
    declarations: [
        HeaderComponent,
        HeaderUserLoginComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        DefaultLayoutComponent,
        SidenavComponent,
        LoadingComponent
    ],
    exports: [
        DefaultLayoutComponent,
        LoadingComponent,
        SidenavComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatToolbarModule,
        DrawerRailModule,
        FontAwesomeModule,
        ToolbarModule
    ],
    providers: [
        LoadingService
    ]
})
export class LayoutModule { }
