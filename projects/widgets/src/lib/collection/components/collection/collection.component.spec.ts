import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';

import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { CollectionComponent } from './collection.component';

/** Component that defines a basic template for the collection. */
@Component({
    selector: 'list',
    template: `
    <ngx-material-dashboard-sorter [options]="fields"></ngx-material-dashboard-sorter>
    <div *ngFor="let model of models">
        <ng-container 
            *ngTemplateOutlet="template; context: { model: model }">
        </ng-container>
    </div>
    `
}) class ListComponent extends CollectionComponent<DummyObject> {}

/** Component to test with. */
@Component({
    template: `
    <list [data]="data" [fields]="fields">
        <ng-template #model let-model="model">
            <h2>Dummy Model</h2>
            <span>{{model.id}}</span>
        </ng-template>
    </list>
    `
}) class TestCollectionComponent {
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
}

describe('CollectionComponent', () => {
    let component: TestCollectionComponent;
    let fixture: ComponentFixture<TestCollectionComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CollectionComponent,
                ListComponent,
                SorterComponent,
                TestCollectionComponent
            ],
            imports: [
                MockModule(MatSelectModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCollectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
