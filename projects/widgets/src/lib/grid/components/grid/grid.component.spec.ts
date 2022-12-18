import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Task, getTaskData } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';

import { GridComponent } from './grid.component';

@Component({
    template: `
        <ngx-material-dashboard-grid [data]="data" [fields]="fields">
            <ng-template #model let-model="model">
                <h2>Dummy Model</h2>
                <span>{{ model.id }}</span>
            </ng-template>
        </ngx-material-dashboard-grid>
    `
})
class TestGridComponent {
    data: Task[] = getTaskData(20);
    fields: string[] = ['id'];
}

describe('GridComponent', () => {
    let component: TestGridComponent;
    let fixture: ComponentFixture<TestGridComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GridComponent, SorterComponent, TestGridComponent],
            imports: [
                MockModule(MatCheckboxModule),
                MockModule(MatGridListModule),
                MockModule(MatSelectModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
