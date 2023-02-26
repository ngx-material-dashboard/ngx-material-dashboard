import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Task, getTaskData } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';

import { ListComponent } from './list.component';

@Component({
    template: `
        <ngx-mat-list [data]="data" [fields]="fields">
            <ng-template #model let-model="model">
                <h2>Dummy Model</h2>
                <span>{{ model.id }}</span>
            </ng-template>
        </ngx-mat-list>
    `
})
class TestListComponent {
    data: Task[] = getTaskData(20);
    fields: string[] = ['id'];
}

describe('ListComponent', () => {
    let component: TestListComponent;
    let fixture: ComponentFixture<TestListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListComponent, TestListComponent, SorterComponent],
            imports: [
                MockModule(MatCheckboxModule),
                MockModule(MatSelectModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
