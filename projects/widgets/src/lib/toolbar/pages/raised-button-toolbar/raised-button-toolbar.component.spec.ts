import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarElement } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';
import { ButtonsComponent } from '../../components/buttons/buttons.component';
import { CREATE_TOOLBAR_BUTTON, EDIT_TOOLBAR_BUTTON, DELETE_TOOLBAR_BUTTON } from '../../shared/toolbar-buttons';

import { RaisedButtonToolbarComponent } from './raised-button-toolbar.component';

describe('RaisedButtonToolbarComponent', () => {
    let component: RaisedButtonToolbarComponent;
    let fixture: ComponentFixture<RaisedButtonToolbarComponent>;
    let page: ToolbarElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                ButtonsComponent,
                RaisedButtonToolbarComponent
            ],
            imports: [
                MockModule(MatToolbarModule),
                MockModule(FontAwesomeModule)
            ]
        });

        fixture = TestBed.createComponent(RaisedButtonToolbarComponent);
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

    it('should default to right align buttons', () => {
        expect(page.query('.marker-align-right')).toBeDefined();
    });

    it('should align buttons to left when buttonAlign set to left', () => {
        // when: buttonAlign set to left
        component.buttonAlign = 'left';
        fixture.detectChanges();

        // expect the buttons to be aligned on left side
        expect(page.query('.marker-align-left')).toBeDefined();
    });
});
