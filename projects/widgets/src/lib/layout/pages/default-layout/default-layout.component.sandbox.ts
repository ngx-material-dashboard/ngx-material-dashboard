/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faCartFlatbed,
    faClipboardCheck,
    faClipboardList,
    faHourglassEnd,
    faHourglassHalf,
    faHourglassStart
} from '@fortawesome/free-solid-svg-icons';
import { sandboxOf } from 'angular-playground';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderUserLoginComponent } from '../../components/header-user-login/header-user-login.component';
import { HeaderUserMenuComponent } from '../../components/header-user-menu/header-user-menu.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { LoadingService } from '../../services/loading.service';
import { DefaultLayoutComponent } from './default-layout.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ThemeSwitcherComponent } from '../../components/theme-switcher/theme-switcher.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IconModule } from '../../../icon/icon.module';
import { MatMenuModule } from '@angular/material/menu';

export default sandboxOf(DefaultLayoutComponent, {
    declarations: [
        DefaultLayoutComponent,
        HeaderComponent,
        FooterComponent,
        HeaderUserLoginComponent,
        HeaderUserMenuComponent,
        LoadingComponent,
        SidenavComponent,
        ThemeSwitcherComponent
    ],
    imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatBadgeModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatToolbarModule,
        FontAwesomeModule,
        IconModule,
        ToolbarModule
    ],
    providers: [LoadingService]
})
    .add('default sidenav (no input values)', {
        template: `<ngx-mat-default-layout></ngx-mat-default-layout>`
    })
    .add('side sidenav mode', {
        template: `<ngx-mat-default-layout [logo]="logo" [mode]="mode" [sidenavItems]="sidenavItems"></ngx-mat-default-layout>`,
        context: {
            logo: 'My Tasks',
            mode: 'side',
            sidenavItems: [
                {
                    icon: faClipboardList,
                    queryParams: { isComplete: false },
                    route: ['tasks'],
                    text: 'Pending',
                    selector: 'pending'
                },
                {
                    icon: faHourglassEnd,
                    queryParams: { isComplete: false, filter: 'overdue' },
                    route: ['tasks'],
                    text: 'Over Due',
                    selector: 'over-due'
                },
                {
                    icon: faHourglassHalf,
                    queryParams: { isComplete: false, filter: 'today' },
                    route: ['tasks'],
                    text: 'Due Today',
                    selector: 'due-today'
                },
                {
                    badge: 1000,
                    icon: faHourglassStart,
                    queryParams: { isComplete: false, filter: 'tomorrow' },
                    route: ['tasks'],
                    text: 'Due Tomorrow',
                    selector: 'due-tomorrow'
                },
                {
                    icon: faClipboardCheck,
                    queryParams: { isComplete: true },
                    route: ['tasks'],
                    text: 'Complete',
                    selector: 'complete'
                },
                {
                    icon: faCartFlatbed,
                    queryParams: {},
                    route: ['wide-icon'],
                    text: 'Wide Icon',
                    selector: 'wide-icon'
                }
            ]
        }
    })
    .add('rail sidenav mode', {
        template: `<ngx-mat-default-layout [logo]="logo" [mode]="mode" [sidenavItems]="sidenavItems"></ngx-mat-default-layout>`,
        context: {
            logo: 'My Tasks',
            mode: 'rail',
            sidenavItems: [
                {
                    icon: faClipboardList,
                    queryParams: { isComplete: false },
                    route: ['tasks'],
                    text: 'Pending',
                    selector: 'pending'
                },
                {
                    icon: faHourglassEnd,
                    queryParams: { isComplete: false, filter: 'overdue' },
                    route: ['tasks'],
                    text: 'Over Due',
                    selector: 'over-due'
                },
                {
                    icon: faHourglassHalf,
                    queryParams: { isComplete: false, filter: 'today' },
                    route: ['tasks'],
                    text: 'Due Today',
                    selector: 'due-today'
                },
                {
                    icon: faHourglassStart,
                    queryParams: { isComplete: false, filter: 'tomorrow' },
                    route: ['tasks'],
                    text: 'Due Tomorrow',
                    selector: 'due-tomorrow'
                },
                {
                    icon: faClipboardCheck,
                    queryParams: { isComplete: true },
                    route: ['tasks'],
                    text: 'Complete',
                    selector: 'complete'
                },
                {
                    icon: faCartFlatbed,
                    queryParams: {},
                    route: ['wide-icon'],
                    text: 'Wide Icon',
                    selector: 'wide-icon'
                }
            ]
        }
    })
    .add('rail sidenav mode with badges', {
        template: `<ngx-mat-default-layout [logo]="logo" [mode]="mode" [sidenavItems]="sidenavItems"></ngx-mat-default-layout>`,
        context: {
            logo: 'My Tasks',
            mode: 'rail',
            sidenavItems: [
                {
                    badge: 5,
                    icon: faClipboardList,
                    queryParams: { isComplete: false },
                    route: ['tasks'],
                    text: 'Pending',
                    selector: 'pending'
                },
                {
                    badge: 10,
                    icon: faHourglassEnd,
                    queryParams: { isComplete: false, filter: 'overdue' },
                    route: ['tasks'],
                    text: 'Over Due',
                    selector: 'over-due'
                },
                {
                    icon: faHourglassHalf,
                    queryParams: { isComplete: false, filter: 'today' },
                    route: ['tasks'],
                    text: 'Due Today',
                    selector: 'due-today'
                },
                {
                    badge: 1000,
                    icon: faHourglassStart,
                    queryParams: { isComplete: false, filter: 'tomorrow' },
                    route: ['tasks'],
                    text: 'Due Tomorrow',
                    selector: 'due-tomorrow'
                },
                {
                    badge: 100,
                    icon: faClipboardCheck,
                    queryParams: { isComplete: true },
                    route: ['tasks'],
                    text: 'Complete',
                    selector: 'complete'
                },
                {
                    icon: faCartFlatbed,
                    queryParams: {},
                    route: ['wide-icon'],
                    text: 'Wide Icon',
                    selector: 'wide-icon'
                }
            ]
        }
    })
    .add('rail sidenav mode with mixed icons (fa and mat)', {
        template: `<ngx-mat-default-layout [logo]="logo" [mode]="mode" [sidenavItems]="sidenavItems"></ngx-mat-default-layout>`,
        context: {
            logo: 'My Tasks',
            mode: 'rail',
            sidenavItems: [
                {
                    icon: faClipboardList,
                    queryParams: { isComplete: false },
                    route: ['tasks'],
                    text: 'Pending',
                    selector: 'pending'
                },
                {
                    icon: faHourglassEnd,
                    queryParams: { isComplete: false, filter: 'overdue' },
                    route: ['tasks'],
                    text: 'Over Due',
                    selector: 'over-due'
                },
                {
                    icon: faHourglassHalf,
                    queryParams: { isComplete: false, filter: 'today' },
                    route: ['tasks'],
                    text: 'Due Today',
                    selector: 'due-today'
                },
                {
                    icon: faHourglassStart,
                    queryParams: { isComplete: false, filter: 'tomorrow' },
                    route: ['tasks'],
                    text: 'Due Tomorrow',
                    selector: 'due-tomorrow'
                },
                {
                    icon: faClipboardCheck,
                    queryParams: { isComplete: true },
                    route: ['tasks'],
                    text: 'Complete',
                    selector: 'complete'
                },
                {
                    icon: 'kitchen',
                    queryParams: {},
                    route: ['wide-icon'],
                    text: 'Wide Icon',
                    selector: 'wide-icon'
                }
            ]
        }
    })
    .add('header with filter', {
        template: `
        <ngx-mat-default-layout>
            <ngx-mat-filter-drop-down filter>
                <form fxFlex>
                    <mat-form-field fxFlex>
                        <mat-label>Filter Something</mat-label>
                        <input matInput placeholder="Placeholder">
                    </mat-form-field>
                </form>
            </ngx-mat-filter-drop-down>
        </ngx-mat-default-layout>`
    }).add('header with filter and right toggle', {
        template: `
        <ngx-mat-default-layout>
            <ngx-mat-filter-drop-down filter>
                <form fxFlex>
                    <mat-form-field fxFlex>
                        <mat-label>Filter Something</mat-label>
                        <input matInput placeholder="Placeholder">
                    </mat-form-field>
                </form>
            </ngx-mat-filter-drop-down>
            <div rightToggle>
                <button mat-button [matMenuTriggerFor]="menu">Menu</button>
                <mat-menu #menu="matMenu">
                    <button mat-menu-item>Item 1</button>
                    <button mat-menu-item>Item 2</button>
                </mat-menu>
            </div>
        </ngx-mat-default-layout>`
    });
