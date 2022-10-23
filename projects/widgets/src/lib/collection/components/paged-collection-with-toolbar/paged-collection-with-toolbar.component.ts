import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { Subscription } from 'rxjs';

import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import { IconButtonsWithPaginatorComponent } from '../../../toolbar/pages/icon-buttons-with-paginator/icon-buttons-with-paginator.component';
import { RaisedButtonToolbarComponent } from '../../../toolbar/pages/raised-button-toolbar/raised-button-toolbar.component';
import { PagedCollectionComponent } from '../paged-collection/paged-collection.component';

@Component({
    template: ''
})
export class PagedCollectionWithToolbarComponent<T extends JsonModel>
    extends PagedCollectionComponent<T>
    implements AfterViewInit, OnDestroy {

    /** List of fields included in each element of list that can be sorted on. */
    @Input() fields: string[] = [];
    /** The buttons to render in the toolbar. */
    @Input() toolbarButtons: ToolbarButton[] = [];
    /** A reference to the toolbar in the template. */
    toolbar!: IconButtonsWithPaginatorComponent<T> | RaisedButtonToolbarComponent;
    /**
     * These are the buttons in the toolbar that can be disabled. Just a filtered
     * subset of toolbarButtons that have canDisable=true.
     */
    disableableToolbarButtons: ToolbarButton[] = [];

    override get paginator(): MatPaginator | null {
        if (this.paginator$) {
            // if paginator$ already defined, then return that (should be view
            // child paginator as defined in PagedCollection)
            return this.paginator$;
        } else if (this.toolbar instanceof IconButtonsWithPaginatorComponent) {
            //  is in toolbar if toolbar is IconButtonsWithPaginator
            return this.toolbar.paginator;
        } else {
            return null;
        }
    }

    override get sort(): MatSort | null {
        if (this.sort$) {
            // if paginator 
            return this.sort$;
        } else if (this.toolbar instanceof IconButtonsWithPaginatorComponent) {
            return this.toolbar.sort;
        } else {
            return null;
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        // get buttons that can be disabled from given list of buttons
        this.disableableToolbarButtons = this.toolbarButtons.filter((button: ToolbarButton) => button.canDisable);
        this.sub = new Subscription();
        const sub = this.selectionService.selectionChange.subscribe((disabled: boolean) => {
            this.selectionService.toggleButtons(disabled, this.disableableToolbarButtons);
        });
        this.sub.add(sub);
    }
}
