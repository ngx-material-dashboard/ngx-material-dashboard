import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { JsonDatastore, JsonModel } from '@ngx-material-dashboard/base-json';
import { DummyObject } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { ToastrModule } from 'ngx-toastr';

import { Datastore } from '../../../../../test/mocks/datastore.service';
import { AbstractPagedTableWithToolbarComponent } from './abstract-paged-table-with-toolbar.component';

describe('AbstractPagedTableWithToolbarComponent', () => {
    let component: AbstractPagedTableWithToolbarComponent<JsonModel>;
    let fixture: ComponentFixture<AbstractPagedTableWithToolbarComponent<JsonModel>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AbstractPagedTableWithToolbarComponent ],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                MatDialogModule,
                MockModule(ToastrModule.forRoot())
            ],
            providers: [
                { provide: JsonDatastore, useValue: Datastore },
                { provide: JsonModel, useClass: DummyObject }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AbstractPagedTableWithToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
