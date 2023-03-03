/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ViewChild
} from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { IconButtonsWithPaginatorComponent } from '../../../toolbar/pages/icon-buttons-with-paginator/icon-buttons-with-paginator.component';
import { CollectionComponent } from '../collection/collection.component';
import { PagedCollectionWithToolbarComponent } from '../paged-collection-with-toolbar/paged-collection-with-toolbar.component';

/**
 * The `PagedCollectionWithIconToolbar` extends the
 * `PagedCollectionWithToolbar`. This component does not add new capabilities,
 * but defines the type of toolbar expected to be used with the collection,
 * which is the `IconButtonsWithPaginator`. It requires the collection in the
 * template to be of type `Collection` since paging is rendered and managed
 * from the toolbar. See the documentation for the `IconButtonsWithPaginator`
 * for more details
 * [here](/widgets/toolbar/overview#icon-buttons-with-paginator-component).
 */
@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagedCollectionWithIconToolbarComponent<
    T extends JsonModel
> extends PagedCollectionWithToolbarComponent<T> {
    /**
     * Reference to the collection included in template for component. This is
     * expected to be a Collection since paging is rendered in toolbar.
     */
    @ContentChild('collection') override collectionCmp!: CollectionComponent<T>;
    @ViewChild(IconButtonsWithPaginatorComponent)
    override toolbar!: IconButtonsWithPaginatorComponent<T>;
}
