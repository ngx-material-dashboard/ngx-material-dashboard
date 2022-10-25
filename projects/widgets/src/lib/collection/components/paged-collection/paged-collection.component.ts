import { AfterViewInit, Component, ContentChild, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { CollectionComponent } from '../collection/collection.component';

/**
 * The `PagedCollection` expands upon the capabilities of the `Collection` by
 * extending that component and providing paging capabilities. Any paginator
 * used should be of type `MatPaginator`.
 * 
 * @overviewDetails
 * 
 * Like the `Collection`, this component does not provide a template, and
 * the intention is for you to use things like the `PagedGrid`, `PagedList`,
 * or `PagedTable` instead of using this component directly (are you seeing a
 * pattern with components defined in the `collection` module yet?). The only
 * time you would use this component directly is if you use it to create your
 * own paged collection type component.
 */
@Component({
    template: ''
})
export class PagedCollectionComponent <T extends JsonModel>
    extends CollectionComponent<T>
    implements AfterViewInit, OnDestroy {

    /**
     * A reference to the model template for each element in the collection.
     * This is mainly used for any collection other than a table.
     */
    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
    /** 
     * The max number of pages to display in the paginator. Defaults to 10
     * (does not include 'First', 'Prev', 'Next', 'Last').
     */
    @Input() maxPages: number = 10;
    /** Number of items to display on a page. Defaults to 25. */
    @Input() pageSize: number = 25;
    /** A reference to the paginator in the template. */
    @ViewChild(MatPaginator) paginator$?: MatPaginator;

    /**
     * Returns the paginator for the component if it exists. Some paginated
     * components include the paginator directly in the template associated
     * with the component that extends this one, while there are others that
     * may include the paginator in a toolbar that is in the parent of the
     * paged collection component.
     */
    get paginator(): MatPaginator | null {
        if (this.paginator$) {
            return this.paginator$;
        } else {
            return null;
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initPageSub();
    }

    /**
     * Initializes subscription for when user changes page or page size. Works
     * for both local and remote data.
     */
    initPageSub(): void {
        this.dataSource$.paginator = this.paginator;
    }
}
