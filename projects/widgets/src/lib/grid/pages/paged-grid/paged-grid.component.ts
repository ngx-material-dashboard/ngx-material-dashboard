import { Component } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { AbstractPagedComponent } from '../../../paginator/pages/paged/abstract-paged.component';

@Component({
    selector: 'ngx-material-dashboard-paged-grid',
    templateUrl: './paged-grid.component.html',
    styleUrls: ['./paged-grid.component.css']
})
export class PagedGridComponent<T extends JsonModel> 
extends AbstractPagedComponent<T>{}
