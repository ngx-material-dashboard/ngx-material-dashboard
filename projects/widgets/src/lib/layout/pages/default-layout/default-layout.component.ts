import { Component, Input, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { SidenavItem } from '../../interfaces/sidenav.interface';

/**
 * Defines the default layout for the app, which consists of the header, footer,
 * and main content based on the current route. The layout should have a sticky
 * footer, meaning if the main content is not tall enough to fill the existing
 * space, then the footer will stick to the bottom of the page.
 */
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

    @Input() company = '';
    @Input() logo = 'My App';
    @Input() sidenavItems: SidenavItem[] = [];
    /** Boolean indicating whether the screen size is small (defaults to false). */
    @Input() isSmallScreen = false;
    /** The sidenav defined in the template. */
    @ViewChild('sidenav') sidenav!: MatSidenav;
    /** The mode for the drawer (i.e. 'over', 'push', or 'side'). */
    mode: MatDrawerMode = 'side';

    /**
     * Toggles the sidenav.
     */
    toggleSidenav(): void {
        this.sidenav.toggle();
    }
}
