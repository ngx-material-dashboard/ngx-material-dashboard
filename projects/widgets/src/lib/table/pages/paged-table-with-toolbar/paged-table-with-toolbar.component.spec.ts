import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, forwardRef, ViewChild } from '@angular/core';
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
import { JsonDatastore } from '@ngx-material-dashboard/base-json';
import { Datastore, DummyObject, PagedTableWithToolbarElement } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { RemoteDataSourceMock } from '../../../../../test/mocks/remote-data-source.service';
import { PagedTableWithToolbar } from '../../interfaces/paged-table-with-toolbar.interface';
import { FilterDropDownComponent } from '../../../toolbar/components/filter-drop-down/filter-drop-down.component';
import { ButtonToolbarComponent } from '../../../toolbar/pages/button-toolbar/button-toolbar.component';
import { PagedTableComponent } from '../paged-table/paged-table.component';
import { PagedTableWithToolbarComponent } from './paged-table-with-toolbar.component';
import { AbstractPagedCollectionWithToolbarComponent } from '../../../collection/pages/abstract-paged-collection-with-toolbar/abstract-paged-collection-with-toolbar.component';
import { ButtonsComponent } from '../../../toolbar/components/buttons/buttons.component';
import { SelectionService } from '../../../shared/services/selection.service';
import { CollectionModule } from '../../../collection/collection.module';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { AbstractPagedCollectionComponent } from '../../../collection/pages/abstract-paged-collection/abstract-paged-collection.component';
import { BasePagedCollectionWithToolbarComponent } from '../../../collection/components/base-paged-collection-with-toolbar/base-paged-collection-with-toolbar.component';

const testData: DummyObject[] = [
    { id: '1' } as DummyObject,
    { id: '2' } as DummyObject
];

@Component({
    template: `
    <ngx-material-dashboard-paged-table-with-toolbar
        [toolbarButtons]="toolbarButtons"
        (buttonClick)="onButtonClick($event)">
        <ngx-material-dashboard-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-material-dashboard-filter-drop-down>
        <ngx-material-dashboard-paged-table collection
            matSort
            [collectionButtons]="collectionButtons"
            [dataSource]="dataSource"
            [displayedColumns]="displayedColumns"
            class="marker-paged-table"
            #pagedCollection>
            <ng-container matColumnDef="id">
                <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
                <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="noData">
                <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                    No data found
                </mat-footer-cell>
            </ng-container>
        </ngx-material-dashboard-paged-table>
    </ngx-material-dashboard-paged-table-with-toolbar>
    `
}) class TestPagedTableWithToolbarComponent
    extends AbstractPagedCollectionWithToolbarComponent<DummyObject>
    implements PagedTableWithToolbar<DummyObject> {

    displayedColumns: string[] = ['select', 'id', 'actions'];
    override jsonApiService: JsonDatastore;

    constructor(
        dialog: MatDialog,
        formBuilder: FormBuilder,
        jsonApiService: JsonDatastore,
        selectionService: SelectionService<DummyObject>,
        toastrService: ToastrService
    ) {
        super(DummyObject, dialog, formBuilder, jsonApiService, selectionService, toastrService);
        this.jsonApiService = jsonApiService;
        const remoteDataSource = new RemoteDataSourceMock<DummyObject>(DummyObject, jsonApiService);
        remoteDataSource.setTestData(testData);
        this.dataSource = remoteDataSource;
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dataSource.load();
    }

    // override openCreateDialog(): void {
    // }

    // override openConfirmDeleteDialog(val: DummyObject): void {
    // }
}

describe('PagedTableWithToolbarComponent', () => {
    let component: TestPagedTableWithToolbarComponent;
    let fixture: ComponentFixture<TestPagedTableWithToolbarComponent>;
    let page: PagedTableWithToolbarElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PagedTableComponent,
                PagedTableWithToolbarComponent,
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
                MatPaginatorModule,
                MatSortModule,
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
            ],
            providers: [
                { provide: Datastore, deps: [HttpClient] },
                { provide: JsonDatastore, useClass: Datastore, deps: [HttpClient] }
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPagedTableWithToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        page = new PagedTableWithToolbarElement(
            fixture,
            '.marker-paged-table',
            ['.marker-action-create', '.marker-action-edit', '.marker-action-delete']
        );
    });

    // it('should filter out buttons that cannot be disabled by default', () => {
    //     expect(component..tableWithToolbar.disableableToolbarButtons.length).toBe(1);
    //     expect(component.tableWithToolbar.disableableToolbarButtons[0].click).toBe('edit');
    // });

    describe('Toolbar Tests', () => {

        it('should call onButtonClick event when button that requires selection clicked', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick');

            // and: a selected row
            page.table.selectRow(0);

            // when: the button is clicked
            page.toolbar.clickButton('.marker-action-edit');

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'edit', row: component.dataSource.data[0] });
        });

        it('should call onButtonClick event for buttons that don\'t require selection', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick').and.callThrough();

            // when: the button is clicked
            page.toolbar.clickButton('.marker-action-create');

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

    describe('Sorting Tests', () => {

        it('should call load method in remote data source when column sorted', () => {
            // given: a spy on the remote data source
            const spy = spyOn(component.dataSource, 'load');

            page.table.clickColumnHeader('id');

            expect(spy).toHaveBeenCalledWith({}, 'id', 'asc', 0, 20, '', new HttpHeaders());
        });
    });

    describe('TableButton Tests', () => {

        it('should call onButtonClick event when action button clicked in row', () => {
            // given: a spy on the buttonClick for the paged collection (based
            // on answer to stackoverflow here: https://stackoverflow.com/a/41924755)
            const spy = spyOn(component, 'onButtonClick');

            // when: a button is clicked in one of the rows
            page.table.clickTableButton('edit', 0);

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'edit', row: component.dataSource.data[0] });
        });
    });
});
