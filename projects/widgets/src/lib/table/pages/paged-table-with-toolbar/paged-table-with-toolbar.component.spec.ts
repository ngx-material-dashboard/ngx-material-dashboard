import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockModule } from 'ng-mocks';

import { JsonApiModel } from '@ngx-material-dashboard/json-api';
import { TableToolbarComponent } from '../../components/table-toolbar/table-toolbar.component';
import { ButtonClick } from '../../interfaces/button-click.interface';
import { TableButton } from '../../interfaces/table-button.interface';
import { TableToolbarButton } from '../../interfaces/table-toolbar-button.interface';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../shared/table-buttons';
import { CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON } from '../../shared/table-toolbar-buttons';
import { PagedTableComponent } from '../paged-table/paged-table.component';
import { TablePageHelper } from '../../../../../test/helpers/table-page.helper';
import { DummyObject } from '../../../../../test/mocks/dummy-object.mock';
import { PagedTableWithToolbarComponent } from './paged-table-with-toolbar.component';
import { JsonApiDatastore } from '@ngx-material-dashboard/json-api';

@Component({
    template: `
    <app-paged-table-with-toolbar [toolbarButtons]="toolbarButtons">
        <app-paged-table matSort [buttons]="tableButtons" [data]="data" [displayedColumns]="displayedColumns">
            <ng-container matColumnDef="sysId">
                <mat-header-cell *matHeaderCellDef mat-sort-header>SysID</mat-header-cell>
                <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.sysId}}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="noData">
                <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                    No data found
                </mat-footer-cell>
            </ng-container>
        </app-paged-table>
    </app-paged-table-with-toolbar>
    `
}) class TestPagedTableWithToolbarComponent {

    @ViewChild(PagedTableComponent) table!: PagedTableComponent<DummyObject>;
    @ViewChild(PagedTableWithToolbarComponent) tableWithToolbar!: PagedTableWithToolbarComponent<DummyObject>;
    data: JsonApiModel[] = [
        { id: '1' } as DummyObject,
        { id: '2' } as DummyObject
    ];
    displayedColumns: string[] = ['select', 'sysId', 'actions'];
    tableButtons: TableButton[] = [EDIT_BUTTON, DELETE_BUTTON];
    toolbarButtons: TableToolbarButton[] = [CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON];
}

describe('PagedTableWithToolbarComponent', () => {
    let component: TestPagedTableWithToolbarComponent;
    let fixture: ComponentFixture<TestPagedTableWithToolbarComponent>;
    let page: TablePageHelper<TestPagedTableWithToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PagedTableComponent,
                PagedTableWithToolbarComponent,
                TableToolbarComponent,
                TestPagedTableWithToolbarComponent
            ],
            imports: [
                MatButtonModule,
                MatCheckboxModule,
                MatFormFieldModule,
                MatInputModule,
                MatTableModule,
                MatToolbarModule,
                NoopAnimationsModule,
                FlexLayoutModule,
                MockModule(MatSortModule),
                MockModule(MatPaginatorModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPagedTableWithToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        page = new TablePageHelper<TestPagedTableWithToolbarComponent>(fixture);
    });

    it('should filter out buttons that cannot be disabled by default', () => {
        expect(component.tableWithToolbar.disableableToolbarButtons.length).toBe(1);
        expect(component.tableWithToolbar.disableableToolbarButtons[0].click).toBe('edit');
    });

    describe('Toolbar Tests', () => {

        it('should emit buttonClick event when button that requires selection clicked', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(page.component.tableWithToolbar.buttonClick, 'emit');

            // and: a button from the toolbar
            const button: HTMLButtonElement = page.query('.marker-action-edit');

            // and: a selected row
            page.selectRow(0);

            // when: the button is clicked
            button.click();

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'edit', row: component.data[0] });
        });

        it('should emit buttonClick event for buttons that don\'t require selection', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(page.component.tableWithToolbar.buttonClick, 'emit');

            // and: a button from the toolbar
            const button: HTMLButtonElement = page.query('.marker-action-create');

            // when: the button is clicked
            button.click();

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'create' });
        });

        it('should filter table data when user enters filter', async () => {
            // given: the filter input
            const filterInput: HTMLInputElement = page.query('.marker-input-table-filter');

            // and: default number of rows
            // const defaultNumRows = page.rows.length;

            // and: a spy on the onTableToolbarFilterChange method
            const spy = spyOn(page.component.tableWithToolbar, 'onTableToolbarFilterChange').and.callThrough();

            // when: the user enters a filter value in the toolbar
            page.setInputValue(filterInput, '1', 'keyup');
            await fixture.whenStable();

            // then: there should be fewer rows in the table
            expect(spy).toHaveBeenCalledWith('1');

            // TODO figure out why the below doesn't work with defaultNumRows set above
            // expect(page.rows.length).toBeLessThan(defaultNumRows);
        });
    });

    describe('TableButton Tests', () => {

        it('should emit buttonClick event when action button clicked in row', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(page.component.tableWithToolbar.buttonClick, 'emit');

            // when: a button is clicked in one of the rows
            page.clickTableButton('edit', 0);

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'edit', row: component.data[0] });
        });
    });
});
