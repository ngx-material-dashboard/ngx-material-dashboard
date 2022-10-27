import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';

import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { PagedCollectionComponent } from './paged-collection.component';

@Component({
    selector: 'paged-list',
    template: `
    <ngx-material-dashboard-sorter [options]="fields"></ngx-material-dashboard-sorter>
    <div *ngFor="let model of models">
        <ng-container 
            *ngTemplateOutlet="template; context: { model: model }">
        </ng-container>
    </div>
    <mat-paginator [length]="dataSource$.data.length"
                [pageSize]="pageSize" 
                [pageSizeOptions]="[15, 25, 50, 75, 100]">
    </mat-paginator>
    `
}) class PagedListComponent extends PagedCollectionComponent<DummyObject> {}

/** Component to test with. */
@Component({
    template: `
    <paged-list [data]="data" [fields]="fields">
        <ng-template #model let-model="model">
            <h2>Dummy Model</h2>
            <span>{{model.id}}</span>
        </ng-template>
    </paged-list>
    `
}) class TestPagedCollectionComponent {
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
}

describe('PagedCollectionComponent', () => {
    let component: TestPagedCollectionComponent;
    let fixture: ComponentFixture<TestPagedCollectionComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                PagedListComponent,
                PagedCollectionComponent,
                SorterComponent,
                TestPagedCollectionComponent
            ],
            imports: [
                NoopAnimationsModule,
                MatPaginatorModule,
                MatSelectModule,
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPagedCollectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
