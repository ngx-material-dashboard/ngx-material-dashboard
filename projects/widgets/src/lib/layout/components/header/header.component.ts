import {
    AfterContentInit,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import {
    faBars,
    faMicrophone,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FilterDropDownComponent } from '../../../toolbar/components/filter-drop-down/filter-drop-down.component';

/**
 * The header for the app.
 */
@Component({
    selector: 'ngx-material-dashboard-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterContentInit {
    /** A reference to the optional filter drop down to include. */
    @ContentChild(FilterDropDownComponent) filter?: FilterDropDownComponent;
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

    ngAfterContentInit(): void {
        if (this.filter) {
            this.filter.searchClick.subscribe((val: boolean) => {
                this.searchFilterClick.emit(val);
            });
        }
    }

    /**
     * Emits the event to toggle the sidenav menu when the user clicks the bars.
     */
    onToggleSidenav(): void {
        this.toggleSidenav.emit(true);
    }
}
