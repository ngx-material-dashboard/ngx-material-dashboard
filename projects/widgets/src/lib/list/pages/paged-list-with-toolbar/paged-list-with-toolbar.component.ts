import { Component } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { BasePagedCollectionWithToolbarComponent } from '../../../collection/components/base-paged-collection-with-toolbar/base-paged-collection-with-toolbar.component';

@Component({
    selector: 'ngx-material-dashboard-paged-list-with-toolbar',
    templateUrl: './paged-list-with-toolbar.component.html',
    styleUrls: ['./paged-list-with-toolbar.component.css']
})
export class PagedListWithToolbarComponent<T extends JsonModel>
    extends BasePagedCollectionWithToolbarComponent<T> {}
