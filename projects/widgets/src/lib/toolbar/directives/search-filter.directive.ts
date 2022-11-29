import { AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { PagedCollectionComponent } from '../../collection/components/paged-collection/paged-collection.component';
import { RemoteDataSource } from '../../collection/services/remote-data-source.service';
import { SearchFilterMap } from '../interfaces/search-filter-map.interface';
import { FilterDropDownComponent } from '../../toolbar/components/filter-drop-down/filter-drop-down.component';

@Directive({
    selector: '[ngxMaterialDashboardSearchFilter]'
})
export class SearchFilterDirective<T extends JsonModel>
    implements OnDestroy {

    /** The filter drop down. */
    @Input() set filter(val: FilterDropDownComponent) {
        if (val && this.collection && this.form) {
            const sub = val.searchClick.subscribe(() => {
                // set dataSource filter based on values entered on searchFilter
                const searchFilterData = this.form.get('searchFilter') as FormGroup;
                this.collection.dataSource.filter = this.buildSearchFilter(searchFilterData);
                this.searchClick.emit(this.collection.dataSource.filter);

                if (this.collection.dataSource instanceof RemoteDataSource) {
                    // refresh the data with updated filter
                    this.collection.dataSource.refresh();
                } else {
                    // TODO handle local dataSource
                    throw Error('Local datasource not yet handled');
                }
            });
            this.sub.add(sub);
        }
    }
    /** The form to render in the filter drop down. */
    @Input() form!: FormGroup;
    /** 
     * A reference to the PageCollection that should be included inside the
     * selector for this component.
     */
    @Input() collection!: PagedCollectionComponent<T>;
    @Output() searchClick: EventEmitter<SearchFilterMap>;
    /** The subscriptions in the component. */
    sub: Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        this.searchClick = new EventEmitter();
        this.sub = new Subscription();
    }

    /**
     * Builds a map of search filter data based on controls from given FormGroup,
     * which should be form used in FilterDropDown component defined for the
     * toolbar. The key for each control should match up with expected filter 
     * values to be included in query parameters sent to server API. This allows 
     * map to be generated dynamically by looping over controls, rather than 
     * requiring parent component to define filter map (which can get repetative). 
     * Code to loop over form controls taken from answer to stackoverflow below:
     * https://stackoverflow.com/a/42235220/.
     * 
     * @param searchFilterData FormGroup defined for filter drop down.
     * @returns A map of search filters to send to server API.
     */
    private buildSearchFilter(searchFilterData: FormGroup): SearchFilterMap {
        const searchFilter: SearchFilterMap = {};
        Object.keys(searchFilterData.controls).forEach((key: string) => {
            searchFilter[key] = searchFilterData.get(key)?.value
        });
        return searchFilter;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
