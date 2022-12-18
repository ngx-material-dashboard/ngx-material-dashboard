import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    DummyObject,
    IconButtonsWithPaginatorBarElement,
    PagedTableWithToolbarElement,
    TEST_DATA
} from '@ngx-material-dashboard/testing';
import { CollectionModule } from '../../../collection/collection.module';
import { Button } from '../../../collection/interfaces/button.interface';
import { EDIT_BUTTON, DELETE_BUTTON } from '../../../collection/shared/buttons';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import {
    CREATE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON
} from '../../../toolbar/shared/toolbar-buttons';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { TableComponent } from '../../components/table/table.component';

import { TableWithIconButtonsPaginatorBarComponent } from './table-with-icon-buttons-paginator-bar.component';

@Component({
    template: `
        <ngx-material-dashboard-table-with-icon-buttons-paginator-bar
            [toolbarButtons]="toolbarButtons"
            class="marker-paged-table"
        >
            <ngx-material-dashboard-table
                matSort
                [collectionButtons]="collectionButtons"
                [dataSource]="data"
                [displayedColumns]="displayedColumns"
                collection
                #collection
            >
                <ng-container matColumnDef="id">
                    <mat-header-cell *matHeaderCellDef mat-sort-header
                        >ID</mat-header-cell
                    >
                    <mat-cell class="col1-cell" *matCellDef="let obj">{{
                        obj.id
                    }}</mat-cell>
                </ng-container>
                <ng-container matColumnDef="noData">
                    <mat-footer-cell
                        *matFooterCellDef
                        colspan="displayedColumns.length"
                        fxLayoutAlign="center center"
                    >
                        No data found
                    </mat-footer-cell>
                </ng-container>
            </ngx-material-dashboard-table>
        </ngx-material-dashboard-table-with-icon-buttons-paginator-bar>
    `
})
class TestTableWithIconButtonsPaginatorBarComponent {
    @ViewChild(TableWithIconButtonsPaginatorBarComponent)
    pagedTableComponent!: TableWithIconButtonsPaginatorBarComponent<DummyObject>;
    collectionButtons: Button[] = [EDIT_BUTTON, DELETE_BUTTON];
    toolbarButtons: ToolbarButton[] = [
        CREATE_TOOLBAR_BUTTON,
        EDIT_TOOLBAR_BUTTON,
        DELETE_TOOLBAR_BUTTON
    ];
    data: DummyObject[] = [];
    displayedColumns: string[] = ['select', 'id', 'actions'];
}

describe('TableWithIconButtonsPaginatorBarComponent', () => {
    const pageSize: number = 5;
    let component: TestTableWithIconButtonsPaginatorBarComponent;
    let fixture: ComponentFixture<TestTableWithIconButtonsPaginatorBarComponent>;
    let page: PagedTableWithToolbarElement;
    //let collection: TableElement;
    let toolbar: IconButtonsWithPaginatorBarElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TableComponent,
                TableWithIconButtonsPaginatorBarComponent,
                TestTableWithIconButtonsPaginatorBarComponent
            ],
            imports: [
                MatButtonModule,
                MatCheckboxModule,
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                MatToolbarModule,
                NoopAnimationsModule,
                FontAwesomeModule,
                CollectionModule,
                ToolbarModule
            ],
            teardown: { destroyAfterEach: false }
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(
            TestTableWithIconButtonsPaginatorBarComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();

        page = new PagedTableWithToolbarElement(
            fixture,
            '.marker-paged-table',
            [
                '.marker-button-create',
                '.marker-button-edit',
                '.marker-button-delete'
            ],
            true,
            'icon-buttons-with-paginator-bar'
        );
        toolbar = page.toolbar as IconButtonsWithPaginatorBarElement;
    });

    describe('Without Collection Data', () => {
        beforeEach(() => {
            component.data = [];
            fixture.detectChanges();

            component.pagedTableComponent.pageSize = pageSize;
            fixture.detectChanges();
        });

        it('should display no data row', () => {
            // given: the no data row
            const noDataRow: HTMLElement = page.collection.noDataRow;

            // expect: the row to be defined
            expect(noDataRow).toBeDefined();

            // and: the text of the row to be 'No data found'
            expect(noDataRow.innerText).toEqual('No data found');
        });

        it('should display "0 of 0" in paginator range label', () => {
            expect(toolbar.paginator.pagingatorRange.innerText).toEqual(
                '0 of 0'
            );
        });
    });

    describe('With Collection Data', () => {
        const testData = TEST_DATA;

        beforeEach(() => {
            component.data = testData;
            fixture.detectChanges();

            component.pagedTableComponent.pageSize = pageSize;
            fixture.detectChanges();
        });

        it(`should display "1 – ${pageSize} of ${testData.length}" in paginator range label`, () => {
            expect(toolbar.paginator.pagingatorRange.innerText).toEqual(
                `1 – ${pageSize} of ${testData.length}`
            );
        });

        it(`should display "${pageSize + 1} - ${pageSize + pageSize} of ${
            testData.length
        }" in paginator range label when next page button clicked`, () => {
            // when: next page button is clicked
            toolbar.paginator.clickNextButton();

            // then: the paginator range label should update to next page
            expect(toolbar.paginator.pagingatorRange.innerText).toEqual(
                `${pageSize + 1} – ${pageSize + pageSize} of ${testData.length}`
            );
        });
    });
});
