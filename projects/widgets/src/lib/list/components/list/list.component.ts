import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { RemoteDataSource } from '../../../shared/services/remote-data-source.service';

@Component({
    selector: 'ngx-material-dashboard-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent<T extends JsonModel> {

    @Input() set dataSource(dataSource: RemoteDataSource<T> | MatTableDataSource<T>) {
        if (dataSource instanceof RemoteDataSource) {
            this.models = dataSource.data;
        } else {
            // subscribe to connect observable to get filtered, paged, sorted
            // data; see below github issue comment
            // https://github.com/angular/components/issues/9419#issuecomment-359594686
            dataSource.connect().subscribe((res: T[]) => {
                this.models = res;
            });
        }
    }
    /** The models to display in grid list. */
    models: T[] = [];
    @ContentChild('model', { static: false }) template!: TemplateRef<any>;
}
