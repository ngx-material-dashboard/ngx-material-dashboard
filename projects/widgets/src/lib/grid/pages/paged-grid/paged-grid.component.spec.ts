import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { PagedCollectionComponent } from '../../../collection/components/paged-collection/paged-collection.component';

import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { GridComponent } from '../../components/grid/grid.component';

import { PagedGridComponent } from './paged-grid.component';

@Component({
    template: `
        <ngx-material-dashboard-paged-grid
            [dataSource]="data"
            [fields]="fields"
        >
            <ng-template #model let-model="model">
                <h2>Dummy Model</h2>
                <span>{{ model.id }}</span>
            </ng-template>
        </ngx-material-dashboard-paged-grid>
    `
})
class TestPagedGridComponent {
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
}

describe('PagedGridComponent', () => {
    let component: TestPagedGridComponent;
    let fixture: ComponentFixture<TestPagedGridComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                GridComponent,
                PagedCollectionComponent,
                PagedGridComponent,
                SorterComponent,
                TestPagedGridComponent
            ],
            imports: [
                MockModule(MatCheckboxModule),
                MockModule(MatGridListModule),
                MockModule(MatPaginatorModule),
                MockModule(MatSelectModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPagedGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
