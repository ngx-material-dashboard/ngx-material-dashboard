import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import { IconButtonsWithPaginatorComponent } from '../../../toolbar/pages/icon-buttons-with-paginator/icon-buttons-with-paginator.component';
import { RaisedButtonToolbarComponent } from '../../../toolbar/pages/raised-button-toolbar/raised-button-toolbar.component';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { SelectionService } from '../../services/selection.service';
import { CollectionComponent } from '../collection/collection.component';
import { PagedCollectionComponent } from '../paged-collection/paged-collection.component';

/**
 * The `PagedCollectionWithToolbar` expands upon the capabilities of the
 * `Collection` and `PagedCollection` by providing features that a collection
 * should have when associated with a toolbar used to manage data in the
 * collection. It is a wrapper for a `PagedCollection` and one of the toolbars
 * defined in the `toolbar` module. This component acts as a base component
 * for paged collections with toolbars, defining properties and functions
 * needed for those components without defining the type of toolbar used in the
 * component. As such this component is not meant to be used directly. Instead
 * you should use the `PagedCollectionWithIconBar` or
 * `PagedCollectionWithRaisedButtonBar` component, which define the type of
 * toolbar expected to be used in the template (either the
 * `IconButtonWithPaginator` or the `RaisedButtonToolbar` respectively).
 * 
 * @overviewDetails
 * ## Features
 * 
 * A toolbar associated with a paged collection may have buttons that are
 * enabled/disabled based on selections in the collection. As such this
 * component provides built in capabilities to enable/disable those buttons
 * based on configuration parameters provided for the toolbar buttons. See
 * documentation for the `ToolbarButton` interface for more details:
 * [ToolbarButton](/widgets/interfaces/toolbar-button).
 * 
 * Additionally, the component utilizes the `buttonClick` output event emitter
 * for emitting button click events from buttons in the toolbar. This way
 * parent components only need to use the `buttonClick` output to handle button
 * click events in either the toolbar or the collection itself. This seemed to
 * be the best solution (for now at least; as opposed to having a separate
 * emitter for toolbar events), as you may have the same or similar handlers
 * for toolbar and collection button events.
 */
@Component({
    template: ''
})
export class PagedCollectionWithToolbarComponent<T extends JsonModel>
    implements AfterViewInit, OnDestroy {

    /** A reference to the collection that should be included inside the selector for this component. */
    @ContentChild('collection') collectionCmp!: CollectionComponent<T> | PagedCollectionComponent<T>;
    /** List of fields included in each element of collection that can be sorted on. */
    @Input() fields: string[] = [];
    /** Boolean value to indicate whether multiple rows can be selected. */
    @Input() multiple: boolean = true;
    /** The buttons to render in the toolbar. */
    @Input() toolbarButtons: ToolbarButton[] = [];
    /** The event to emit when button is clicked in collection or toolbar. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** A reference to the toolbar in the template. */
    @ViewChild('toolbar') toolbar!: IconButtonsWithPaginatorComponent<T> | RaisedButtonToolbarComponent;
    /**
     * These are the buttons in the toolbar that can be disabled. Just a filtered
     * subset of toolbarButtons that have canDisable=true.
     */
    disableableToolbarButtons: ToolbarButton[] = [];
    /** The total number of elements in the collection. */
    length: number = 0;
    /** A reference to the paginator for the component. */
    paginator$?: MatPaginator;
    /** A reference to the sort for the component. */
    sort$?: MatSort | SorterComponent;
    /** The subscriptions for the component. */
    sub: Subscription;

    /**
     * Returns the paginator for the component, whether it resides in paged
     * collection, or in the toolbar.
     */
    get paginator(): MatPaginator | null {
        if (this.paginator$) {
            // if paginator$ already defined, then return that (should be view
            // child paginator as defined in PagedCollection)
            return this.paginator$;
        } else if (this.toolbar instanceof IconButtonsWithPaginatorComponent) {
            //  paginator is in toolbar if toolbar is IconButtonsWithPaginator
            return this.toolbar.paginator;
        } else {
            return null;
        }
    }
    
    /**
     * Returns the sort for the component.
     */
    get sort(): MatSort | undefined {
        if (this.sort$) {
            // if sort$ already defined, then return that
            return this.sort$;
        } else if (this.toolbar instanceof IconButtonsWithPaginatorComponent) {
            // sort is in toolbar if toolbar is IconButtonsWithPaginator
            return this.toolbar.sort;
        } else {
            return undefined;
        }
    }

    constructor() {
        this.buttonClick = new EventEmitter<ButtonClick>();
        this.sub = new Subscription();
    }

    ngAfterViewInit(): void {
        if (this.collectionCmp instanceof CollectionComponent) {
            this.collectionCmp.dataSource$.paginator = this.paginator;
        }

        // get buttons that can be disabled from given list of buttons
        this.disableableToolbarButtons = this.toolbarButtons.filter((button: ToolbarButton) => button.canDisable);
        this.sub = new Subscription();
        let selectionService: SelectionService<T>;
        if (this.collectionCmp instanceof CollectionComponent) {
            selectionService = this.collectionCmp.selectionService;
        } else {
            selectionService = this.collectionCmp.collection$.selectionService;
        }
        const sub = selectionService.selectionChange.subscribe((disabled: boolean) => {
            selectionService.toggleButtons(disabled, this.disableableToolbarButtons);
        });
        this.sub.add(sub);
    }

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
        let selection: SelectionModel<T>;
        if (this.collectionCmp instanceof CollectionComponent) {
            selection = this.collectionCmp.selection;
        } else {
            selection = this.collectionCmp.collection$.selection;
        }
        if (!selection.isEmpty()) {
            // make sure selection is not empty before adding selected row(s)
            buttonClick.row = selection.selected[0];
        }
        this.buttonClick.emit(buttonClick);
    }
}
