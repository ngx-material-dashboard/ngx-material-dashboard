import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { faArrowDownShortWide, faArrowUpWideShort, faCaretDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SortOrder } from '../../interfaces/sort-order.interface';

@Component({
  selector: 'ngx-material-dashboard-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css']
})
export class SorterComponent implements OnInit {

    /** The fontawesome icon. */
    faCaretDown: IconDefinition = faCaretDown;
    faSort: IconDefinition = faArrowUpWideShort;
    selectOptions: { field: string, icon: IconDefinition, order: string }[] = [];
    @Input() options: string[] = [];
    @Input() order: 'asc' | 'desc' = 'asc';
    @Input() selectedOption: string = '';
    @Output() sort = new EventEmitter<SortOrder>();

    ngOnInit(): void {
        for(const option of this.options) {
            console.log(option);
            this.selectOptions.push({ field: option, icon: faArrowUpWideShort, order: 'Asc' });
            this.selectOptions.push({ field: option, icon: faArrowDownShortWide, order: 'Desc' });
        }
    }

    onSelectionChange(event: MatSelectChange): void {
        this.selectedOption = event.value.field;
        this.faSort = event.value.icon;
        this.order = event.value.order;

        this.sort.emit({ sort: this.selectedOption, order: this.order.toLowerCase() });
    }

}
