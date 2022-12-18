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
import { ButtonsComponent } from '../../../toolbar/components/buttons/buttons.component';
import { RaisedButtonToolbarComponent } from '../../../toolbar/pages/raised-button-toolbar/raised-button-toolbar.component';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { PagedListComponent } from '../paged-list/paged-list.component';

import { PagedListWithRaisedButtonsBarComponent } from './paged-list-with-raised-buttons-bar.component';

@Component({
    template: `
        <ngx-material-dashboard-paged-list-with-raised-button-toolbar>
            <ngx-material-dashboard-paged-list [data]="data" [fields]="fields">
                <ng-template #model let-model="model">
                    <h2>Dummy Model</h2>
                    <span>{{ model.id }}</span>
                </ng-template>
            </ngx-material-dashboard-paged-list>
        </ngx-material-dashboard-paged-list-with-raised-button-toolbar>
    `
})
class TestPagedListWithRaisedButtonsBarComponent {
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
}

describe('PagedListWithRaisedButtonsBarComponent', () => {
    let component: TestPagedListWithRaisedButtonsBarComponent;
    let fixture: ComponentFixture<TestPagedListWithRaisedButtonsBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ButtonsComponent,
                PagedListComponent,
                PagedListWithRaisedButtonsBarComponent,
                RaisedButtonToolbarComponent,
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
            TestPagedListWithRaisedButtonsBarComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
