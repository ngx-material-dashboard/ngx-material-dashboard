import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { ButtonsComponent } from '../../../toolbar/components/buttons/buttons.component';
import { RaisedButtonToolbarComponent } from '../../../toolbar/pages/raised-button-toolbar/raised-button-toolbar.component';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';

import { PagedCollectionWithRaisedButtonToolbarComponent } from './paged-collection-with-raised-button-toolbar.component';

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
    extends PagedCollectionWithRaisedButtonToolbarComponent<DummyObject> {}

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
}) class TestPagedCollectionWithRaisedButtonToolbarComponent {
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
}

describe('PagedCollectionWithRaisedButtonToolbarComponent', () => {
    let component: TestPagedCollectionWithRaisedButtonToolbarComponent;
    let fixture: ComponentFixture<TestPagedCollectionWithRaisedButtonToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ButtonsComponent,
                PagedListWithToolbarComponent,
                PagedCollectionWithRaisedButtonToolbarComponent,
                RaisedButtonToolbarComponent,
                SorterComponent
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
        fixture = TestBed.createComponent(TestPagedCollectionWithRaisedButtonToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});