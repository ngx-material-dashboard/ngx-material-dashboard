import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { CollectionComponent } from '../collection/collection.component';

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

    /**
     * Adds current collection selection to given buttonClick and emits event
     * to parent. TODO handle multiple selections
     *
     * @param buttonClick A buttonClick event from the tableToolbar.
     */
    onToolbarButtonClick(buttonClick: ButtonClick): void {
        if (!this.selection.isEmpty()) {
            // make sure selection is not empty before adding selected row(s)
            buttonClick.row = this.selection.selected[0];
        }
        this.buttonClick.emit(buttonClick);
    }
}
