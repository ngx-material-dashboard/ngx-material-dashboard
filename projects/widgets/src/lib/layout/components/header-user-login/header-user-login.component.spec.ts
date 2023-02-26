import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Page } from '../../../../../test/helpers/page.helper';
import { MockComponent } from 'ng-mocks';
import { HeaderUserMenuComponent } from '../header-user-menu/header-user-menu.component';

import { HeaderUserLoginComponent } from './header-user-login.component';

describe('HeaderUserLoginComponent', () => {
    let compiled: any;
    let component: HeaderUserLoginComponent;
    let fixture: ComponentFixture<HeaderUserLoginComponent>;
    let page: Page<HeaderUserLoginComponent>;
    // let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderUserLoginComponent,
                MockComponent(HeaderUserMenuComponent)
            ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
                // MockModule(AuthConfigModule)
            ]
            // providers: [AuthService]
        });

        // service = TestBed.inject(AuthService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderUserLoginComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
        fixture.detectChanges();

        page = new Page<HeaderUserLoginComponent>(fixture);
    });

    describe('User logged in', () => {
        beforeEach(() => {
            // the only thing that differentiates a logged in user with one that
            // is not is whether username is defined (at least for this component)
            // so just set username (could also mock result for authService since
            // component subscribes to currentUser observable, but this is easier)
            component.username = 'Administrator';
            fixture.detectChanges();
        });

        it('should render user header menu component by default', () => {
            expect(
                page.query('ngx-mat-user-header-menu')
            ).toBeDefined();
        });

        it('should not render login button by default', () => {
            expect(page.query('.marker-login-button')).toBeNull();
        });
    });

    describe('User not logged in', () => {
        it('should not render user header menu component by default', () => {
            expect(
                page.query('ngx-mat-user-header-menu')
            ).toBeNull();
        });

        it('should render login button by default', () => {
            expect(page.query('.marker-login-button')).toBeDefined();
        });

        it('should call login method when login button clicked', () => {
            // given: a spy on the login function
            const spy = spyOn(component, 'login').and.callThrough();

            // when: the login button clicked
            page.query<HTMLButtonElement>('.marker-login-button').click();

            // then: the login function should have been called
            expect(spy).toHaveBeenCalled();
        });

        // it('should call the authService.login function when login button clicked', () => {
        //     // given: a spy on the authService login function
        //     const spy = spyOn(service, 'login');

        //     // and: the login button
        //     const button: HTMLElement = page.query('.marker-login-button');

        //     // when: the login button is clicked
        //     button.click();

        //     // then: the authService login function should have been called
        //     expect(spy).toHaveBeenCalled();
        // });
    });
});
