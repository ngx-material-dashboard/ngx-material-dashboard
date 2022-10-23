import { AfterContentInit, Component, ContentChild, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { FilterDropDownComponent } from '../../../toolbar/components/filter-drop-down/filter-drop-down.component';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import { AbstractPagedCollectionComponent } from '../../pages/abstract-paged-collection/abstract-paged-collection.component';

/**
 * The `BasePagedCollectionWithToolbar` provides shared fields and functions
 * for all paged collections that utilize a `MatToolbar` above them. The
 * `PagedGridWithToolbar`, `PagedListWithToolbar`, and `PagedTableWithToolbar`
 * all extend this component to use the shared features defined here. Most
 * components used in applications will not use this component directly, and
 * will instead extend the `AbstractPagedCollectionWithToolbar`. You should not
 * need to use this component unless you intend to create your own paged
 * collection (i.e. something other than the provided grid, list, or table
 * components).
 */
@Component({
    template: ''
})
export class BasePagedCollectionWithToolbarComponent<T extends JsonModel> 
    implements AfterContentInit, OnDestroy {

    /** A reference to the collection that should be included inside the selector for this component. */
    @ContentChild('pagedCollection') collectionCmp!: AbstractPagedCollectionComponent<T>;
    /** The buttons to render in the toolbar. */
    @Input() form!: FormGroup;
    /** The buttons to render in the toolbar. */
    @Input() toolbarButtons: ToolbarButton[] = [];
    /** The event to emit when button is clicked in toolbar or collection. */
    @Output() buttonClick: EventEmitter<ButtonClick>;
    /** The subscriptions for the component. */
    sub: Subscription;

    constructor() {
        this.sub = new Subscription();
        this.buttonClick = new EventEmitter<ButtonClick>();
    }

    ngAfterContentInit(): void {
        this.collectionCmp.buttonClick.subscribe((buttonClick: ButtonClick) => {
            this.buttonClick.emit(buttonClick);
        });
    }

    /**
     * Destroy all subscriptions in the component.
     */
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Adds current table selection to given buttonClick and emits event to
     * parent. TODO handle multiple selections
     *
     * @param buttonClick A buttonClick event from the tableToolbar.
     */
    onToolbarButtonClick(buttonClick: ButtonClick): void {
        if (!this.collectionCmp.selection.isEmpty()) {
            // make sure selection is not empty before adding selected row(s)
            buttonClick.row = this.collectionCmp.selection.selected[0];
        }
        this.buttonClick.emit(buttonClick);
    }
}
