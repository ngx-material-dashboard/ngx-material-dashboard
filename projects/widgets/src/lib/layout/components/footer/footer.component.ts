import { Component, Input } from '@angular/core';

/**
 * A simple footer for the app.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    @Input() company = '';
    /** The current date to use when displaying the copyright notice. */
    date: Date = new Date(Date.now());
}
