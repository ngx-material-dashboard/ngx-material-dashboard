import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { AbstractPagedCollectionComponent } from '../../../collection/pages/abstract-paged-collection/abstract-paged-collection.component';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { ListComponent } from '../../components/list/list.component';

import { PagedListComponent } from './paged-list.component';

@Component({
    template: `
    <ngx-material-dashboard-paged-list [data]="data" [fields]="fields">
        <ng-template #model let-model="model">
            <h2>Dummy Model</h2>
            <span>{{model.id}}</span>
        </ng-template>
    </ngx-material-dashboard-paged-list>
    `
}) class TestPagedListComponent {
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
}

describe('PagedListComponent', () => {
    let component: TestPagedListComponent;
    let fixture: ComponentFixture<TestPagedListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AbstractPagedCollectionComponent,
                ListComponent,
                PagedListComponent,
                SorterComponent
            ],
            imports: [
                MockModule(MatCheckboxModule),
                MockModule(MatPaginatorModule),
                MockModule(MatSelectModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPagedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
