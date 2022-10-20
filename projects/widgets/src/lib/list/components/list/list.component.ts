import { Component, ContentChild, TemplateRef } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

import { CollectionComponent } from '../../../collection/components/collection/collection.component';

@Component({
    selector: 'ngx-material-dashboard-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent<T extends JsonModel>
    extends CollectionComponent<T> {

    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
}
