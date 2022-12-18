import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarElement } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import {
    CREATE_TOOLBAR_BUTTON,
    DELETE_TOOLBAR_BUTTON,
    EDIT_TOOLBAR_BUTTON
} from '../../shared/toolbar-buttons';

import { ButtonsComponent } from './buttons.component';

describe('ButtonsComponent', () => {
    let component: ButtonsComponent;
    let fixture: ComponentFixture<ButtonsComponent>;
    let page: ToolbarElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonsComponent],
            imports: [MockModule(FontAwesomeModule)]
        });

        fixture = TestBed.createComponent(ButtonsComponent);
        component = fixture.componentInstance;
        component.buttons = [
            { ...CREATE_TOOLBAR_BUTTON },
            { ...EDIT_TOOLBAR_BUTTON },
            { ...DELETE_TOOLBAR_BUTTON }
        ];
        fixture.detectChanges();

        page = new ToolbarElement(fixture, [
            '.marker-button-create',
            '.marker-button-edit',
            '.marker-button-delete'
        ]);
    });

    it('should emit create event when create button clicked', () => {
        // given: a spy on the buttonClick output event emitter
        const spy = spyOn(component.buttonClick, 'emit');

        // when: the create button is clicked
        page.clickButton('.marker-button-create');

        // then: the buttonClick event emitter should have been called
        expect(spy).toHaveBeenCalledWith({ click: 'create' });
    });
});
