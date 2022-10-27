import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { SorterComponent } from '@ngx-material-dashboard/widgets';
import { MockModule } from 'ng-mocks';
import { ButtonsComponent } from '../../../toolbar/components/buttons/buttons.component';
import { RaisedButtonToolbarComponent } from '../../../toolbar/pages/raised-button-toolbar/raised-button-toolbar.component';

import { PagedCollectionWithToolbarComponent } from './paged-collection-with-toolbar.component';

@Component({
    selector: 'paged-list-with-toolbar',
    template: `
    <ngx-material-dashboard-raised-button-toolbar></ngx-material-dashboard-raised-button-toolbar>
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
}) class PagedListWithToolbarComponent
    extends PagedCollectionWithToolbarComponent<DummyObject> {}

/** Component to test with. */
@Component({
    template: `
    <paged-list-with-toolbar [data]="data" [fields]="fields">
        <ng-template #model let-model="model">
            <h2>Dummy Model</h2>
            <span>{{model.id}}</span>
        </ng-template>
    </paged-list-with-toolbar>
    `
}) class TestPagedCollectionWithToolbarComponent {
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
}

describe('PagedCollectionWithToolbarComponent', () => {
    let component: TestPagedCollectionWithToolbarComponent;
    let fixture: ComponentFixture<TestPagedCollectionWithToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ButtonsComponent,
                PagedListWithToolbarComponent,
                PagedCollectionWithToolbarComponent,
                RaisedButtonToolbarComponent,
                SorterComponent,
                TestPagedCollectionWithToolbarComponent
            ],
            imports: [
                MockModule(MatPaginatorModule),
                MockModule(MatSelectModule),
                MockModule(MatSortModule),
                MockModule(MatToolbarModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPagedCollectionWithToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
