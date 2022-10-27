import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

import { PagedCollectionWithIconToolbarComponent } from './paged-collection-with-icon-toolbar.component';

@Component({
    selector: 'paged-list-with-toolbar',
    template: `
    <ngx-material-dashboard-icon-buttons-with-paginator></ngx-material-dashboard-icon-buttons-with-paginator>
    <ngx-material-dashboard-sorter [options]="fields"></ngx-material-dashboard-sorter>
    <div *ngFor="let model of models">
        <ng-container 
            *ngTemplateOutlet="template; context: { model: model }">
        </ng-container>
    </div>
    `
}) class PagedListWithToolbarComponent
    extends PagedCollectionWithIconToolbarComponent<DummyObject> {}

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
}) class TestPagedCollectionWithIconToolbarComponent {
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
}

describe('PagedCollectionWithIconToolbarComponent', () => {
    let component: TestPagedCollectionWithIconToolbarComponent;
    let fixture: ComponentFixture<TestPagedCollectionWithIconToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                IconButtonsComponent,
                IconButtonsWithPaginatorComponent,
                PagedListWithToolbarComponent,
                PagedCollectionWithIconToolbarComponent,
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
        fixture = TestBed.createComponent(TestPagedCollectionWithIconToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
