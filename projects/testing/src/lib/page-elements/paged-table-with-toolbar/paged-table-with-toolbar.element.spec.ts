import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DummyObject, DUMMY_OBJECT_DATA } from '../../mocks/dummy-object.mock';
import { PagedTableWithToolbarElement } from './paged-table-with-toolbar.element';

@Component({
    styles: ['.hide { display: none; }'],
    template: `
        <mat-toolbar>
            <button class="marker-action-enabled"
                (click)="emitButtonClick()"
                mat-button>
            </button>
            <button class="marker-action-disabled"
                (click)="emitButtonClick()"
                disabled="true"
                mat-button>
            </button>
        </mat-toolbar>
        <div class="marker-pagedTable">
            <mat-table [dataSource]="dataSource">
                <!-- Checkbox Column -->
                <ng-container matColumnDef="select">
                    <mat-header-cell *matHeaderCellDef>
                        <mat-checkbox class="marker-checkbox-select-all">
                        </mat-checkbox>
                    </mat-header-cell>
                    <mat-cell *matCellDef="let row">
                        <mat-checkbox class="marker-checkbox-row-select">
                        </mat-checkbox>
                    </mat-cell>
                </ng-container>
                <!-- Additional columns defined in tag where this component is used -->
                <ng-container matColumnDef="id">
                    <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
                    <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
                </ng-container>
                <ng-container matColumnDef="noData">
                    <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                        No data found
                    </mat-footer-cell>
                </ng-container>

                <!-- Actions Column (where buttons go) -->
                <ng-container matColumnDef="actions">
                    <mat-header-cell *matHeaderCellDef></mat-header-cell>
                    <mat-cell class="actions-cell" *matCellDef="let row">
                        <button class="button-marker-edit" (click)="onActionButtonClick('edit', row)">
                            Edit
                        </button>
                        <button class="button-marker-delete" (click)="onActionButtonClick('delete', row)">
                            Delete
                        </button>
                    </mat-cell>
                </ng-container>

                <!-- row definitions -->
                <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                <mat-row *matRowDef="let row; columns: displayedColumns" class="pointer"></mat-row>
                <mat-footer-row *matFooterRowDef="['noData']" [ngClass]="{'hide': length > 0}"></mat-footer-row>
            </mat-table>
            <mat-paginator [length]="length" 
                            [pageSize]="pageSize" 
                            [pageSizeOptions]="[15, 25, 50, 75, 100]">
            </mat-paginator>
        </div>
    `
}) class PagedTableWithToolbarComponent {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource: MatTableDataSource<DummyObject> = new MatTableDataSource();
    displayedColumns: string[] = ['select', 'id', 'actions'];
    length = 0;
    pageSize = 25; 

    set data(data: DummyObject[]) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.length = data.length;
    }

    onActionButtonClick(action: string, row: DummyObject): void {}
}

describe('PagedTableWithToolbarElement', () => {

    let pagedTableWithToolbarElement: PagedTableWithToolbarElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PagedTableWithToolbarComponent],
            imports: [
                MatCheckboxModule,
                MatTableModule,
                MatToolbarModule,
                MatPaginatorModule,
                NoopAnimationsModule
            ],
            
        });
    
        const fixture = TestBed.createComponent(PagedTableWithToolbarComponent);
        fixture.detectChanges();
    
        pagedTableWithToolbarElement = new PagedTableWithToolbarElement(fixture, '.marker-pagedTable', []); 
    });

    it('should create element', () => {
        expect(pagedTableWithToolbarElement).toBeDefined();
    });
});