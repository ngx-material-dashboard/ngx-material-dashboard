import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ButtonClick } from '../../interfaces/button-click.interface';
import { ToolbarButton } from '../../interfaces/toolbar-button.interface';

@Component({
  selector: 'ngx-material-dashboard-button-toolbar',
  templateUrl: './button-toolbar.component.html',
  styleUrls: ['./button-toolbar.component.css']
})
export class ButtonToolbarComponent implements OnInit {

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

    ngOnInit(): void {
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
