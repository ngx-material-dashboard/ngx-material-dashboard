import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { ToastrModule } from 'ngx-toastr';
import { PagedListWithToolbarComponent } from '../../../list/pages/paged-list-with-toolbar/paged-list-with-toolbar.component';

import { PagedListComponent } from '../../../list/pages/paged-list/paged-list.component';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { CollectionModule } from '../../collection.module';

import { BasePagedCollectionWithToolbarComponent } from './base-paged-collection-with-toolbar.component';

@Component({
    template: `
    <ngx-material-dashboard-button-toolbar [buttons]="toolbarButtons" (buttonClick)="onToolbarButtonClick($event)">
        <ng-content select="[filter]"></ng-content>
    </ngx-material-dashboard-button-toolbar>
    <!-- paged-list -->
    <ng-content select="[collection]"></ng-content>`
}) class TestBasePagedCollectionWithToolbarComponent
    extends BasePagedCollectionWithToolbarComponent<DummyObject> {}

@Component({
    template: `
    <ngx-material-dashboard-paged-list-with-toolbar [toolbarButtons]="toolbarButtons">
        <ngx-material-dashboard-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-material-dashboard-filter-drop-down>
        <ngx-material-dashboard-paged-list collection
            [data]="data"
            class="marker-paged-list"
            #pagedCollection>
            <ng-template #model let-model="model">
                <mat-card>
                    <mat-card-title>
                        {{model.id}} Title
                    </mat-card-title>
                    <mat-card-content>
                        Content for dummy object {{model.id}}
                    </mat-card-content>
                </mat-card>
            </ng-template>
        </ngx-material-dashboard-paged-list>
    </ngx-material-dashboard-paged-list-with-toolbar>`
}) class TestPagedCollectionWithToolbarComponent {}

describe('BasePagedCollectionWithToolbarComponent', () => {
    let component: TestPagedCollectionWithToolbarComponent;
    let fixture: ComponentFixture<TestPagedCollectionWithToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BasePagedCollectionWithToolbarComponent,
                PagedListComponent,
                PagedListWithToolbarComponent,
                TestBasePagedCollectionWithToolbarComponent,
                TestPagedCollectionWithToolbarComponent
            ],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                MatButtonModule,
                MatDialogModule,
                MatCheckboxModule,
                MatFormFieldModule,
                MatInputModule,
                MatMenuModule,
                MatTableModule,
                MatToolbarModule,
                NoopAnimationsModule,
                FlexLayoutModule,
                MatSortModule,
                MatPaginatorModule,
                FontAwesomeModule,
                MockModule(ToastrModule.forRoot()),
                CollectionModule,
                ToolbarModule
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
