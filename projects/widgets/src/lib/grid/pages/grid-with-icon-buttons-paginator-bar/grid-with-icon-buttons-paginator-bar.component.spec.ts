import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { GridComponent } from '../../components/grid/grid.component';

import { GridWithIconButtonsPaginatorBarComponent } from './grid-with-icon-buttons-paginator-bar.component';

@Component({
    template: `
    <ngx-material-dashboard-grid-with-icon-buttons-paginator-bar
        [fields]="fields">
        <ngx-material-dashboard-grid
            [data]="data"
            #collection>
            <ng-template #model let-model="model">
                <h2>Dummy Model</h2>
                <span>{{model.id}}</span>
            </ng-template>
        </ngx-material-dashboard-grid>
    </ngx-material-dashboard-grid-with-icon-buttons-paginator-bar>
    `
}) class TestGridWithIconButtonsPaginatorBarComponent {
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
}

describe('GridWithIconButtonsPaginatorBarComponent', () => {
    let component: TestGridWithIconButtonsPaginatorBarComponent;
    let fixture: ComponentFixture<TestGridWithIconButtonsPaginatorBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                GridComponent,
                GridWithIconButtonsPaginatorBarComponent,
                TestGridWithIconButtonsPaginatorBarComponent
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
        fixture = TestBed.createComponent(TestGridWithIconButtonsPaginatorBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
