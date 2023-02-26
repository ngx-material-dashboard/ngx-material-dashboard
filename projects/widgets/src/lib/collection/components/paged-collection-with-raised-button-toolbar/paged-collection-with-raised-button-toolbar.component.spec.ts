import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Task, getTaskData } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { PagedListWithRaisedButtonsBarComponent } from '../../../list/pages/paged-list-with-raised-buttons-bar/paged-list-with-raised-buttons-bar.component';
import { ButtonsComponent } from '../../../toolbar/components/buttons/buttons.component';
import { RaisedButtonToolbarComponent } from '../../../toolbar/pages/raised-button-toolbar/raised-button-toolbar.component';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { Button } from '../../interfaces/button.interface';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../shared/buttons';

import { PagedCollectionWithRaisedButtonToolbarComponent } from './paged-collection-with-raised-button-toolbar.component';

/** Component to test with. */
@Component({
    template: `
        <ngx-mat-paged-list-with-raised-buttons-bar>
            <ngx-mat-filter-drop-down filter>
                <!-- filter form goes here -->
            </ngx-mat-filter-drop-down>
            <ngx-mat-paged-list
                [collectionButtons]="collectionButtons"
                [dataSource]="data"
                [fields]="fields"
                class="marker-paged-list"
                collection
                #collection
            >
                <ng-template #model let-model="model">
                    <h2>Dummy Model</h2>
                    <span>{{ model.id }}</span>
                </ng-template>
            </ngx-mat-paged-list>
        </ngx-mat-paged-list-with-raised-buttons-bar>
    `
})
class TestPagedCollectionWithRaisedButtonToolbarComponent {
    collectionButtons: Button[] = [{ ...EDIT_BUTTON }, { ...DELETE_BUTTON }];
    data: Task[] = getTaskData(20);
    fields: string[] = ['id'];
}

describe('PagedCollectionWithRaisedButtonToolbarComponent', () => {
    let component: TestPagedCollectionWithRaisedButtonToolbarComponent;
    let fixture: ComponentFixture<TestPagedCollectionWithRaisedButtonToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ButtonsComponent,
                PagedListWithRaisedButtonsBarComponent,
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
        fixture = TestBed.createComponent(
            TestPagedCollectionWithRaisedButtonToolbarComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
