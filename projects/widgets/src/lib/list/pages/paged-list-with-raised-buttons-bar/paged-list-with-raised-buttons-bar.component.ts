import { AfterContentInit, AfterViewInit, Component, ContentChild } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { PagedListComponent } from '../../..';

import { PagedCollectionWithRaisedButtonToolbarComponent } from '../../../collection/components/paged-collection-with-raised-button-toolbar/paged-collection-with-raised-button-toolbar.component';

@Component({
    selector: 'ngx-material-dashboard-paged-list-with-raised-buttons-bar',
    templateUrl: './paged-list-with-raised-buttons-bar.component.html',
    styleUrls: ['./paged-list-with-raised-buttons-bar.component.css']
})
export class PagedListWithRaisedButtonsBarComponent<T extends JsonModel>
    extends PagedCollectionWithRaisedButtonToolbarComponent<T>
    implements AfterViewInit {

    override ngAfterViewInit(): void {
        this.paginator$ = this.collectionCmp.paginator$;
        this.sort$ = this.collectionCmp.sort$;
        this.dataSource = this.collectionCmp.dataSource$;
        super.ngAfterViewInit();
    }
}
