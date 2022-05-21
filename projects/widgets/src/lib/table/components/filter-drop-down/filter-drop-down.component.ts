import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCaretDown, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'ngx-material-dashboard-filter-drop-down',
    templateUrl: './filter-drop-down.component.html',
    styleUrls: ['./filter-drop-down.component.scss']
})
export class FilterDropDownComponent implements AfterViewInit, OnInit {

    @Output() searchClick: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('searchField', { static: true, read: ElementRef }) field!: ElementRef<HTMLElement>;
    faCaretDown: IconDefinition = faCaretDown;
    faSearch: IconDefinition = faSearch;
    menuWidth: any;

    constructor(private formBuilder: FormBuilder) { }

    ngAfterViewInit(): void {
        // wait a tick to avoid expressionchangedafterithasbeencheckederror
        setTimeout(() => this.menuWidth = this.field.nativeElement.clientWidth);
    }

    ngOnInit(): void {
        // this.form = this.formBuilder.group({
        //     search: null // { value: null, disabled: true }
        // });
        // this.parentForm.addControl('searchForm', this.form);
    }

    clear(): void {

    }

    search(): void {
        this.searchClick.emit(true);
    }

}
