import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DummyObject, ToolbarElement } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { IconButtonsComponent } from '../../components/icon-buttons/icon-buttons.component';
import { CREATE_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON } from '../../shared/toolbar-buttons';
import { SorterComponent } from '../sorter/sorter.component';

import { IconButtonsWithPaginatorComponent } from './icon-buttons-with-paginator.component';

describe('IconButtonsWithPaginatorComponent', () => {
    let component: IconButtonsWithPaginatorComponent<DummyObject>;
    let fixture: ComponentFixture<IconButtonsWithPaginatorComponent<DummyObject>>;
    let page: ToolbarElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                IconButtonsComponent,
                IconButtonsWithPaginatorComponent,
                SorterComponent
            ],
            imports: [
                MatCheckboxModule,
                MatPaginatorModule,
                MatSelectModule,
                MatTooltipModule,
                NoopAnimationsModule,
                MockModule(FontAwesomeModule)
            ]
        });

        fixture = TestBed.createComponent(IconButtonsWithPaginatorComponent);
        component = fixture.componentInstance;
        component.buttons = [{...CREATE_TOOLBAR_BUTTON}, {...EDIT_TOOLBAR_BUTTON}, {...DELETE_TOOLBAR_BUTTON}];
        fixture.detectChanges();

        page = new ToolbarElement(fixture, ['.marker-button-create', '.marker-button-edit', '.marker-button-delete']);
    });

    it('should render select all checkbox by default', () => {
        expect(page.query('.marker-checkbox-select-all')).toBeDefined();
    });

    it('should render sorter by default', () => {
        expect(page.query('ngx-material-dashboard-sorter')).toBeDefined();
    });
});
