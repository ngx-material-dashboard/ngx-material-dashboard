import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, TEST_DATA } from '@ngx-material-dashboard/testing';
import { SorterComponent } from '../../../toolbar/pages/sorter/sorter.component';
import { MockModule } from 'ng-mocks';
import { ButtonsComponent } from '../../../toolbar/components/buttons/buttons.component';
import { RaisedButtonToolbarComponent } from '../../../toolbar/pages/raised-button-toolbar/raised-button-toolbar.component';

import { PagedCollectionWithToolbarComponent } from './paged-collection-with-toolbar.component';
import { PagedListWithRaisedButtonsBarComponent } from '@ngx-material-dashboard/widgets';
import { PagedListComponent } from '../../../list/pages/paged-list/paged-list.component';
import { ListComponent } from '../../../list/components/list/list.component';
import { PagedCollectionWithToolbarElement } from '@ngx-material-dashboard/testing/src/lib/page-elements/paged-collection-with-toolbar/paged-collection-with-toolbar.element';
import { ToolbarButton } from '../../../toolbar/interfaces/toolbar-button.interface';
import { Button } from '../../interfaces/button.interface';
import { DELETE_BUTTON, EDIT_BUTTON } from '../../shared/buttons';
import { CREATE_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON } from '../../../toolbar/shared/toolbar-buttons';
import { ButtonClick } from '../../../toolbar/interfaces/button-click.interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonToolbarComponent } from '../../../toolbar/pages/button-toolbar/button-toolbar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CollectionComponent } from '../collection/collection.component';
import { PagedCollectionComponent } from '../paged-collection/paged-collection.component';
import { PagedCollectionWithRaisedButtonToolbarComponent } from '../paged-collection-with-raised-button-toolbar/paged-collection-with-raised-button-toolbar.component';

/** Component to test with. */
@Component({
    template: `
    <ngx-material-dashboard-paged-list-with-raised-buttons-bar
        [toolbarButtons]="toolbarButtons"
        (buttonClick)="onButtonClick($event)"
        #pagedListWithToolbar>
        <ngx-material-dashboard-paged-list
            [collectionButtons]="collectionButtons"
            [dataSource$]="data"
            [fields]="fields"
            class="marker-paged-list"
            collection
            #collection>
            <ng-template #model let-model="model">
                <div fxLayout="row">
                    <span>Dummy Model</span>
                    <span>{{model.id}}</span>
                </div>
            </ng-template>
        </ngx-material-dashboard-paged-list>
    </ngx-material-dashboard-paged-list-with-raised-buttons-bar>
    `
}) class TestPagedCollectionWithToolbarComponent {
    @ViewChild('pagedListWithToolbar') pagedListWithToolbar!: PagedListWithRaisedButtonsBarComponent<DummyObject>;
    data: DummyObject[] = TEST_DATA;
    fields: string[] = ['id'];
    collectionButtons: Button[] = [{...EDIT_BUTTON}, {...DELETE_BUTTON}];
    toolbarButtons: ToolbarButton[] = [{...CREATE_TOOLBAR_BUTTON}, {...EDIT_TOOLBAR_BUTTON}, {...DELETE_TOOLBAR_BUTTON}];

    onButtonClick(buttonClick: ButtonClick): void {}
}

describe('PagedCollectionWithToolbarComponent', () => {
    let component: TestPagedCollectionWithToolbarComponent;
    let componentPagedList: PagedListComponent<DummyObject>;
    let fixture: ComponentFixture<TestPagedCollectionWithToolbarComponent>;
    let page: PagedCollectionWithToolbarElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ButtonsComponent,
                ListComponent,
                PagedCollectionWithToolbarComponent,
                PagedCollectionWithRaisedButtonToolbarComponent,
                PagedListComponent,
                PagedListWithRaisedButtonsBarComponent,
                RaisedButtonToolbarComponent,
                SorterComponent,
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
                FontAwesomeModule
            ]
        });

        fixture = TestBed.createComponent(TestPagedCollectionWithToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        componentPagedList = component.pagedListWithToolbar.collectionCmp as unknown as PagedListComponent<DummyObject>;
        page = new PagedCollectionWithToolbarElement(
            fixture,
            '.marker-paged-list',
            '.marker-list-item',
            '.marker-checkbox-item-select',
            ['.marker-button-create', '.marker-button-edit', '.marker-button-delete']
        );
    });

    describe('Toolbar Tests', () => {

        it('should call onButtonClick event when button that requires selection clicked', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick');

            // and: a selected row
            page.selectItem(0);

            // when: the button is clicked
            page.toolbar.clickButton('.marker-button-edit');

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'edit', row: componentPagedList.collection$.dataSource$.data[0] });
        });

        it('should call onButtonClick event for buttons that don\'t require selection', () => {
            // given: a spy on the buttonClick for the PagedTableWithToolbarComponent
            const spy = spyOn(component, 'onButtonClick').and.callThrough();

            // when: the button is clicked
            page.toolbar.clickButton('.marker-button-create');

            // then: the buttonClick emit method should have been called
            expect(spy).toHaveBeenCalledWith({ click: 'create' });
        });
    });
});
