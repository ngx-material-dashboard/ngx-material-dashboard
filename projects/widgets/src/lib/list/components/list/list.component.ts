import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { JsonModel } from '@ngx-material-dashboard/base-json';

@Component({
    selector: 'ngx-material-dashboard-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {

    /** The models to display in the list. */
    @Input() models: JsonModel[] = [];
    @Input() modelType: string = 'data';
    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
}
