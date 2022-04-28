import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { JsonDatastore, JsonModel } from '@ngx-material-dashboard/base-json';
import { Datastore } from '@ngx-material-dashboard/testing';
import { JsonModelMock } from '@ngx-material-dashboard/widgets/test/mocks/json-model.mock';
import { MockModule } from 'ng-mocks';
import { ToastrModule } from 'ngx-toastr';

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
                { provide: JsonModel, useClass: JsonModelMock }
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
