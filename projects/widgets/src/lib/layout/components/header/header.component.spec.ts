import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockComponent, MockModule } from 'ng-mocks';
import { HeaderUserLoginComponent } from '../header-user-login/header-user-login.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
                MockComponent(HeaderUserLoginComponent)
            ],
            imports: [
                RouterTestingModule,
                MockModule(FlexLayoutModule),
                MockModule(MatToolbarModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render "My App" in the toolbar by default', () => {
        // given: the native element at the root of the component
        const compiled = fixture.nativeElement;

        // expect: the text "My App" should be rendered
        expect(compiled.querySelector('.marker-home-button').textContent).toContain('My App');
    });

    it('should emit true when bars button is clicked in top bar', () => {
        // setup: a spy on the toggleSidenav EventEmitter
        spyOn(component.toggleSidenav, 'emit');

        // and: the native element at the root of the component
        const compiled = fixture.nativeElement;

        // and: the bars button
        const button = compiled.querySelector('.marker-bars-button');

        // when: the button is clicked
        button.click();
        fixture.detectChanges();

        // expect: the toggleSidenav EventEmitter should have been called with true
        expect(component.toggleSidenav.emit).toHaveBeenCalledWith(true);
    });
});
