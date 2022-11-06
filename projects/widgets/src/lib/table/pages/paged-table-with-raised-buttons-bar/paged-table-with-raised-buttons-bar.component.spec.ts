import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, PagedTableWithToolbarElement, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../../shared/buttons';
import { Button } from '../../../shared/interfaces/button.interface';
import { ButtonsComponent } from '../../../toolbar/components/buttons/buttons.component';
import { FilterDropDownComponent } from '../../../toolbar/components/filter-drop-down/filter-drop-down.component';
import { SearchFilterDirective } from '../../../toolbar/directives/search-filter.directive';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import { ButtonToolbarComponent } from '../../../toolbar/pages/button-toolbar/button-toolbar.component';
import { RaisedButtonToolbarComponent } from '../../../toolbar/pages/raised-button-toolbar/raised-button-toolbar.component';
import { CREATE_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON } from '../../../toolbar/shared/toolbar-buttons';
import { TableComponent } from '../../components/table/table.component';
import { PagedTableComponent } from '../paged-table/paged-table.component';

import { PagedTableWithRaisedButtonsBarComponent } from './paged-table-with-raised-buttons-bar.component';

@Component({
    template: `
    <ngx-material-dashboard-paged-table-with-raised-buttons-bar 
        matSort
        [toolbarButtons]="toolbarButtons"
        (buttonClick)="onButtonClick($event)">
        <ngx-material-dashboard-filter-drop-down filter>
            <!-- filter form goes here -->
        </ngx-material-dashboard-filter-drop-down>
        <ngx-material-dashboard-paged-table
            class="marker-paged-table"
            [collectionButtons]="collectionButtons"
            [data]="data"
            [displayedColumns]="displayedColumns"
            collection
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
    </ngx-material-dashboard-paged-table-with-raised-buttons-bar>
    `
}) class TestPagedTableWithRaisedButtonsBarComponent {
    @ViewChild(PagedTableWithRaisedButtonsBarComponent) pagedTableWithToolbar!: PagedTableWithRaisedButtonsBarComponent<DummyObject>;
    collectionButtons: Button[] = [{...EDIT_BUTTON}, {...DELETE_BUTTON}];
    toolbarButtons: ToolbarButton[] = [{...CREATE_TOOLBAR_BUTTON}, {...EDIT_TOOLBAR_BUTTON}, {...DELETE_TOOLBAR_BUTTON}];
    data: DummyObject[] = TEST_DATA;
    displayedColumns: string[] = ['select', 'id', 'actions'];

    onButtonClick(btnClick: ButtonClick): void {}
}

describe('PagedTableWithRaisedButtonsBarComponent', () => {
    let component: TestPagedTableWithRaisedButtonsBarComponent;
    let fixture: ComponentFixture<TestPagedTableWithRaisedButtonsBarComponent>;
    let page: PagedTableWithToolbarElement

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ButtonsComponent,
                ButtonToolbarComponent,
                FilterDropDownComponent,
                PagedTableComponent,
                PagedTableWithRaisedButtonsBarComponent,
                RaisedButtonToolbarComponent,
                SearchFilterDirective,
                TableComponent,
                TestPagedTableWithRaisedButtonsBarComponent
            ],
            imports: [
                NoopAnimationsModule,
                MatButtonModule,
                MatCheckboxModule,
                MatMenuModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                MatToolbarModule,
                FlexLayoutModule,
                FontAwesomeModule
            ],
            teardown: { destroyAfterEach: false }
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPagedTableWithRaisedButtonsBarComponent);
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
            page.table.selectItem(0);

            // when: the button is clicked
            page.toolbar.clickButton('.marker-action-edit');

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'edit', row: component.pagedTableWithToolbar.dataSource$.data[0] });
        });

        it('should call onButtonClick event for buttons that don\'t require selection', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component.pagedTableWithToolbar, 'onToolbarButtonClick').and.callThrough();

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

    // describe('Sorting Tests', () => {

    //     it('should call load method in remote data source when column sorted', () => {
    //         // given: a spy on the remote data source
    //         const spy = spyOn(component.dataSource$, 'load');

    //         page.table.clickColumnHeader('id');

    //         expect(spy).toHaveBeenCalledWith({}, 'id', 'asc', 0, 20, '', new HttpHeaders());
    //     });
    // });

    describe('TableButton Tests', () => {

        it('should call onButtonClick event when action button clicked in row', () => {
            // given: a spy on the buttonClick for the paged collection (based
            // on answer to stackoverflow here: https://stackoverflow.com/a/41924755)
            const spy = spyOn(component.pagedTableWithToolbar.collectionCmp, 'onButtonClick');

            // when: a button is clicked in one of the rows
            page.table.clickItemButton('edit', 0);

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'edit', row: component.pagedTableWithToolbar.dataSource$.data[0] });
        });
    });
});
