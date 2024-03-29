import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Task, getTaskData } from '@ngx-material-dashboard/testing';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { MockModule } from 'ng-mocks';
import { GridComponent } from '../../components/grid/grid.component';
import { PagedGridComponent } from '../paged-grid/paged-grid.component';

import { PagedGridWithRaisedButtonsBarComponent } from './paged-grid-with-raised-buttons-bar.component';

@Component({
    template: `
        <ngx-mat-paged-grid-with-raised-buttons-bar [fields]="fields">
            <ngx-mat-paged-grid [data]="data" #collection>
                <ng-template #model let-model="model">
                    <h2>Dummy Model</h2>
                    <span>{{ model.id }}</span>
                </ng-template>
            </ngx-mat-paged-grid>
        </ngx-mat-paged-grid-with-raised-buttons-bar>
    `
})
class TestPagedGridWithRaisedButtonsBarComponent {
    data: Task[] = getTaskData(20);
    fields: string[] = ['id'];
}

describe('PagedGridWithRaisedButtonsBarComponent', () => {
    let component: TestPagedGridWithRaisedButtonsBarComponent;
    let fixture: ComponentFixture<TestPagedGridWithRaisedButtonsBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                GridComponent,
                PagedGridComponent,
                SorterComponent,
                PagedGridWithRaisedButtonsBarComponent
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
        fixture = TestBed.createComponent(
            TestPagedGridWithRaisedButtonsBarComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
