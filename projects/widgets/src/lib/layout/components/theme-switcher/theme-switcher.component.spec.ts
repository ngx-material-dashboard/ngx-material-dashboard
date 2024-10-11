import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonElement } from '@ngx-material-dashboard/testing';
import { MockModule } from 'ng-mocks';

import { ThemeSwitcherComponent } from './theme-switcher.component';

describe('ThemeSwitcherComponent', () => {
    let component: ThemeSwitcherComponent;
    let fixture: ComponentFixture<ThemeSwitcherComponent>;
    let page: ButtonElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ThemeSwitcherComponent],
            imports: [
                MockModule(MatButtonModule),
                MockModule(MatTooltipModule),
                MockModule(FontAwesomeModule)
            ]
        });
    });

    describe('localStorage theme defined', () => {
        beforeEach(() => {
            spyOn(window.localStorage, 'getItem').and.returnValue('dark');
            fixture = TestBed.createComponent(ThemeSwitcherComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            page = new ButtonElement(fixture, '.marker-theme-button');
        });

        it('should call setTheme when button clicked', async () => {
            // given: a spy on the setTheme function
            const spy = spyOn(component, 'setTheme');

            // when: the button is clicked
            await page.click();

            // then: the setTheme function should have been called
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('localStorage theme undefined', () => {
        beforeEach(() => {
            spyOn(window.localStorage, 'getItem').and.returnValue(null);
            fixture = TestBed.createComponent(ThemeSwitcherComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            page = new ButtonElement(fixture, '.marker-theme-button');
        });

        it('should call setTheme when button clicked', async () => {
            // given: a spy on the setTheme function
            const spy = spyOn(component, 'setTheme');

            // when: the button is clicked
            await page.click();

            // then: the setTheme function should have been called
            expect(spy).toHaveBeenCalled();
        });
    });
});
