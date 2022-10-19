import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { JsonDatastore, JsonModel } from '@ngx-material-dashboard/base-json';
import { Datastore, DummyObject } from '@ngx-material-dashboard/testing';
import { JsonModelMock } from '@ngx-material-dashboard/widgets/test/mocks/json-model.mock';
import { MockModule } from 'ng-mocks';
import { ToastrModule } from 'ngx-toastr';
import { CompactPagedToolbarComponent } from '../../../toolbar/pages/compact-paged-toolbar/compact-paged-toolbar.component';

import { CompactPagedTableComponent } from './compact-paged-table.component';

describe('CompactPagedTableComponent', () => {
    let component: CompactPagedTableComponent<DummyObject>;
    let fixture: ComponentFixture<CompactPagedTableComponent<DummyObject>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CompactPagedTableComponent,
                CompactPagedToolbarComponent
            ],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                MatDialogModule,
                MatSortModule,
                MockModule(ToastrModule.forRoot())
            ],
            providers: [
                { provide: JsonDatastore, useValue: Datastore },
                { provide: JsonModel, useClass: JsonModelMock },
                { provide: MatSort, useClass: MatSort }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompactPagedTableComponent);
        component = fixture.componentInstance;
        component.initDataSource([]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
