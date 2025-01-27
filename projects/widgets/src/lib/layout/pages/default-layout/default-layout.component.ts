/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {
    AnimationGroupMetadata,
    animateChild,
    group,
    query
} from '@angular/animations';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { HeaderComponent } from '../../components/header/header.component';

import { SidenavItem } from '../../interfaces/sidenav.interface';
import { setTheme } from '../../lib/set-theme';
import { SidenavUtilService } from '../../services/sidenav-util.service';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';

/**
 * Defines the default layout for the app, which consists of the header, footer,
 * and main content based on the current route. The layout should have a sticky
 * footer, meaning if the main content is not tall enough to fill the existing
 * space, then the footer will stick to the bottom of the page.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```html
 * <ngx-mat-default-layout [logo]="logo" [sidenavItems]="sidenavItems">
 *  </ngx-mat-default-layout>
 * ```
 * ```typescript
 * import {Component} from '@angular/core';
 * import {SidenavItem} from '@ngx-material-dashboard/widgets';
 *
 * @Component({
 *     selector: 'basic-usage-example',
 *     templateUrl: './basic-usage-example.html'
 * })
 * export class BasicUsageExample {
 *     logo = 'My Tasks';
 *     sidenavItems: SidenavItem[] = [
 *         { queryParams: { isComplete: false }, route: ['tasks'], text: 'Pending', selector: 'pending' },
 *         { queryParams: { isComplete: false, filter: 'overdue' }, route: ['tasks'], text: 'Over Due', selector: 'over-due' },
 *         { queryParams: { isComplete: true }, route: ['tasks'], text: 'Complete', selector: 'complete' }
 *     ];
 * }
 * ```
 *
 * @
 */
@Component({
    selector: 'ngx-mat-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
    /** Text to display next to copyright date. */
    @Input() company = '';
    /** The main "logo" text for the app to display in the header. */
    @Input() logo = 'My App';
    /** The mode for the drawer (i.e. 'over', 'push', 'side', or 'rail'). */
    @Input() mode: MatDrawerMode | 'rail' = 'side';
    /** List of items to render in the sidenav. */
    @Input() sidenavItems: SidenavItem[] = [];
    /** Boolean indicating whether the screen size is small (defaults to false). */
    @Input() isSmallScreen = false;
    @Output() routeActivate: EventEmitter<any> = new EventEmitter<any>();
    /** Event emitted when user clicks search button in filter. */
    @Output() clickSearch: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * @deprecated Not used, will be removed in a later release.
     */
    @ViewChild(HeaderComponent) header!: HeaderComponent;
    /**
     * @deprecated No longer used. Will be removed in a later release.
     */
    @ViewChild(SidenavComponent, { read: ElementRef })
    sidenavElement!: ElementRef;
    /** The sidenav defined in the template. */
    @ViewChild('sidenav') sidenav!: MatSidenav;
    /**
     * @deprecated No longer used. Will be removed in a later release.
     */
    defaultDuration: string = '100ms';
    /**
     * Boolean indicating if sidenav is collapsed (only used if mode = 'rail').
     * Separate from opened, since MatSidenav will always remain open if mode
     * is set to rail. It's just the contents that "collapse".
     */
    collapsed: boolean = true;
    /** Boolean indicating if MatSidenav is open. */
    opened: boolean = true;
    /**
     * @deprecated No longer used. Will be removed in a later release.
     */
    sidenavWidth: number = 200;
    /**
     * @deprecated No longer used. Will be removed in a later release.
     */
    width: string = `${this.sidenavWidth}px`;

    /**
     * Returns the MatDrawerMode for the MatSidenav. If the defined mode is set
     * to 'rail', the MatDrawerMode is set to 'side'. Otherwise the mode should
     * already be a MatDrawerMode, so just return that then.
     */
    get matSidenavMode(): MatDrawerMode {
        if (this.mode === 'rail') {
            return 'side';
        } else {
            return this.mode;
        }
    }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private sidenavUtilService: SidenavUtilService
    ) {}

    ngOnInit(): void {
        setTheme(localStorage.getItem('theme') || 'light', this.document);
    }

    onActivate(cmp: any) {
        this.routeActivate.emit(cmp);
    }

    /**
     * Handler for when the user clicks the search button in the filter.
     *
     * @param res Boolean value to indicate if search button was clicked.
     */
    onSearchFilterClick(res: boolean) {
        this.clickSearch.emit(res);
    }

    /**
     * This is taken directly from angular-material-rail-drawer and is a
     * workaround to issue with sidenav not expanding to fit content.
     *
     * @deprecated No longer used since angular-material-rail-drawer removed. Method will be removed in a future release.
     *
     * @param animationDuration Duration in ms to use for animation.
     * @param maxWidth The maximum expanded width for the sidenav.
     * @returns
     */
    sidebarAnimationOpenGroup(
        animationDuration: string = this.defaultDuration,
        maxWidth: string = this.width
    ): AnimationGroupMetadata {
        return group([
            query('@iconAnimation', animateChild(), { optional: true }),
            query('@labelAnimation', animateChild(), { optional: true })
            // animate(`${animationDuration} ease-in-out`, sidebarOpen(maxWidth))
        ]);
    }

    /**
     * Toggles the sidenav.
     */
    toggleSidenav(): void {
        if (this.mode === 'rail') {
            // if the mode is rail, then the sidenav will always remain open,
            // so use collapsed property instead; this just triggers the
            // sidenav to hide any text and only render icons (making it
            // appear like it collapsed)
            this.collapsed = !this.collapsed;
            this.sidenavUtilService.toggleSidenavMenu(this.collapsed);
        } else {
            this.sidenav.opened = !this.sidenav.opened;
            this.sidenav.toggle(this.sidenav.opened);
            this.opened = this.sidenav.opened;
            this.sidenavUtilService.toggleSidenavMenu(this.opened);
        }
    }
}
