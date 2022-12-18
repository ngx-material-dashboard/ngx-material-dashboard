import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { IconButtonsComponent } from '../../../toolbar/components/icon-buttons/icon-buttons.component';
import { IconButtonsWithPaginatorComponent } from '../../../toolbar/pages/icon-buttons-with-paginator/icon-buttons-with-paginator.component';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';

import { ListWithIconButtonsPaginatorBarComponent } from './list-with-icon-buttons-paginator-bar.component';

@Component({
    template: `
        <ngx-material-dashboard-list-with-icons-buttons-paginator-bar
            [fields]="fields"
        >
            <ngx-material-dashboard-list [data]="data">
                <ng-template #model let-model="model">
                    <h2>Dummy Model</h2>
                    <span>{{ model.id }}</span>
                </ng-template>
            </ngx-material-dashboard-list>
        </ngx-material-dashboard-list-with-icons-buttons-paginator-bar>
    `
})
class TestListWithIconButtonsPaginatorBarComponent {
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
}

describe('ListWithIconButtonsPaginatorBarComponent', () => {
    let component: TestListWithIconButtonsPaginatorBarComponent;
    let fixture: ComponentFixture<TestListWithIconButtonsPaginatorBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                IconButtonsComponent,
                IconButtonsWithPaginatorComponent,
                ListWithIconButtonsPaginatorBarComponent,
                SorterComponent
            ],
            imports: [
                MockModule(MatCheckboxModule),
                MockModule(MatPaginatorModule),
                MockModule(MatSelectModule),
                MockModule(MatSortModule),
                MockModule(MatToolbarModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            TestListWithIconButtonsPaginatorBarComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
