import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { ButtonClick } from '../../interfaces/button-click.interface';
import { ToolbarButton } from '../../interfaces/toolbar-button.interface';
import { SorterComponent } from '../sorter/sorter.component';

@Component({
    selector: 'ngx-material-dashboard-compact-paged-toolbar',
    templateUrl: './compact-paged-toolbar.component.html',
    styleUrls: ['./compact-paged-toolbar.component.css']
})
export class CompactPagedToolbarComponent<T extends JsonModel> {

    /** The management buttons to display in the toolbar. */
    @Input() buttons: ToolbarButton[] = [];
    @Input() displaySelectAll: boolean = true;
    @Input() displaySort: boolean = true;
    @Input() fields: string[] = [];
    @Input() isAllSelected: boolean = false;
    @Input() length: number = 0;
    @Input() multiple: boolean = true;
    @Input() pageSize: number = 25;
    /** The model to track items selected in the table. */
    @Input() selection: SelectionModel<T> = new SelectionModel<T>(this.multiple, []);;
    /** Event emitted when user clicks button in toolbar. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    @Output() masterToggle: EventEmitter<boolean>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(SorterComponent) sort!: SorterComponent;
    /** The subscriptions for the component. */
    sub: Subscription;

    constructor() {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.masterToggle = new EventEmitter<boolean>();
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

    /**
     * Emits a masterToggle event to the parent with the latest value for the
     * master toggle checkbox.
     *
     * @param check The checkbox change event. 
     */
    emitMasterToggle(check: MatCheckboxChange): void {
        this.masterToggle.emit(check.checked);
    }
}
