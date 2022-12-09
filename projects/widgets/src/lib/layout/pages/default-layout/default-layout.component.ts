import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderComponent } from '../../components/header/header.component';

import { SidenavItem } from '../../interfaces/sidenav.interface';

/**
 * Defines the default layout for the app, which consists of the header, footer,
 * and main content based on the current route. The layout should have a sticky
 * footer, meaning if the main content is not tall enough to fill the existing
 * space, then the footer will stick to the bottom of the page.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```html
 * <ngx-material-dashboard-default-layout [logo]="logo" [sidenavItems]="sidenavItems">
 *  </ngx-material-dashboard-default-layout>
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
  selector: 'ngx-material-dashboard-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

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
    /** The sidenav defined in the template. */
    @ViewChild('sidenav') sidenav!: MatSidenav;

    /**
     * Returns true if sidenav is opened.
     */
    get opened(): boolean {
        return this.sidenav.opened;
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
     * Toggles the sidenav.
     */
    toggleSidenav(): void {
        this.sidenav.opened = !this.sidenav.opened;
        this.sidenav.toggle();
    }
}
