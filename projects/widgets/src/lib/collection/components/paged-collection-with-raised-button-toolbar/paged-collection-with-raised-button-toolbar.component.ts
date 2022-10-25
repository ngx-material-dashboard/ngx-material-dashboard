import { Component, ContentChild, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { FilterDropDownComponent } from '../../../toolbar/components/filter-drop-down/filter-drop-down.component';
import { RaisedButtonToolbarComponent } from '../../../toolbar/pages/raised-button-toolbar/raised-button-toolbar.component';
import { PagedCollectionWithToolbarComponent } from '../paged-collection-with-toolbar/paged-collection-with-toolbar.component';
import { PagedCollectionComponent } from '../paged-collection/paged-collection.component';

/**
 * The `PagedCollectionWithRaisedButtonToolbar` extends the
 * `PagedCollectionWithToolbar`. This component does not add new capabilities,
 * but defines the type of toolbar expected to be used with the collection,
 * which is the `RaisedButtonToolbar`. See the documentation for the
 * `RaisedButtonToolbar` for more details
 * [here](/widgets/components/raised-button-toolbar).
 */
@Component({
    template: ''
})
export class PagedCollectionWithRaisedButtonToolbarComponent<T extends JsonModel>
    extends PagedCollectionWithToolbarComponent<T> {

    /** A reference to the collection that should be included inside the selector for this component. */
    @ContentChild('pagedCollection') collectionCmp!: PagedCollectionComponent<T>;
    /** A reference to the filter drop down included in the toolbar above the collection. */
    @ContentChild(FilterDropDownComponent) filter!: FilterDropDownComponent;
    /** The buttons to render in the toolbar. */
    @Input() form!: FormGroup;
    @ViewChild(RaisedButtonToolbarComponent) override toolbar!: RaisedButtonToolbarComponent;
}
