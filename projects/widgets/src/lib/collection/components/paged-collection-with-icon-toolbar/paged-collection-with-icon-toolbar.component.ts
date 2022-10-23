import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { IconButtonsWithPaginatorComponent } from '../../../toolbar/pages/icon-buttons-with-paginator/icon-buttons-with-paginator.component';
import { PagedCollectionWithToolbarComponent } from '../paged-collection-with-toolbar/paged-collection-with-toolbar.component';

@Component({
    template: ''
})
export class PagedCollectionWithIconToolbarComponent<T extends JsonModel>
    extends PagedCollectionWithToolbarComponent<T> {

    @ViewChild(IconButtonsWithPaginatorComponent) override toolbar!: IconButtonsWithPaginatorComponent<T>;
}
