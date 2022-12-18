import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MockModule } from 'ng-mocks';
import { ToolbarHeaderElement } from './toolbar-header.element';

@Component({
    template: `
        <mat-toolbar>
            <button class="marker-bars-button">
                <span>Bars</span>
            </button>
            <button class="mat-button marker-home-button">
                <span class="marker-header-logo">My App</span>
            </button>
        </mat-toolbar>
    `
})
class ToolbarComponent {}

describe('ToolbarElement', () => {
    let toolbarElement: ToolbarHeaderElement;

    describe('Without buttonSelectors', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [ToolbarComponent],
                imports: [MockModule(MatToolbarModule)]
            });

            const fixture = TestBed.createComponent(ToolbarComponent);
            toolbarElement = new ToolbarHeaderElement(fixture);
        });

        it('should return "My App" for logo', () => {
            expect(toolbarElement.logo).toEqual('My App');
        });

        it('should not initialize filterDropDown property', () => {
            expect(toolbarElement.filterDropDown).toBeUndefined();
        });
    });

    describe('With buttonSelectors', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [ToolbarComponent],
                imports: [MockModule(MatToolbarModule)]
            });

            const fixture = TestBed.createComponent(ToolbarComponent);
            toolbarElement = new ToolbarHeaderElement(fixture, [
                '.marker-bars-button'
            ]);
        });

        it('should initialize filterDropDown property', () => {
            expect(toolbarElement.filterDropDown).toBeDefined();
        });
    });
});
