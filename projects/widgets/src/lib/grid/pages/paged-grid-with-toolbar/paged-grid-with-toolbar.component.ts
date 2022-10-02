import { Component } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { BasePagedCollectionWithToolbarComponent } from '../../../collection/components/base-paged-collection-with-toolbar/base-paged-collection-with-toolbar.component';

@Component({
    selector: 'ngx-material-dashboard-paged-grid-with-toolbar',
    templateUrl: './paged-grid-with-toolbar.component.html',
    styleUrls: ['./paged-grid-with-toolbar.component.css']
})
export class PagedGridWithToolbarComponent<T extends JsonModel>
    extends BasePagedCollectionWithToolbarComponent<T> {}
