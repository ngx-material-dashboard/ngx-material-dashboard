import { ComponentFixture } from '@angular/core/testing';
import { ButtonElement } from '../button/button.element';
import { PageElement } from '../page/page.element';

/**
 * The ToolbarElement class represents a material toolbar. This element assumes
 * there are only buttons included, and is mainly a wrapper around the
 * `ButtonElement` with easy access to the buttons (and therefore
 * `ButtonElements`) defined in the toolbar.
 *
 * @usageNotes
 * ### Basic Usage Example
 * ```typescript
 * import { Component } from '@angular/core';
 * import { TestBed } from '@angular/core/testing';
 * import { MatButtonModule } from '@angular/material/button';
 * import { MatToolbarModule } from '@angular/material/toolbar';
 * import { ToolbarElement } from './toolbar.element';
 *
 * @Component({
 *     template: `
 *         <mat-toolbar>
 *             <button class="marker-action-enabled"
 *                 (click)="emitButtonClick()"
 *                 mat-button>
 *             </button>
 *             <button class="marker-action-disabled"
 *                 (click)="emitButtonClick()"
 *                 disabled="true"
 *                 mat-button>
 *             </button>
 *         </mat-toolbar>
 *     `
 * }) class ToolbarComponent {
 *     emitButtonClick(): void {}
 * }
 *
 * describe('ToolbarElement', () => {
 *     let buttonClickSpy: jasmine.Spy;
 *     let toolbarElement: ToolbarElement;
 *
 *     beforeEach(() => {
 *         TestBed.configureTestingModule({
 *             declarations: [ToolbarComponent],
 *             imports: [
 *                 MatButtonModule,
 *                 MatToolbarModule
 *             ]
 *         });
 *
 *         const fixture = TestBed.createComponent(ToolbarComponent);
 *         toolbarElement = new ToolbarElement(fixture, ['.marker-action-enabled', '.marker-action-disabled']);
 *         buttonClickSpy = spyOn(toolbarElement.fixture.componentInstance, 'emitButtonClick');
 *     });
 *
 *     describe('Enabled Button', () => {
 *
 *         it('should return false for isButtonDisabled', () => {
 *             expect(toolbarElement.isButtonDisabled('.marker-action-enabled')).toBeFalse();
 *         });
 *
 *         it('should emitButtonClick when button clicked', () => {
 *             // when: the enabled button is clicked
 *             toolbarElement.clickButton('.marker-action-enabled');
 *
 *             // expect: the emitButtonClick should have been called
 *             expect(buttonClickSpy).toHaveBeenCalled();
 *         });
 *     });
 *
 *     describe('Disabled Button', () => {
 *
 *         it('should return true for isButtonDisabled', () => {
 *             expect(toolbarElement.isButtonDisabled('.marker-action-disabled')).toBeTrue();
 *         });
 *
 *         it('should not emitButtonClick when button clicked', () => {
 *             // when: the disabled button is clicked
 *             toolbarElement.clickButton('.marker-action-disabled');
 *
 *             // expect: the emitButtonClick should not have been called
 *             expect(buttonClickSpy).not.toHaveBeenCalled();
 *         });
 *     });
 * });
 * ```
 */
export class ToolbarElement extends PageElement {
    /** The list of buttons rendered in toolbar. */
    private buttonElements: ButtonElement[] = [];
    /** A map of selectors to buttons. */
    private buttonElementsMap: { [selector: string]: ButtonElement } = {};
    protected toolbar: HTMLElement;

    /**
     * Creates a new ToolbarElement.
     *
     * @param fixture {@link ComponentFixture} where toolbar is rendered.
     * @param buttonSelectors Optional list of CSS selectors for all buttons on toolbar.
     */
    constructor(
        fixture: ComponentFixture<any>,
        buttonSelectors: string[] = [],
        toolbarSelector: string = 'mat-toolbar'
    ) {
        super(fixture);

        // set buttonElements and buttonElementsMap based on given buttonSelectors
        buttonSelectors.forEach((selector: string) => {
            const button: ButtonElement = new ButtonElement(fixture, selector);
            this.buttonElements.push(button);
            this.buttonElementsMap[selector] = button;
        });

        this.toolbar = this.query<HTMLElement>(toolbarSelector);
    }

    /**
     * Clicks the button in the toolbar with the given selector and waits for
     * the fixture to be stable.
     *
     * @param selector The CSS selector for the button to click.
     */
    public async clickButton(selector: string): Promise<void> {
        await this.buttonElementsMap[selector].click();
    }

    /**
     * Returns true if the button with the given selector is disabled.
     *
     * @param selector The CSS selector for the button to test.
     * @returns true if the button is disabled; otherwise false.
     */
    public isButtonDisabled(selector: string): boolean {
        return this.buttonElementsMap[selector].isDisabled();
    }
}
