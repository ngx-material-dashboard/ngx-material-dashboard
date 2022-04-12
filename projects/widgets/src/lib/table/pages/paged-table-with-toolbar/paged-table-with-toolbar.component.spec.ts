import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonApiDatastore } from '@ngx-material-dashboard/json-api';
import { MockModule } from 'ng-mocks';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { Datastore } from '../../../../../test/mocks/datastore.service';
import { TablePageHelper } from '../../../../../test/helpers/table-page.helper';
import { DummyObject } from '../../../../../test/mocks/dummy-object.mock';
import { PagedTableWithToolbar } from '../../interfaces/paged-table-with-toolbar.interface';
import { FilterDropDownComponent } from '../../components/filter-drop-down/filter-drop-down.component';
import { TableToolbarComponent } from '../../components/table-toolbar/table-toolbar.component';
import { RemoteDataSource } from '../../shared/services/remote-data-source.service';
import { AbstractPagedTableWithToolbarComponent } from '../abstract-paged-table-with-toolbar/abstract-paged-table-with-toolbar.component';
import { PagedTableComponent } from '../paged-table/paged-table.component';
import { PagedTableWithToolbarComponent } from './paged-table-with-toolbar.component';
import { RemoteDataSourceMock } from '@ngx-material-dashboard/widgets/test/mocks/remote-data-source.service';

const testData: DummyObject[] = [
    { id: '1' } as DummyObject,
    { id: '2' } as DummyObject
];

@Component({
    template: `
    <app-paged-table-with-toolbar [toolbarButtons]="toolbarButtons" (buttonClick)="onButtonClick($event)">
        <app-filter-drop-down filter>
            <!-- filter form goes here -->
        </app-filter-drop-down>
        <app-paged-table matSort [buttons]="tableButtons" [dataSource]="dataSource" [displayedColumns]="displayedColumns" table>
            <ng-container matColumnDef="id">
                <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
                <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="noData">
                <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                    No data found
                </mat-footer-cell>
            </ng-container>
        </app-paged-table>
    </app-paged-table-with-toolbar>
    `
}) class TestPagedTableWithToolbarComponent 
    extends AbstractPagedTableWithToolbarComponent<DummyObject>
    implements PagedTableWithToolbar<DummyObject> {

    override displayedColumns: string[] = ['select', 'id', 'actions'];
    override jsonApiService: JsonApiDatastore;

    constructor(
        dialog: MatDialog,
        formBuilder: FormBuilder,
        jsonApiService: JsonApiDatastore,
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

describe('PagedTableWithToolbarComponent', () => {
    let component: TestPagedTableWithToolbarComponent;
    let fixture: ComponentFixture<TestPagedTableWithToolbarComponent>;
    let page: TablePageHelper<TestPagedTableWithToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                FilterDropDownComponent,
                AbstractPagedTableWithToolbarComponent,
                PagedTableComponent,
                PagedTableWithToolbarComponent,
                TableToolbarComponent,
                TestPagedTableWithToolbarComponent
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
                { provide: JsonApiDatastore, useClass: Datastore, deps: [HttpClient] }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPagedTableWithToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        page = new TablePageHelper<TestPagedTableWithToolbarComponent>(fixture);
    });

    // it('should filter out buttons that cannot be disabled by default', () => {
    //     expect(component..tableWithToolbar.disableableToolbarButtons.length).toBe(1);
    //     expect(component.tableWithToolbar.disableableToolbarButtons[0].click).toBe('edit');
    // });

    describe('Toolbar Tests', () => {

        it('should call onButtonClick event when button that requires selection clicked', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick');

            // and: a button from the toolbar
            const button: HTMLButtonElement = page.query('.marker-action-edit');

            // and: a selected row
            page.selectRow(0);

            // when: the button is clicked
            button.click();

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'edit', row: component.dataSource.data[0] });
        });

        it('should call onButtonClick event for buttons that don\'t require selection', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick');

            // and: a button from the toolbar
            const button: HTMLButtonElement = page.query('.marker-action-create');

            // when: the button is clicked
            button.click();

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'create' });
        });

        // it('should filter table data when user enters filter', async () => {
        //     // given: the filter input
        //     const filterInput: HTMLInputElement = page.query('.marker-input-table-filter');

        //     // and: default number of rows
        //     // const defaultNumRows = page.rows.length;

        //     // and: a spy on the onTableToolbarFilterChange method
        //     const spy = spyOn(page.component.tableWithToolbar, 'onTableToolbarFilterChange').and.callThrough();

        //     // when: the user enters a filter value in the toolbar
        //     page.setInputValue(filterInput, '1', 'keyup');
        //     await fixture.whenStable();

        //     // then: there should be fewer rows in the table
        //     expect(spy).toHaveBeenCalledWith('1');

        //     // TODO figure out why the below doesn't work with defaultNumRows set above
        //     // expect(page.rows.length).toBeLessThan(defaultNumRows);
        // });
    });

    describe('TableButton Tests', () => {

        it('should call onButtonClick event when action button clicked in row', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick');

            // when: a button is clicked in one of the rows
            page.clickTableButton('edit', 0);

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'edit', row: component.dataSource.data[0] });
        });
    });
});
