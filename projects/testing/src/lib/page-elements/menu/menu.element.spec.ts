import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuElement } from './menu.element';

@Component({
    template: `
    <button mat-button
        class="mat-button marker-menu-trigger"
        [matMenuTriggerFor]="menu">
        <span>I'm a dropdown</span>
    </button>
    <mat-menu xPosition="before" yPosition="below" #menu="matMenu">
        <div matMenuContent #menuContent>
            <button mat-menu-item class="marker-button-click-me" (click)="onClick()">Click Me</button>
        </div>
    </mat-menu>`
}) class Menu {
    onClick(): void {}
}

describe('MenuElement', () => {

    let fixture: ComponentFixture<Menu>;
    let component: Menu;
    let menu: MenuElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ Menu ],
            imports: [
                MatButtonModule,
                MatMenuModule,
                NoopAnimationsModule
            ]
        });

        fixture = TestBed.createComponent(Menu);
        component = fixture.componentInstance;
        fixture.detectChanges();

        menu = new MenuElement(fixture, ['.marker-button-click-me']);
    });

    beforeEach(() => {
        menu.initButtons();
    });

    it('should click the button in the menu when clickButton method called', () => {
        // given: spy on the onClick method
        const spy = spyOn(component, 'onClick');

        // when: the clickButton method is called
        menu.clickButton('.marker-button-click-me');
        fixture.detectChanges();

        // then: the spy should have been called
        expect(spy).toHaveBeenCalled();
    });
});
