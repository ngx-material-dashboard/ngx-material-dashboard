import { Component, Input } from '@angular/core';

/**
 * A simple footer for the app. Renders a copyright symbol with the current
 * date and an optional company name.
 */
@Component({
    selector: 'ngx-material-dashboard-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    /** Text to display next to copyright date. */
    @Input() company = '';
    /** The current date to use when displaying the copyright notice. */
    date: Date = new Date(Date.now());
}
