import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { JsonApiDatastore, JsonApiModel } from '@ngx-material-dashboard/json-api';
import { MockModule } from 'ng-mocks';
import { ToastrModule } from 'ngx-toastr';

import { Datastore } from '../../../../../test/mocks/datastore.service';
import { DummyObject } from '../../../../../test/mocks/dummy-object.mock';
import { AbstractPagedTableWithToolbarComponent } from './abstract-paged-table-with-toolbar.component';

describe('AbstractPagedTableWithToolbarComponent', () => {
    let component: AbstractPagedTableWithToolbarComponent<DummyObject>;
    let fixture: ComponentFixture<AbstractPagedTableWithToolbarComponent<DummyObject>>;

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
                { provide: JsonApiDatastore, useValue: Datastore },
                { provide: JsonApiModel, useClass: DummyObject }
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
