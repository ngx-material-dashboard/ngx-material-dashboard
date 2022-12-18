import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Input
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { FilterDropDownComponent } from '../../../toolbar/components/filter-drop-down/filter-drop-down.component';
import { PagedCollectionWithToolbarComponent } from '../paged-collection-with-toolbar/paged-collection-with-toolbar.component';

/**
 * The `PagedCollectionWithRaisedButtonToolbar` extends the
 * `PagedCollectionWithToolbar`. This component does not add new capabilities,
 * but defines the type of toolbar expected to be used with the collection,
 * which is the `RaisedButtonToolbar`. It requires the collection in the
 * template to be of type `PagedCollection` since it expects paging to be
 * managed by the collection itself. See the documentation for the
 * `RaisedButtonToolbar` for more details
 * [here](/widgets/components/raised-button-toolbar).
 */
@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagedCollectionWithRaisedButtonToolbarComponent<
        T extends JsonModel
    >
    extends PagedCollectionWithToolbarComponent<T>
    implements AfterViewInit
{
    /** A reference to the filter drop down included in the toolbar above the collection. */
    @ContentChild(FilterDropDownComponent) filter!: FilterDropDownComponent;

    @Input() form!: FormGroup;
}
