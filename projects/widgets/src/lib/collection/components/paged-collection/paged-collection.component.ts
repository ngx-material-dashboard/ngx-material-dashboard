import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';
import { Button } from '../../../shared/interfaces/button.interface';
import { RemoteDataSource } from '../../../shared/services/remote-data-source.service';
import { SelectionService } from '../../../shared/services/selection.service';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';

/* 
mermaid.js inheritance graph
graph TD
    A[PagedCollectionWithToolbar] -->|extends| B[PagedCollection]
    B -->|extends| C[Collection]
    D[PagedCollectionWithIconToolbar] -->|extends| A
    E[PagedCollectionWithRaisedButtonToolbar] -->|extends| A
*/

@Component({
    template: ''
})
export class PagedCollectionComponent <T extends JsonModel>
implements AfterViewInit, OnDestroy {

    /**
     * A reference to the model template for each element in the collection.
     * This is mainly used for any collection other than a table.
     */
    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
     /** The buttons to render with each element in the collection. */
    @Input() collectionButtons: Button[] = [];
    /**
     * Setter for paged data. This re-initializes the dataSource everytime data changes.
     * TODO: only re-initialize when necessary; just update data otherwise
     */
    @Input() set data(data: T[] | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    /** The dataSource for the paged data. */
    @Input() set dataSource(data: MatTableDataSource<T> | RemoteDataSource<T> | undefined) {
        if (data) {
            this.initDataSource(data);
        }
    }
    /** Any values that should be selected when collection initially renders. */
    @Input() initiallySelectedValues: T[] = [];
    /** 
     * The max number of pages to display in the paginator. Defaults to 10
     * (does not include 'First', 'Prev', 'Next', 'Last').
     */
    @Input() maxPages: number = 10;
    /** Boolean value to indicate whether multiple rows can be selected (defaults to true i.e. multiple can be selected). */
    @Input() set multiple(multiple: boolean) {
        this.multiple$ = multiple;
        this.selection = new SelectionModel<T>(multiple, this.initiallySelectedValues);
        this.selectionService.selectionSubject.next(this.selection);
    }
    /** Number of items to display on a page. Defaults to 25. */
    @Input() pageSize: number = 25;
    /** The event to emit when button is clicked in toolbar or collection. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** A reference to the paginator in the template. */
    @ViewChild(MatPaginator) paginator$?: MatPaginator;
    /** 
     * A reference to the sorter in the template. Only paged table would really
     * have a reference directly in this component, but paged list and grid will
     * need SorterComponent, so need to include this as optional type in order to
     * be able to override in extending components.
     */
    sort$?: MatSort | SorterComponent;
    /** The source for the collection data. */
    dataSource$!: RemoteDataSource<T> | MatTableDataSource<T>;
    /** Boolean value indicating whether multiple rows can be selected. */
    multiple$: boolean = true;
    /** The model to track items selected in the collection. */
    selection: SelectionModel<T>;
    /** The subscriptions for the component. */
    sub: Subscription;

    /**
     * Returns the total number of items in the dataSource.
     */
     get length(): number {
        if (this.dataSource$ instanceof RemoteDataSource) {
            return this.dataSource$.total;
        } else if (this.dataSource$?.data) {
            return this.dataSource$.data.length;
        } else {
            return 0;
        }
    }

    get paginator(): MatPaginator | null {
        if (this.paginator$) {
            return this.paginator$;
        } else {
            return null;
        }
    }

    get sort(): MatSort | null {
        if (this.sort$) {
            return this.sort$;
        } else {
            return null;
        }
    }

    get selectionService(): SelectionService<T> {
        return this.selectionService$;
    }

    constructor(
        private selectionService$: SelectionService<T>
    ) {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.selection = new SelectionModel<T>(this.multiple$, []);
        this.selectionService.selectionSubject.next(this.selection);
        this.sub = new Subscription();
    }

    ngAfterViewInit(): void {
        this.initPageSub();
        this.initSortSubs();
    }

    /**
     * Destroy all subscriptions in the component.
     */
    ngOnDestroy(): void {
        this.sub.unsubscribe();
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

    /**
     * Initializes the data source bsaed on the type of data/source given, and
     * any additional properties required (i.e. paging/sorting).
     * 
     * @param data Either an array (local data) or a RemoteDataSource.
     */
    initDataSource(dataSource: T[] | MatTableDataSource<T> | RemoteDataSource<T>): void {
        if (dataSource instanceof RemoteDataSource) {
            this.dataSource$ = dataSource;
        } else {
            if (dataSource instanceof MatTableDataSource) {
                this.dataSource$ = dataSource;
            } else {
                this.dataSource$ = new MatTableDataSource(dataSource);
            }
        }
    }

    /**
     * Initializes subscription for when user changes page or page size. Works
     * for both local and remote data.
     */
    initPageSub(): void {
        this.dataSource$.paginator = this.paginator;
    }

    /**
     * Initializes subscription for when user changes the sort order for data
     * in the collection.
     */
    initSortSubs(): void {
        this.dataSource$.sort = this.sort;
    }

    /**
     * Returns true if all visible elements in the collection are selected;
     * otherwise returns false.
     *
     * @returns true if all visible elements in the collection are selected.
     */
    isAllSelected(): boolean {
        if (this.dataSource$.data.length === 0) {
            return false;
        } else {
            return this.selection.selected.length === this.dataSource$.data.length;
        }
    }

    /**
     * Handler for checkbox in collection header. Clears all selections if all
     * visible elements in the collection are selected; otherwise selects all
     * visible elements in the collection.
     */
    masterToggle(event: boolean): void {
        if (this.isAllSelected() || !this.multiple$) {
            // clear all selections and disable ToolbarButtons
            this.selection.clear();
            this.selectionService.selectionChangeSubject.next(true);
        } else {
            // select all rows in the table and enable ToolbarButtons
            this.dataSource$.data.forEach((row: T) => this.selection.select(row));
            if (this.dataSource$.data.length > 0) {
                // only enable ToolbarButtons if there is data in table
                this.selectionService.selectionChangeSubject.next(false);
            }
        }

        // update the selection in the selectionService
        this.selectionService.selectionSubject.next(this.selection);
    }

    /**
     * Handler for when the user clicks a button next to an element in the
     * collection.
     *
     * @param click The action that was clicked (i.e. 'edit', 'delete', etc).
     * @param row The row/element where the button was clicked.
     */
    onActionButtonClick(click: string, row: T): void {
        this.buttonClick.emit({ click: click, row: row });
    }

    /**
     * Handler for checkbox in collection. Toggles the selection for the given
     * element and updates the ToolbarButtons accordingly.
     *
     * @param row The element that was (de)selected in the collection.
     */
    onRowSelected(row: T): void {
        if (!this.multiple$ && this.selection.selected.length > 0) {
            // if table does not allow multiple selections and there are any
            // existing rows selected, then clear selection before making new
            // one
            this.selection.clear();
        }

        this.selection.toggle(row);
        // disable the buttons if no rows are selected; otherwise enable them
        this.selectionService.selectionChangeSubject.next(this.selection.selected.length === 0);
        // update the selection in the selectionService
        this.selectionService.selectionSubject.next(this.selection);
    }
}
