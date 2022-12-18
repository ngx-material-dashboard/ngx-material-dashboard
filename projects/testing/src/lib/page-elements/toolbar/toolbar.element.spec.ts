import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarElement } from './toolbar.element';

@Component({
    template: `
        <mat-toolbar>
            <button
                class="marker-action-enabled"
                (click)="emitButtonClick()"
                mat-button
            ></button>
            <button
                class="marker-action-disabled"
                (click)="emitButtonClick()"
                disabled="true"
                mat-button
            ></button>
        </mat-toolbar>
    `
})
class ToolbarComponent {
    emitButtonClick(): void {}
}

describe('ToolbarElement', () => {
    let buttonClickSpy: jasmine.Spy;
    let toolbarElement: ToolbarElement;

    describe('Defined Button Selectors', () => {
        beforeEach(() => {
            toolbarElement = init([
                '.marker-action-enabled',
                '.marker-action-disabled'
            ]);
            buttonClickSpy = spyOn(
                toolbarElement.fixture.componentInstance,
                'emitButtonClick'
            );
        });

        describe('Enabled Button', () => {
            it('should return false for isButtonDisabled', () => {
                expect(
                    toolbarElement.isButtonDisabled('.marker-action-enabled')
                ).toBeFalse();
            });

            it('should emitButtonClick when button clicked', () => {
                // when: the enabled button is clicked
                toolbarElement.clickButton('.marker-action-enabled');

                // expect: the emitButtonClick should have been called
                expect(buttonClickSpy).toHaveBeenCalled();
            });
        });

        describe('Disabled Button', () => {
            it('should return true for isButtonDisabled', () => {
                expect(
                    toolbarElement.isButtonDisabled('.marker-action-disabled')
                ).toBeTrue();
            });

            it('should not emitButtonClick when button clicked', () => {
                // when: the disabled button is clicked
                toolbarElement.clickButton('.marker-action-disabled');

                // expect: the emitButtonClick should not have been called
                expect(buttonClickSpy).not.toHaveBeenCalled();
            });
        });
    });

    describe('Without Button Selectors', () => {
        beforeEach(() => {
            toolbarElement = init(null);
        });

        it('should create element', () => {
            expect(toolbarElement).toBeDefined();
        });
    });
});

function init(buttonSelectors: string[] | null): ToolbarElement {
    TestBed.configureTestingModule({
        declarations: [ToolbarComponent],
        imports: [MatButtonModule, MatToolbarModule]
    });

    const fixture = TestBed.createComponent(ToolbarComponent);
    if (buttonSelectors) {
        return new ToolbarElement(fixture, buttonSelectors);
    } else {
        return new ToolbarElement(fixture);
    }
}
