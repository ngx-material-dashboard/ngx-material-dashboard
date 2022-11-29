import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarElement } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { CREATE_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON } from '../../shared/toolbar-buttons';

import { IconButtonsComponent } from './icon-buttons.component';

describe('IconButtonsComponent', () => {
    let component: IconButtonsComponent;
    let fixture: ComponentFixture<IconButtonsComponent>;
    let page: ToolbarElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ IconButtonsComponent ],
            imports: [
                MockModule(MatTooltipModule),
                MockModule(FontAwesomeModule)
            ]
        });

        fixture = TestBed.createComponent(IconButtonsComponent);
        component = fixture.componentInstance;
        component.buttons = [{...CREATE_TOOLBAR_BUTTON}, {...EDIT_TOOLBAR_BUTTON}, {...DELETE_TOOLBAR_BUTTON}];
        fixture.detectChanges();

        page = new ToolbarElement(fixture, ['.marker-button-create', '.marker-button-edit', '.marker-button-delete']);
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
