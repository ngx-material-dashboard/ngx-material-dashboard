import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { faSearch, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ButtonClick } from '../../interfaces/button-click.interface';
import { TableToolbarButton } from '../../interfaces/table-toolbar-button.interface';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * The TableToolbarComponent is a toolbar that is rendered above a PagedTableComponent.
 */
@Component({
    selector: 'app-table-toolbar',
    templateUrl: './table-toolbar.component.html',
    styleUrls: ['./table-toolbar.component.scss']
})
export class TableToolbarComponent implements AfterViewInit, OnDestroy, OnInit {

    /** The management buttons to display in the toolbar. */
    @Input() buttons: TableToolbarButton[] = [];
    /**
     * String value indicating whether buttons should appear on left or right
     * side of screen (defaults to right).
     */
    @Input() buttonAlign: 'left' | 'right' = 'right';
    /** Event emitted when user clicks button in toolbar. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** Event emitted when user changes value in filter. */
    @Output() filter: EventEmitter<string>;
    /** A reference to the input used for the filter in the template. */
    @ViewChild('filter') filterInput!: ElementRef;
    /** The search icon to display with the filter. */
    faSearch: IconDefinition = faSearch;
    /** The icon to clear the filter. */
    faTimes: IconDefinition = faTimes;
    /** The subscriptions for the component. */
    sub: Subscription;

    constructor() {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.filter = new EventEmitter<string>();
        this.sub = new Subscription();
    }

    /**
     * Sets up a subscription to the filterInput keyup event so changes to the
     * filter input can be emitted to the parent to handle actual filtering.
     */
    ngAfterViewInit(): void {
        // const sub = fromEvent(this.filterInput.nativeElement, 'keyup')
        //     .pipe(
        //         debounceTime(150),
        //         distinctUntilChanged()
        //     ).subscribe(() => {
        //         this.filter.emit(this.filterInput.nativeElement.value);
        //     });
        // this.sub.add(sub);
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
     * Clear the the input and emit a blank filter to refresh the datasource.
     */
    clear(): void {
        this.filterInput.nativeElement.value = '';
        this.filter.emit(this.filterInput.nativeElement.value);
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
