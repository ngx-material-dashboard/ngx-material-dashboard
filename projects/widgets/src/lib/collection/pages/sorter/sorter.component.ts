import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { faArrowDownShortWide, faArrowUpWideShort, faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SortOrder } from '../../interfaces/sort-order.interface';

/**
 * A custom component meant to allow user to change sort order for paged
 * collections. This is basically just a wrapper around `MatSelect` providing
 * some additional display details and an @Output emitter for the field to
 * sort on and order selected needed in the parent component to handle the
 * sort change for the collection.
 */
@Component({
  selector: 'ngx-material-dashboard-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css']
})
export class SorterComponent implements OnInit {

    /** The icon used for displaying current sort order. */
    faSort: IconDefinition = faArrowUpWideShort;
    /** The options to display in the select drop down. */
    selectOptions: { field: string, icon: IconDefinition, order: string }[] = [];
    /** The list of fields to include in the sort. */
    @Input() options: string[] = [];
    /** The order for the sort (either asc or desc). */
    @Input() order: 'asc' | 'desc' = 'asc';
    /** The default field to sort on. */
    @Input() selectedOption: string = '';
    /** The event emitted when the user selects an option in the drop down. */
    @Output() sort = new EventEmitter<SortOrder>();

    /**
     * Lifecycle method automatically called by angular when the component is
     * initialized.
     */
    ngOnInit(): void {
        for(const option of this.options) {
            this.selectOptions.push({ field: option, icon: faArrowUpWideShort, order: 'Asc' });
            this.selectOptions.push({ field: option, icon: faArrowDownShortWide, order: 'Desc' });
        }
    }

    /**
     * Handler for when the user selects an option in the drop down. Emits the
     * needed sort event to the parent so it can handle changing the sort
     * order for the data in the collection.
     *
     * @param event The event containing the value selected in the drop down.
     */
    onSelectionChange(event: MatSelectChange): void {
        this.selectedOption = event.value.field;
        this.faSort = event.value.icon;
        this.order = event.value.order;

        this.sort.emit({ sort: this.selectedOption, order: this.order.toLowerCase() });
    }

}
