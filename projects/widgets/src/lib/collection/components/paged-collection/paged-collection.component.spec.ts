import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    PagedCollectionElement,
    Task,
    getTaskData
} from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { ListComponent } from '../../../list/components/list/list.component';
import { PagedListComponent } from '../../../list/pages/paged-list/paged-list.component';

import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { PagedCollectionComponent } from './paged-collection.component';

const pageSize = 5;

/** Component to test with. */
@Component({
    template: `
        <ngx-material-dashboard-paged-list
            [dataSource]="data"
            [fields]="fields"
            [pageSize]="pageSize"
            class="marker-paged-list"
        >
            <ng-template #model let-model="model">
                <div fxLayout="row">
                    <span>Dummy Model</span>
                    <span>{{ model.id }}</span>
                </div>
            </ng-template>
        </ngx-material-dashboard-paged-list>
    `
})
class TestPagedCollectionComponent {
    @ViewChild(PagedListComponent) pagedList!: PagedListComponent<Task>;
    data: Task[] = [];
    fields: string[] = ['id'];
    pageSize: number = pageSize;
}

describe('PagedCollectionComponent', () => {
    let component: TestPagedCollectionComponent;
    let fixture: ComponentFixture<TestPagedCollectionComponent>;
    let page: PagedCollectionElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                ListComponent,
                PagedListComponent,
                PagedCollectionComponent,
                SorterComponent,
                TestPagedCollectionComponent
            ],
            imports: [
                FlexLayoutModule,
                NoopAnimationsModule,
                MatCheckboxModule,
                MatPaginatorModule,
                MatSelectModule,
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPagedCollectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        page = new PagedCollectionElement(
            fixture,
            '.marker-paged-list',
            '.marker-list-item',
            '.marker-checkbox-item-select'
        );
    });

    describe('No Collection Data', () => {
        it('should display "0 of 0" in paginator range label', () => {
            expect(page.paginator.pagingatorRange.innerText).toEqual('0 of 0');
        });
    });

    describe('With Collection Data', () => {
        const testData = getTaskData(20);

        beforeEach(() => {
            component.data = testData;
            fixture.detectChanges();
        });

        it(`should display "1 – ${pageSize} of ${testData.length}" in paginator range label`, () => {
            expect(page.paginator.pagingatorRange.innerText).toEqual(
                `1 – ${pageSize} of ${testData.length}`
            );
        });

        it(`should display "${pageSize + 1} - ${pageSize + pageSize} of ${
            testData.length
        }" in paginator range label when next page button clicked`, () => {
            // when: next page button is clicked
            page.paginator.clickNextButton();

            // then: the paginator range label should update to next page
            expect(page.paginator.pagingatorRange.innerText).toEqual(
                `${pageSize + 1} – ${pageSize + pageSize} of ${testData.length}`
            );
        });

        it('should return null for paginator if paginator$ undefined', () => {
            component.pagedList.paginator$ = undefined;
            fixture.detectChanges();

            expect(component.pagedList.paginator).toBeNull();
        });
    });
});
