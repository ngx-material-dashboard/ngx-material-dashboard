import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    Task,
    IconButtonsWithPaginatorBarElement,
    PagedCollectionWithToolbarElement,
    getTaskData
} from '@ngx-material-dashboard/testing';
import { ListComponent } from '../../../list/components/list/list.component';
import { ListWithIconButtonsPaginatorBarComponent } from '../../../list/pages/list-with-icon-buttons-paginator-bar/list-with-icon-buttons-paginator-bar.component';

import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import {
    CREATE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON
} from '../../../toolbar/shared/toolbar-buttons';
import { ToolbarModule } from '../../../toolbar/toolbar.module';
import { CollectionModule } from '../../collection.module';
import { Button } from '../../interfaces/button.interface';
import { EDIT_BUTTON, DELETE_BUTTON } from '../../shared/buttons';

const pageSize = 5;
const testData = getTaskData(20);

/** Component to test with. */
@Component({
    template: `
        <ngx-mat-list-with-icon-buttons-paginator-bar
            [displaySorterInToolbar]="displaySorterInToolbar"
            [toolbarButtons]="toolbarButtons"
            (buttonClick)="onButtonClick($event)"
            class="marker-paged-list"
            #pagedListWithToolbar
        >
            <ngx-mat-list
                [collectionButtons]="collectionButtons"
                [dataSource]="data"
                [fields]="fields"
                collection
                #collection
            >
                <ng-template #model let-model="model">
                    <div fxLayout="row">
                        <span>Dummy Model</span>
                        <span>{{ model.id }}</span>
                    </div>
                </ng-template>
            </ngx-mat-list>
        </ngx-mat-list-with-icon-buttons-paginator-bar>
    `
})
class TestPagedCollectionWithIconToolbarComponent {
    @ViewChild('pagedListWithToolbar')
    pagedListWithToolbar!: ListWithIconButtonsPaginatorBarComponent<Task>;
    collectionButtons: Button[] = [EDIT_BUTTON, DELETE_BUTTON];
    toolbarButtons: ToolbarButton[] = [
        CREATE_TOOLBAR_BUTTON,
        EDIT_TOOLBAR_BUTTON,
        DELETE_TOOLBAR_BUTTON
    ];
    data: Task[] = testData;
    displaySorterInToolbar = false;
    fields: string[] = ['id'];

    onButtonClick(btnClick: ButtonClick) {}
}

describe('PagedCollectionWithIconToolbarComponent', () => {
    let component: TestPagedCollectionWithIconToolbarComponent;
    let fixture: ComponentFixture<TestPagedCollectionWithIconToolbarComponent>;
    let page: PagedCollectionWithToolbarElement;
    let toolbar: IconButtonsWithPaginatorBarElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ListComponent,
                ListWithIconButtonsPaginatorBarComponent,
                TestPagedCollectionWithIconToolbarComponent
            ],
            imports: [
                FlexLayoutModule,
                MatButtonModule,
                MatCheckboxModule,
                MatPaginatorModule,
                MatSortModule,
                MatToolbarModule,
                NoopAnimationsModule,
                FontAwesomeModule,
                CollectionModule,
                ToolbarModule
            ],
            teardown: { destroyAfterEach: false }
        });
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(
            TestPagedCollectionWithIconToolbarComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();

        page = new PagedCollectionWithToolbarElement(
            fixture,
            '.marker-paged-list',
            '.marker-list-item',
            '.marker-checkbox-item-select',
            [
                '.marker-button-create',
                '.marker-button-edit',
                '.marker-button-delete'
            ],
            true,
            'icon-buttons-with-paginator-bar'
        );
        toolbar = page.toolbar as IconButtonsWithPaginatorBarElement;

        component.data = testData;
        fixture.detectChanges();

        component.pagedListWithToolbar.pageSize = pageSize;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    describe('Toolbar Tests', () => {
        it('should call onButtonClick event when button that requires selection clicked', async () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick');

            // and: a selected row
            page.collection.selectItem(0);

            // when: the button is clicked
            await toolbar.clickButton('.marker-button-edit');

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({
                click: 'edit',
                row: component.pagedListWithToolbar.collection.dataSource$
                    .data[0]
            });
        });

        it("should call onButtonClick event for buttons that don't require selection", async () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick').and.callThrough();

            // when: the button is clicked
            await toolbar.clickButton('.marker-button-create');

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'create' });
        });

        it('should not render sorter in toolbar by default', () => {
            expect(toolbar.sorter).toBeUndefined();
        });

        it('should render sorter in toolbar when requested', () => {
            component.displaySorterInToolbar = true;
            fixture.detectChanges();

            expect(component.pagedListWithToolbar.sort).toBeDefined();
        });
    });

    describe('With Collection Data', () => {
        beforeEach(async () => {
            component.data = testData;
            fixture.detectChanges();

            component.pagedListWithToolbar.pageSize = pageSize;
            fixture.detectChanges();
            await fixture.whenStable();
        });

        it(`should display "1 – ${pageSize} of ${testData.length}" in paginator range label`, () => {
            fixture.detectChanges();
            expect(toolbar.paginator.pagingatorRange.innerText.trim()).toEqual(
                `1 – ${pageSize} of ${testData.length}`
            );
        });

        it(`should display "${pageSize + 1} - ${pageSize + pageSize} of ${
            testData.length
        }" in paginator range label when next page button clicked`, () => {
            // when: next page button is clicked
            fixture.detectChanges();
            toolbar.paginator.clickNextButton();

            // then: the paginator range label should update to next page
            expect(toolbar.paginator.pagingatorRange.innerText).toEqual(
                `${pageSize + 1} – ${pageSize + pageSize} of ${testData.length}`
            );
        });

        it('should render sorter in collection', () => {
            expect(page.collection.sorter).toBeDefined();
            expect(
                component.pagedListWithToolbar.collection.sort
            ).toBeDefined();
        });
    });
});
