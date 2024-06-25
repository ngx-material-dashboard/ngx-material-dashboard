/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonClick } from '../../interfaces/button-click.interface';
import { ToolbarButton } from '../../interfaces/toolbar-button.interface';

/**
 * A component for rendering a list of buttons.
 */
@Component({
    selector: 'ngx-mat-icon-buttons',
    templateUrl: './icon-buttons.component.html',
    styleUrls: ['./icon-buttons.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IconButtonsComponent implements OnInit {
    /** The management buttons to display in the toolbar. */
    @Input() buttons: ToolbarButton[] = [];
    /** Event emitted when user clicks button in toolbar. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** The subscriptions for the component. */
    sub: Subscription;

    constructor() {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.sub = new Subscription();
    }

    /**
     * Destroys any subscriptions for the component.
     */
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Initialize the main subscriptions object for the component.
     */
    ngOnInit(): void {
        this.sub = new Subscription();
    }

    /**
     * Emits a buttonClick event to the parent.
     *
     * @param buttonClick The action from the button that was clicked by the user.
     */
    emitButtonClick(buttonClick: string): void {
        this.buttonClick.emit({ click: buttonClick });
    }
}
