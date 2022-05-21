import { Component } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { AbstractPagedComponent } from '../../../paginator/pages/paged/paged.component';

@Component({
    selector: 'ngx-material-dashboard-paged-list',
    templateUrl: './paged-list.component.html',
    styleUrls: ['./paged-list.component.css']
})
export class PagedListComponent<T extends JsonModel>
extends AbstractPagedComponent<T> {}
