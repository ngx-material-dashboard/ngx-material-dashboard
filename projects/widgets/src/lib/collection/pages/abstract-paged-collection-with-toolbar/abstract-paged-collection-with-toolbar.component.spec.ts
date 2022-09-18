import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { JsonDatastore, JsonModel } from '@ngx-material-dashboard/base-json';
import { Datastore } from '@ngx-material-dashboard/testing';
import { JsonModelMock } from '@ngx-material-dashboard/widgets/test/mocks/json-model.mock';
import { MockModule } from 'ng-mocks';
import { ToastrModule } from 'ngx-toastr';

import { AbstractPagedCollectionWithToolbarComponent } from './abstract-paged-collection-with-toolbar.component';

describe('AbstractPagedCollectionWithToolbarComponent', () => {
    let component: AbstractPagedCollectionWithToolbarComponent<JsonModel>;
    let fixture: ComponentFixture<AbstractPagedCollectionWithToolbarComponent<JsonModel>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AbstractPagedCollectionWithToolbarComponent ],
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
        fixture = TestBed.createComponent(AbstractPagedCollectionWithToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
