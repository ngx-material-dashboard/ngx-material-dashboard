import {
    ComponentFixture,
    discardPeriodicTasks,
    fakeAsync,
    flush,
    flushMicrotasks,
    TestBed,
    tick
} from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuElement } from '@ngx-material-dashboard/testing';

import { HeaderUserMenuComponent } from './header-user-menu.component';

describe('HeaderUserMenuComponent', () => {
    let component: HeaderUserMenuComponent;
    let fixture: ComponentFixture<HeaderUserMenuComponent>;
    let filterDropDown: MenuElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderUserMenuComponent],
            imports: [
                MatButtonModule,
                MatMenuModule,
                FontAwesomeModule,
                NoopAnimationsModule
            ],
            teardown: { destroyAfterEach: false }
        });

        fixture = TestBed.createComponent(HeaderUserMenuComponent);
        component = fixture.componentInstance;
        component.username = 'Bugs';
        fixture.detectChanges();

        filterDropDown = new MenuElement(fixture, ['.marker-button-logout']);
    });

    beforeEach(() => {
        filterDropDown.initButtons();
    });

    it('should call logout method when logout button clicked', () => {
        const spy = spyOn(component.logoutClick, 'emit');
        filterDropDown.clickButton('.marker-button-logout');
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    });
});
