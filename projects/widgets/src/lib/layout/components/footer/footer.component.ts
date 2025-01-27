/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { Component, Input } from '@angular/core';

/**
 * A simple footer for the app. Renders a copyright symbol with the current
 * date and an optional company name.
 */
@Component({
    selector: 'ngx-mat-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    /** Text to display next to copyright date. */
    @Input() company = '';
    /** The current date to use when displaying the copyright notice. */
    date: Date = new Date(Date.now());
}
