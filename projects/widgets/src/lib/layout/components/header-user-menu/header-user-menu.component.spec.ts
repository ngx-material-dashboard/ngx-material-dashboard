import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockModule } from 'ng-mocks';

import { HeaderUserMenuComponent } from './header-user-menu.component';

describe('HeaderUserMenuComponent', () => {
    // let authService: AuthService;
    let compiled: any;
    let component: HeaderUserMenuComponent;
    let fixture: ComponentFixture<HeaderUserMenuComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ HeaderUserMenuComponent ],
            imports: [
                HttpClientTestingModule,
                MockModule(MatMenuModule),
                MockModule(FontAwesomeModule),
                // MockModule(AuthConfigModule)
            ]
        });

        // authService = TestBed.inject(AuthService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderUserMenuComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should call logout method in authService when logout button clicked', () => {
    //     // given: the logout button
    //     const logoutButton = compiled.querySelector('.marker-logout-button');

    //     // and: a spy on the authService
    //     // const spy = spyOn(authService, 'logout');

    //     // when: the logout button is clicked
    //     logoutButton.click();
    //     fixture.detectChanges();

    //     // then: the logout function should have been called
    //     expect(spy).toHaveBeenCalled();
    // });
});
