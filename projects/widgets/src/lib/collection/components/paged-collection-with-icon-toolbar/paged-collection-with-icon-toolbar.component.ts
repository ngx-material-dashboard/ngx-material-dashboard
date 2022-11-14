import { Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
 * [here](/widgets/components/icon-buttons-with-paginator).
 */
@Component({
    template: ''
})
export class PagedCollectionWithIconToolbarComponent<T extends JsonModel>
    extends PagedCollectionWithToolbarComponent<T> {

    /**
     * Reference to the collection included in template for component. This is
     * expected to be a Collection since paging is rendered in toolbar.
     */
    @ContentChild('collection') override collectionCmp!: CollectionComponent<T>;
    @ViewChild(IconButtonsWithPaginatorComponent) override toolbar!: IconButtonsWithPaginatorComponent<T>;
    
    /**
     * Returns the paginator for the component. Paginator is rendered inside
     * toolbar; so return paginator from there.
     */
    override get paginator(): MatPaginator | null {
        return this.toolbar.paginator;
    }
}
