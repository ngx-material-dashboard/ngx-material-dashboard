import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faBars, faMicrophone, IconDefinition } from '@fortawesome/free-solid-svg-icons';

/**
 * The header for the app.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Input() logo = 'My App';
    @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * The bars icon to display in the header.
     */
    faBars: IconDefinition = faBars;

    /**
     * Emits the event to toggle the sidenav menu when the user clicks the bars.
     */
    onToggleSidenav(): void {
        this.toggleSidenav.emit(true);
    }
}
