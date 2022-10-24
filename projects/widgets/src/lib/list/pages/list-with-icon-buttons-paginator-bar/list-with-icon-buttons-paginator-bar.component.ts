import { AfterContentInit, Component, ContentChild, OnInit } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { PagedCollectionWithIconToolbarComponent } from '../../../collection/components/paged-collection-with-icon-toolbar/paged-collection-with-icon-toolbar.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
    selector: 'ngx-material-dashboard-list-with-icon-buttons-paginator-bar',
    templateUrl: './list-with-icon-buttons-paginator-bar.component.html',
    styleUrls: ['./list-with-icon-buttons-paginator-bar.component.css']
})
export class ListWithIconButtonsPaginatorBarComponent<T extends JsonModel>
    extends PagedCollectionWithIconToolbarComponent<T> implements AfterContentInit {

    /** A reference to the table in the template. */
    @ContentChild(ListComponent) collection!: ListComponent<T>;

    ngAfterContentInit(): void {
        console.log(this.collection);
        this.dataSource = this.collection.dataSource$;
    }
}
