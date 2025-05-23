/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToolbarButton } from '../../toolbar/interfaces/toolbar-button.interface';

/**
 * Tracks and emits changes to `SelectionModel`. Also provides convenience
 * method for enabling/disabling `ToolbarButton`s. Currently used by the
 * `PagedTable` to handle when the user selects one or more rows in the table
 * or clicks on the select all checkbox. It can be used anywhere select boxes
 * are used, but you will need to initialize the service and handle selection
 * changes manually if you want to use this anywhere else right now.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```html
 * <div *ngFor="let thing of things">
 *     <mat-checkbox (click)="$event.stopPropagation()"
 *         (change)="onSelected(thing);"
 *         [checked]="selection.isSelected(thing)">
 *     </mat-checkbox>
 *     <span>{{{thing.name}}}</span>
 * </div>
 * ```
 * ```typescript
 * import {SelectionModel} from '@angular/cdk/collections';
 * import {Component} from '@angular/core';
 * import {SelectionService} from '@ngx-material-dashboard/widgets';
 *
 * @Component({
 *     selector: 'selection-example',
 *     templateUrl: './selection-example.html'
 * })
 * export class SelectionExample<T> {
 *
 *     selection: SelectionModel<T>;
 *     things: T[] = []; // assuming this is initialized and filled with data
 *
 *     constructor(private selectionService: SelectionService<T>) {
 *         this.selection = new SelectionModel<T>(true, []);
 *         this.selectionService.selectionSubject.next(this.selection);
 *     }
 *
 *     onSelected(val: T): void {
 *         this.selection.toggle(val);
 *         // update the selection in the selectionService
 *         this.selectionService.selectionSubject.next(this.selection);
 *     }
 * }
 * ```
 */
@Injectable()
export class SelectionService<T> {
    /** The observable that tracks the model that tracks items selected in table. */
    selection: Observable<SelectionModel<T>>;
    /** The subject that tracks the model that tracks items selected in table. */
    selectionSubject: BehaviorSubject<SelectionModel<T>>;
    /** The observable that tracks the selection change made by user. */
    selectionChange: Observable<boolean>;
    /** The subject that tracks the selection change made by the user. */
    selectionChangeSubject: BehaviorSubject<boolean>;

    constructor() {
        this.selectionSubject = new BehaviorSubject<SelectionModel<T>>(
            new SelectionModel<T>(true, [])
        );
        this.selection = this.selectionSubject.asObservable();
        this.selectionChangeSubject = new BehaviorSubject<boolean>(true);
        this.selectionChange = this.selectionChangeSubject.asObservable();
    }

    /**
     * Returns the current `SelectionModel` value.
     */
    get selectionValue(): SelectionModel<T> {
        return this.selectionSubject.value;
    }

    /**
     * Enables or disables the ToolbarButtons based on the given disabled boolean value. If the given
     * disabled value is false (meaning the buttons should be enabled), then an additional check is
     * required to disable any buttons if more than one row is selected and the ToolbarButton has a
     * multiSelectDisabled value of true. Currently only "Edit" buttons should be disabled if more than
     * one row is selected in the table since we don't want to handle modifying multiple data values at
     * once.
     *
     * @param disabled Set to true if the ToolbarButtons should be disabled.
     */
    toggleButtons(disabled: boolean, buttons: ToolbarButton[]): void {
        buttons.forEach((button: ToolbarButton) => {
            this.toggleButton(button, disabled);
        });
    }

    private toggleButton(button: ToolbarButton, disabled: boolean): void {
        if (
            !disabled &&
            this.selectionValue.selected.length > 1 &&
            button.multiSelectDisabled
        ) {
            // disable the ToolbarButton if more than one element is selected and the button does
            // not allow multiple selections (i.e. "Edit" buttons)
            button.disabled = true;
        } else {
            button.disabled = disabled;
            // if (!disabled && button.click === 'delete') {
            //     // if the buttons should be enabled and the current button is the delete button, then
            //     // the delete button should only be enabled if the rows selected in the table are
            //     // deletable; find all rows that cannot be deleted (rows that have deletable property and
            //     // deletable set to false)
            //     const nonDeletableRows = this.selectionValue.selected.filter(it => 'deletable' in it && !it.deletable);
            //     if (nonDeletableRows && nonDeletableRows.length > 0) {
            //         // disable button if there are rows that cannot be deleted in selection
            //         button.disabled = true;
            //     } else {
            //         // enable the delete button if all of the selected rows are deletable (i.e. there are no
            //         // non deletable rows)
            //         button.disabled = false;
            //     }
            // } else {
            //     // set the disabled property for the button based on the given disabled parameter
            //     button.disabled = disabled;
            // }
        }
    }
}
