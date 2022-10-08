import { AfterContentInit, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { faBars, faMicrophone, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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

    @ContentChild(FilterDropDownComponent) filter?: FilterDropDownComponent;
    @Input() logo = 'My App';
    @Output() clickSearchFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * The bars icon to display in the header.
     */
    faBars: IconDefinition = faBars;

    ngAfterContentInit(): void {
        if (this.filter) {
            this.filter.searchClick.subscribe((val: boolean) => {
                this.clickSearchFilter.emit(val);
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
