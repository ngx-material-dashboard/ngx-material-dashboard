/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import {
    AfterContentInit,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnDestroy,
    Output
} from '@angular/core';
import { faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FilterDropDownComponent } from '../../../toolbar/components/filter-drop-down/filter-drop-down.component';
import { Subscription } from 'rxjs';

/**
 * The header for the app.
 */
@Component({
    selector: 'ngx-mat-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentInit, OnDestroy {
    /** A reference to the optional filter drop down to include. */
    @ContentChild(FilterDropDownComponent) filter?: FilterDropDownComponent;
    @Input() displayThemeSwitcher: boolean = true;
    /** The main "logo" text for the app. */
    @Input() logo = 'My App';
    /** Event emitted when user clicks search button in drop down filter. */
    @Output() searchFilterClick: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    /** Event emitted when user clicks button to toggle sidenav. */
    @Output() toggleSidenav: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    /**
     * The bars icon to display in the header.
     */
    faBars: IconDefinition = faBars;
    /** The subscriptions in the component. */
    private sub: Subscription = new Subscription();

    ngAfterContentInit(): void {
        if (this.filter) {
            const sub = this.filter.searchClick.subscribe((val: boolean) => {
                this.searchFilterClick.emit(val);
            });
            this.sub.add(sub);
        }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Emits the event to toggle the sidenav menu when the user clicks the bars.
     */
    onToggleSidenav(): void {
        this.toggleSidenav.emit(true);
    }
}
