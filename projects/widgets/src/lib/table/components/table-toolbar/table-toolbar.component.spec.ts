import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockModule } from 'ng-mocks';

import { Page } from '../../../../../test/helpers/page.helper';
import { CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON } from '../../../toolbar/shared/toolbar-buttons';
import { TableToolbarComponent } from './table-toolbar.component';

describe('TableToolbarComponent', () => {
    let component: TableToolbarComponent;
    let fixture: ComponentFixture<TableToolbarComponent>;
    let page: Page<TableToolbarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ TableToolbarComponent ],
            imports: [
                NoopAnimationsModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
                MatToolbarModule,
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableToolbarComponent);
        component = fixture.componentInstance;
        component.buttons = [CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON];
        fixture.detectChanges();
        page = new Page(fixture);
    });

    // it('should clear filter input and emit empty filter value when "X" clicked in filter', () => {
    //     // given: the clear input button
    //     const clear: HTMLButtonElement = page.query('.marker-button-clear-filter');

    //     // and: a spy on the component's filter event
    //     const spy = spyOn(component.filter, 'emit');

    //     // and: a value in the input
    //     const input: HTMLInputElement = page.query('.marker-input-table-filter');
    //     page.setInputValue(input, 'some filter');
    //     expect(input.value).toEqual('some filter');

    //     // when: the user clicks the clear button
    //     clear.click();

    //     // then: the input value should be blank
    //     expect(input.value).toEqual('');

    //     // and: the filter event should be emitted with blank value
    //     expect(spy).toHaveBeenCalledWith('');
    // });

    // it('should emit filter value on keyup event for filter', async () => {
    //     // given: the filter input
    //     const input: HTMLInputElement = page.query('.marker-input-table-filter');

    //     // and: a spy on the component's filter event
    //     const spy = spyOn(component.filter, 'emit');

    //     // when: the user enters a value into the input
    //     page.setInputValue(input, 'some filter', 'keyup');
    //     await fixture.whenStable();

    //     // then: the filter event should be emitted with the entered value
    //     expect(spy).toHaveBeenCalledWith('some filter');
    // });

    // it('should emit buttonClick event when user clicks button in toolbar', () => {
    //     // given: the add button
    //     const button: HTMLButtonElement = page.query('.marker-action-create');

    //     // and: a spy on the component's buttonClick event
    //     const spy = spyOn(component.buttonClick, 'emit');

    //     // when: the user clicks the button
    //     button.click();

    //     // then: the buttonClick event should be emitted
    //     expect(spy).toHaveBeenCalledWith({ click: 'create' });
    // });
});
