import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { Task, getTaskData } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { ListComponent } from '../../components/list/list.component';

import { PagedListComponent } from './paged-list.component';

@Component({
    template: `
        <ngx-mat-paged-list [data]="data" [fields]="fields">
            <ng-template #model let-model="model">
                <h2>Dummy Model</h2>
                <span>{{ model.id }}</span>
            </ng-template>
        </ngx-mat-paged-list>
    `
})
class TestPagedListComponent {
    data: Task[] = getTaskData(20);
    fields: string[] = ['id'];
}

describe('PagedListComponent', () => {
    let component: TestPagedListComponent;
    let fixture: ComponentFixture<TestPagedListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListComponent, PagedListComponent, SorterComponent],
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
