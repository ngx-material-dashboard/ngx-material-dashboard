import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { IconButtonsComponent } from '../../../toolbar/components/icon-buttons/icon-buttons.component';
import { IconButtonsWithPaginatorComponent } from '../../../toolbar/pages/icon-buttons-with-paginator/icon-buttons-with-paginator.component';
import { TableComponent } from '../../components/table/table.component';

import { TableWithIconButtonsPaginatorBarComponent } from './table-with-icon-buttons-paginator-bar.component';

@Component({
    template: `
    <ngx-material-dashboard-table-with-icon-buttons-paginator-bar
        [toolbarButtons]="toolbarButtons"
        class="marker-paged-table"
        matSort>
        <ngx-material-dashboard-table
            [data]="data"
            [displayedColumns]="displayedColumns">
            <ng-container matColumnDef="id">
                <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
                <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="noData">
                <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                    No data found
                </mat-footer-cell>
            </ng-container>
        </ngx-material-dashboard-table>
    </ngx-material-dashboard-table-with-icon-buttons-paginator-bar>
    `
}) class TestTableWithIconButtonsPaginatorBarComponent {
    //collectionButtons: Button[] = [EDIT_BUTTON, DELETE_BUTTON];
    data: DummyObject[] = TEST_DATA;
    displayedColumns: string[] = ['select', 'id', 'actions'];
}

describe('TableWithIconButtonsPaginatorBarComponent', () => {
    let component: TestTableWithIconButtonsPaginatorBarComponent;
    let fixture: ComponentFixture<TestTableWithIconButtonsPaginatorBarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                IconButtonsComponent,
                TableComponent,
                TableWithIconButtonsPaginatorBarComponent,
                IconButtonsWithPaginatorComponent
            ],
            imports: [
                MockModule(MatButtonModule),
                MockModule(MatCheckboxModule),
                MatPaginatorModule,
                MatSortModule,
                MatTableModule,
                MockModule(FlexLayoutModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTableWithIconButtonsPaginatorBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
