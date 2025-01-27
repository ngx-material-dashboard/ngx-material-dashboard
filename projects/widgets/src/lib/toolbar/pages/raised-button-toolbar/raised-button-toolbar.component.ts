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
 * A toolbar that renders `mat-raised-button`s in a `MatToolbar`. As a result
 * this is a larger toolbar, and can be used in things like the main header of
 * your application, or anywhere you need to include 1 or more left or right
 * aligned buttons in a row in your application. It is used internally by
 * components that utilize the `PagedCollectionWithRaisedButtonToolbar`. You
 * can take a look at
 * [PagedCollectionWithRaisedButtonToolbar](/widgets/collection/overview#paged-collection-with-raised-button-toolbar-component)
 * for an example of how you can use this component.
 *
 * @overviewDetails
 *
 * #### Features
 *
 * The toolbar allows you to control the alignment of buttons (i.e. left or
 * right). It also includes the ability to render an optional `FilterDropDown`.
 *
 * ##### Button Alignment
 *
 * To align buttons to the left or right simply use the `buttonAlign` input
 * with the desired `left` or `right` value. Buttons default to be `right`
 * aligned.
 *
 * ##### Optional Filter Drop Down
 *
 * You may include an optional `FilterDropDown` that renders a detailed formed
 * to filter paged collections. See the following for more details on the
 * [FilterDropDown](/widgets/toolbar/overview#filter-drop-down-component).
 */
@Component({
    selector: 'ngx-mat-raised-button-toolbar',
    templateUrl: './raised-button-toolbar.component.html',
    styleUrls: ['./raised-button-toolbar.component.css']
})
export class RaisedButtonToolbarComponent {
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
