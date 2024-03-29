import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    Task,
    IconButtonsWithPaginatorBarElement
} from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { IconButtonsComponent } from '../../components/icon-buttons/icon-buttons.component';
import {
    CREATE_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON
} from '../../shared/toolbar-buttons';
import { SorterComponent } from '../sorter/sorter.component';

import { IconButtonsWithPaginatorComponent } from './icon-buttons-with-paginator.component';

describe('IconButtonsWithPaginatorComponent', () => {
    let component: IconButtonsWithPaginatorComponent<Task>;
    let fixture: ComponentFixture<IconButtonsWithPaginatorComponent<any>>;
    let page: IconButtonsWithPaginatorBarElement;

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
            ],
            teardown: { destroyAfterEach: false }
        });

        fixture = TestBed.createComponent(IconButtonsWithPaginatorComponent);
        component = fixture.componentInstance;
        component.buttons = [
            { ...CREATE_TOOLBAR_BUTTON },
            { ...EDIT_TOOLBAR_BUTTON },
            { ...DELETE_TOOLBAR_BUTTON }
        ];
        fixture.detectChanges();

        page = new IconButtonsWithPaginatorBarElement(fixture, [
            '.marker-button-create',
            '.marker-button-edit',
            '.marker-button-delete'
        ]);
    });

    it('should render select all checkbox by default', () => {
        expect(page.query('.marker-checkbox-select-all')).toBeDefined();
    });

    it('should render sorter by default', () => {
        expect(page.query('ngx-mat-sorter')).toBeDefined();
    });

    it('should emit master toggle value when select all checkbox checked', async () => {
        const spy = spyOn(component.masterToggle, 'emit');

        await page.selectAllCheckbox?.click();

        expect(spy).toHaveBeenCalledWith(true);
    });

    it('should render "1 – 5 of 25" when pageSize is 5', () => {
        component.length = 25;
        component.pageSize = 5;
        fixture.detectChanges();

        expect(page.paginator.pagingatorRange.innerHTML.trim()).toEqual(
            '1 – 5 of 25'
        );
    });

    it('should render "1 of 25" when pageSize is 1', () => {
        component.length = 25;
        component.pageSize = 1;
        fixture.detectChanges();

        expect(page.paginator.pagingatorRange.innerHTML.trim()).toEqual(
            '1 of 25'
        );
    });

    it('should only render number of items left when length < end', () => {
        component.length = 20;
        component.pageSize = 25;
        fixture.detectChanges();

        // end value in range should not exceed total length
        expect(page.paginator.pagingatorRange.innerHTML.trim()).toEqual(
            '1 – 20 of 20'
        );
    });

    it('should render "Page 1 of 25" when pageSize is 1 and rangeLabelPrefix is "Page"', () => {
        component.length = 25;
        component.pageSize = 1;
        component.rangeLabelPrefix = 'Page';
        fixture.detectChanges();

        expect(page.paginator.pagingatorRange.innerHTML.trim()).toEqual(
            'Page 1 of 25'
        );
    });
});
