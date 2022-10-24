import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { PagedCollectionWithIconToolbarComponent } from '../../../collection/components/paged-collection-with-icon-toolbar/paged-collection-with-icon-toolbar.component';
import { ListComponent } from '../../../list/components/list/list.component';
import { GridComponent } from '../../components/grid/grid.component';

@Component({
  selector: 'ngx-material-dashboard-grid-with-icon-buttons-paginator-bar',
  templateUrl: './grid-with-icon-buttons-paginator-bar.component.html',
  styleUrls: ['./grid-with-icon-buttons-paginator-bar.component.css']
})
export class GridWithIconButtonsPaginatorBarComponent<T extends JsonModel>
    extends PagedCollectionWithIconToolbarComponent<T> implements AfterContentInit {

    /** A reference to the table in the template. */
    @ContentChild(GridComponent) collection!: GridComponent<T>;

    ngAfterContentInit(): void {
        this.dataSource = this.collection.dataSource$;
    }
}
