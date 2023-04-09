/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { Button } from '../../interfaces/button.interface';
import { RemoteDataSource } from '../../services/remote-data-source.service';

import { CollectionComponent } from '../collection/collection.component';

/**
 * The `PagedCollection` is a wrapper component for the `Collection` which adds
 * paging capabilities. This component expects a `Collection` to be defined as
 * a child in the template. Any paginator used should be of type `MatPaginator`.
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
 * [PagedGrid](/widgets/grid/overview#paged-grid-component),
 * [PagedList](/widgets/list/overview#paged-list-component),
 * and [PagedTable](/widgets/table/overview#paged-table-component) at the included links.
 *
 * #### Features
 *
 * The `PagedCollection` provides paging capabilities for collections.
 *
 * ##### Paginator
 *
 * The paginator used is the `mat-paginator` provided by Angular Material, and
 * you can use the same properties you would use to control the component as if
 * you were using `mat-paginator` directly. This means you can hide the page
 * size options as well as configure the list of avaialable options if not
 * hidden, set the current page size, and control if the first/last buttons
 * should be rendered. See the [API](/widgets/collection/api#paged-collection-component),
 * for more details.
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
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagedCollectionComponent<T extends JsonModel>
    implements AfterViewInit, OnDestroy
{
    /**
     * A reference to the model template for each element in the collection.
     * This is mainly used for any collection other than a table.
     */
    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
    /** The buttons to render with each item in collection. */
    @Input() collectionButtons: Button[] = [];
    /** The dataSource for the collection. */
    @Input() set dataSource(
        val: T[] | MatTableDataSource<T> | RemoteDataSource<T>
    ) {
        this.dataSource$ = val;
    }
    /** List of fields included in each element of collection that can be sorted on. */
    @Input() fields: string[] = [];
    /** Boolean to indicate if page size should be hidden. */
    @Input() hidePageSize: boolean = false;
    /**
     * The max number of pages to display in the paginator. Defaults to 10
     * (does not include 'First', 'Prev', 'Next', 'Last').
     */
    @Input() maxPages: number = 10;
    /** Boolean value to indicate whether multiple rows can be selected. */
    @Input() multiple: boolean = true;
    /** Number of items to display on a page. Defaults to 25. */
    @Input() pageSize: number = 25;
    /** Page size options. */
    @Input() pageSizeOptions: number[] = [15, 25, 50, 75, 100];
    /**
     * Boolean to indicate whether first/last buttons should be included in
     * paginator.
     */
    @Input() showFirstLastButtons: boolean = true;
    /** The event to emit when button is clicked in collection. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** A reference to the paginator in the template. */
    @ViewChild(MatPaginator) paginator$?: MatPaginator;
    /** A reference to the collection in the template. */
    @ViewChild('collection') collection$!: CollectionComponent<T>;
    dataSource$!: T[] | MatTableDataSource<T> | RemoteDataSource<T>;
    /** The total number of elements in the collection. */
    length: number = 0;
    /** The subscriptions for the component. */
    sub: Subscription;

    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    get dataSource(): T[] | MatTableDataSource<T> | RemoteDataSource<T> {
        return this.dataSource$;
    }
    /**
     * Returns the paginator for the component if it exists.
     */
    get paginator(): MatPaginator | null {
        if (this.paginator$) {
            return this.paginator$;
        } else {
            return null;
        }
    }

    constructor() {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.sub = new Subscription();
    }

    ngAfterViewInit(): void {
        this.initPaginator();
        const sub = this.collection$.lengthChange.subscribe(
            (length: number) => {
                this.length = length;
            }
        );
        this.sub.add(sub);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Initializes subscription for when user changes page or page size. Works
     * for both local and remote data.
     */
    initPaginator(): void {
        if (this.collection$.dataSource$) {
            this.collection$.dataSource$.paginator = this.paginator;
        }
    }

    /**
     * Handler for when the user clicks a button associated with an item in the
     * collection.
     *
     * @param buttonClick The value emitted from the collection.
     */
    onButtonClick(buttonClick: ButtonClick): void {
        this.buttonClick.emit(buttonClick);
    }
}
