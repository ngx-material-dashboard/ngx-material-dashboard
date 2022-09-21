import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, DummyObject } from '@ngx-material-dashboard/testing';
import { RemoteDataSourceMock } from '@ngx-material-dashboard/widgets/test/mocks/remote-data-source.service';
import { MockModule } from 'ng-mocks';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AbstractPagedCollectionWithToolbarComponent, PagedGridComponent } from '../../..';
import { ToolbarModule } from '../../../toolbar/toolbar.module';

import { PagedGridWithToolbarComponent } from './paged-grid-with-toolbar.component';

const testData: DummyObject[] = [
    { id: '1' } as DummyObject,
    { id: '2' } as DummyObject
];

@Component({
    template: `
    <ngx-material-dashboard-paged-grid-with-toolbar [toolbarButtons]="toolbarButtons">
        <ngx-material-dashboard-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-material-dashboard-filter-drop-down>
        <ngx-material-dashboard-paged-grid [data]="data" class="marker-paged-grid" grid>
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
        </ngx-material-dashboard-paged-grid>
    </ngx-material-dashboard-paged-grid-with-toolbar>
    `
}) class TestPagedGridWithToolbarComponent 
    extends AbstractPagedCollectionWithToolbarComponent<DummyObject> {

    override jsonApiService: JsonDatastore;

    constructor(
        dialog: MatDialog,
        formBuilder: FormBuilder,
        jsonApiService: JsonDatastore,
        toastrService: ToastrService
    ) {
        super(DummyObject, dialog, formBuilder, jsonApiService, toastrService);
        this.jsonApiService = jsonApiService;
        const remoteDataSource = new RemoteDataSourceMock<DummyObject>(DummyObject, jsonApiService);
        remoteDataSource.setTestData(testData);
        this.dataSource = remoteDataSource;
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dataSource.load();
    }

    override openCreateDialog(): void {
    }

    override openConfirmDeleteDialog(val: DummyObject): void {
    }
}

describe('PagedGridWithToolbarComponent', () => {
    let component: TestPagedGridWithToolbarComponent;
    let fixture: ComponentFixture<TestPagedGridWithToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PagedGridComponent,
        PagedGridWithToolbarComponent
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
        MockModule(ToastrModule.forRoot())
      ],
      providers: [
        { provide: Datastore, deps: [HttpClient] },
        { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPagedGridWithToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
