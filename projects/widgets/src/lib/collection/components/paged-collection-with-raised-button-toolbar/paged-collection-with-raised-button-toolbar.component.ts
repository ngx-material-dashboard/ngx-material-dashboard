import { Component, ContentChild, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { FilterDropDownComponent } from '../../../toolbar/components/filter-drop-down/filter-drop-down.component';
import { RaisedButtonToolbarComponent } from '../../../toolbar/pages/raised-button-toolbar/raised-button-toolbar.component';
import { AbstractPagedCollectionComponent } from '../../pages/abstract-paged-collection/abstract-paged-collection.component';
import { PagedCollectionWithToolbarComponent } from '../paged-collection-with-toolbar/paged-collection-with-toolbar.component';

@Component({
    template: ''
})
export class PagedCollectionWithRaisedButtonToolbarComponent<T extends JsonModel>
    extends PagedCollectionWithToolbarComponent<T> {

    /** A reference to the collection that should be included inside the selector for this component. */
    @ContentChild('pagedCollection') collectionCmp!: AbstractPagedCollectionComponent<T>;
    /** A reference to the filter drop down included in the toolbar above the collection. */
    @ContentChild(FilterDropDownComponent) filter!: FilterDropDownComponent;
    /** The buttons to render in the toolbar. */
    @Input() form!: FormGroup;
    @ViewChild(RaisedButtonToolbarComponent) override toolbar!: RaisedButtonToolbarComponent;
}
