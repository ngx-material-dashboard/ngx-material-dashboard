/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderComponent } from '../../components/header/header.component';

import { SidenavItem } from '../../interfaces/sidenav.interface';
import { SidenavUtilService } from '../../services/sidenav-util.service';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import {
    AnimationGroupMetadata,
    animate,
    animateChild,
    group,
    query
} from '@angular/animations';
import { sidebarOpen } from 'angular-material-rail-drawer';

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
 */
@Component({
    selector: 'ngx-mat-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements AfterViewInit {
    /** Text to display next to copyright date. */
    @Input() company = '';
    /** The main "logo" text for the app to display in the header. */
    @Input() logo = 'My App';
    /** The mode for the drawer (i.e. 'over', 'push', 'side', or 'rail'). */
    @Input() mode: any = 'side';
    /** List of items to render in the sidenav. */
    @Input() sidenavItems: SidenavItem[] = [];
    /** Boolean indicating whether the screen size is small (defaults to false). */
    @Input() isSmallScreen = false;
    /** Event emitted when user clicks search button in filter. */
    @Output() clickSearch: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild(HeaderComponent) header!: HeaderComponent;
    @ViewChild(SidenavComponent, { read: ElementRef })
    sidenavElement!: ElementRef;
    /** The sidenav defined in the template. */
    @ViewChild('sidenav') sidenav!: MatSidenav;
    defaultDuration: string = '100ms';
    /** Boolean indicating  */
    opened: boolean = true;
    sidenavWidth: number = 200;
    width: string = `${this.sidenavWidth}px`;

    constructor(
        private sidenavUtilService: SidenavUtilService,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngAfterViewInit(): void {
        this.sidenavWidth = this.sidenavElement.nativeElement.offsetWidth + 20;
        this.width = `${this.sidenavWidth}px`;
        this.changeDetector.detectChanges();
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
            query('@labelAnimation', animateChild(), { optional: true }),
            animate(`${animationDuration} ease-in-out`, sidebarOpen(maxWidth))
        ]);
    }

    /**
     * Toggles the sidenav.
     */
    toggleSidenav(): void {
        this.sidenav.opened = !this.sidenav.opened;
        this.sidenav.toggle(this.sidenav.opened);
        this.opened = this.sidenav.opened;
        this.sidenavUtilService.toggleSidenavMenu(this.opened);
    }
}
