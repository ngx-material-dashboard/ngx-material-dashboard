import { AfterViewInit, Component, OnInit } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { PagedCollectionWithRaisedButtonToolbarComponent } from '../../../collection/components/paged-collection-with-raised-button-toolbar/paged-collection-with-raised-button-toolbar.component';

@Component({
  selector: 'ngx-material-dashboard-paged-grid-with-raised-buttons-bar',
  templateUrl: './paged-grid-with-raised-buttons-bar.component.html',
  styleUrls: ['./paged-grid-with-raised-buttons-bar.component.css']
})
export class PagedGridWithRaisedButtonsBarComponent<T extends JsonModel>
    extends PagedCollectionWithRaisedButtonToolbarComponent<T>
    implements AfterViewInit {

    override ngAfterViewInit(): void {
        this.paginator$ = this.collectionCmp.paginator$;
        this.sort$ = this.collectionCmp.sort$;
        this.dataSource = this.collectionCmp.dataSource$;
        super.ngAfterViewInit();
    }
}
