import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Task, getTaskData } from '@ngx-material-dashboard/testing';

import { PagedListWithRaisedButtonsBarComponent } from '../../../list/pages/paged-list-with-raised-buttons-bar/paged-list-with-raised-buttons-bar.component';
import { PagedListComponent } from '../../../list/pages/paged-list/paged-list.component';
import { ListComponent } from '../../../list/components/list/list.component';
import { PagedCollectionWithToolbarElement } from '@ngx-material-dashboard/testing/src/lib/page-elements/paged-collection-with-toolbar/paged-collection-with-toolbar.element';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import { Button } from '../../interfaces/button.interface';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../shared/buttons';
import {
    CREATE_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON
} from '../../../toolbar/shared/toolbar-buttons';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CollectionModule } from '../../collection.module';
import { ToolbarModule } from '../../../toolbar/toolbar.module';

const testData = getTaskData(20);

/** Component to test with. */
@Component({
    template: `
        <ngx-mat-paged-list-with-raised-buttons-bar
            [toolbarButtons]="toolbarButtons"
            (buttonClick)="onButtonClick($event)"
            #pagedListWithToolbar
        >
            <ngx-mat-paged-list
                [collectionButtons]="collectionButtons"
                [dataSource]="data"
                [fields]="fields"
                class="marker-paged-list"
                collection
                #collection
            >
                <ng-template #model let-model="model">
                    <div fxLayout="row">
                        <span>Dummy Model</span>
                        <span>{{ model.id }}</span>
                    </div>
                </ng-template>
            </ngx-mat-paged-list>
        </ngx-mat-paged-list-with-raised-buttons-bar>
    `
})
class TestPagedCollectionWithToolbarComponent {
    @ViewChild('pagedListWithToolbar')
    pagedListWithToolbar!: PagedListWithRaisedButtonsBarComponent<Task>;
    data: Task[] = testData;
    fields: string[] = ['id'];
    collectionButtons: Button[] = [{ ...EDIT_BUTTON }, { ...DELETE_BUTTON }];
    toolbarButtons: ToolbarButton[] = [
        { ...CREATE_TOOLBAR_BUTTON },
        { ...EDIT_TOOLBAR_BUTTON },
        { ...DELETE_TOOLBAR_BUTTON }
    ];

    onButtonClick(buttonClick: ButtonClick): void {}
}

describe('PagedCollectionWithToolbarComponent', () => {
    let component: TestPagedCollectionWithToolbarComponent;
    let componentPagedList: PagedListComponent<Task>;
    let fixture: ComponentFixture<TestPagedCollectionWithToolbarComponent>;
    let page: PagedCollectionWithToolbarElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                ListComponent,
                PagedListComponent,
                PagedListWithRaisedButtonsBarComponent,
                TestPagedCollectionWithToolbarComponent
            ],
            imports: [
                FlexLayoutModule,
                MatCheckboxModule,
                MatPaginatorModule,
                MatSelectModule,
                MatSortModule,
                MatToolbarModule,
                NoopAnimationsModule,
                FontAwesomeModule,
                CollectionModule,
                ToolbarModule
            ]
        });

        fixture = TestBed.createComponent(
            TestPagedCollectionWithToolbarComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();

        componentPagedList = component.pagedListWithToolbar
            .collectionCmp as PagedListComponent<Task>;
        page = new PagedCollectionWithToolbarElement(
            fixture,
            '.marker-paged-list',
            '.marker-list-item',
            '.marker-checkbox-item-select',
            [
                '.marker-button-create',
                '.marker-button-edit',
                '.marker-button-delete'
            ]
        );

        component.data = testData;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    describe('Toolbar Tests', () => {
        it('should call onButtonClick event when button that requires selection clicked', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick');

            // and: a selected row
            page.collection.selectItem(0);

            // when: the button is clicked
            page.toolbar.clickButton('.marker-button-edit');

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({
                click: 'edit',
                row: componentPagedList.collection$.dataSource$.data[0]
            });
        });

        it("should call onButtonClick event for buttons that don't require selection", () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick').and.callThrough();

            // when: the button is clicked
            page.toolbar.clickButton('.marker-button-create');

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'create' });
        });
    });

    it('should return null for paginator if paginator$ undefined', () => {
        expect(component.pagedListWithToolbar.paginator).toBeUndefined();
    });

    it('should return undefined for sort if sort undefined', () => {
        expect(component.pagedListWithToolbar.sort).toBeUndefined();
    });
});
