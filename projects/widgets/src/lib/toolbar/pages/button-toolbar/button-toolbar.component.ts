/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonClick } from '../../interfaces/button-click.interface';
import { ToolbarButton } from '../../interfaces/toolbar-button.interface';

/**
 * A wrapper for `MatToolbar` to control how buttons are rendered in the
 * toolbar. Basically just left or right alignment in the toolbar. It also
 * includes the ability to render custom content in the middle of the toolbar,
 * for things like the search filter drop down meant to be rendered above
 * paged collections in any component that utilizes the
 * `PagedCollectionWithToolbar`.
 */
@Component({
    selector: 'ngx-mat-button-toolbar',
    templateUrl: './button-toolbar.component.html',
    styleUrls: ['./button-toolbar.component.css']
})
export class ButtonToolbarComponent {
    /** The management buttons to display in the toolbar. */
    @Input() buttons: ToolbarButton[] = [];
    /**
     * String value indicating whether buttons should appear on left or right
     * side of screen (defaults to right).
     */
    @Input() buttonAlign: 'left' | 'right' = 'right';
    /** Event emitted when user clicks button in toolbar. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** The subscriptions for the component. */
    sub: Subscription;

    constructor() {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.sub = new Subscription();
    }

    /**
     * Emits a buttonClick event to the parent.
     *
     * @param buttonClick The action from the button that was clicked by the user.
     */
    emitButtonClick(buttonClick: ButtonClick): void {
        this.buttonClick.emit(buttonClick);
    }
}
