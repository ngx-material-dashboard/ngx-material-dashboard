import { AfterViewInit, Component, ContentChild, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';

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
 * or `PagedTable` instead of using this component directly. The only time you
 * might utilize this component directly is if you use it to create your own
 * paged collection type component (if the existing `PagedGrid`, `PagedList`,
 * or `PagedTable` do not provide the capabilities you need). If you do define
 * your own paged collection, you must define a template for it. You can find
 * more details in the documentation for the 
 * [PagedGrid](/widgets/components/paged-grid),
 * [PagedList](/widgets/components/paged-list),
 * and [PagedTable](/widgets/components/paged-table) at the included links.
 * 
 * ## Features
 * 
 * All of the features from the [Collection](/widgets/components/collection)
 * are available for use in this component. The `PagedCollection` adds paging
 * capabilities as well.
 * 
 * ### Paginator
 * 
 * The `paginator$` is a ViewChild property defined for the `PagedCollection`,
 * and is treated as an internal value specifically for this component. The
 * `paginator` getter is defined to be a more `public` facing property, and used
 * when initializing the paginator for the dataSource. If you create your own
 * paged collection by extending this component, all you need to do for the
 * paginator to work is add a `MatPaginator` to the template. If you use
 * something other than a `MatPaginator` or a ViewChild (i.e. ContentChild),
 * then you can override the `paginator` getter to return the type of paginator
 * you use in your component. *NOTE: whatever paginator you do use must extend
 * `MatPaginator` in order to work with the dataSource.
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

    onButtonClick(buttonClick: ButtonClick): void {
        this.buttonClick.emit(buttonClick);
    }
}
