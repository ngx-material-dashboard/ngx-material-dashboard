import { ComponentFixture } from '@angular/core/testing';
import { ButtonElement } from './button/button.element';
import { PageElement } from './page.element';

/**
 * The ToolbarElement class represents a material toolbar.
 */
export class ToolbarElement extends PageElement {

    /** The list of buttons rendered in toolbar. */
    private buttonElements: ButtonElement[] = [];
    /** A map of selectors to buttons. */
    private buttonElementsMap: { [selector: string]: ButtonElement } = {};

    /**
     * Creates a new ToolbarElement.
     *
     * @param fixture {@link ComponentFixture} where toolbar is rendered.
     * @param buttonSelectors Optional list of CSS selectors for all buttons on toolbar. 
     */
    constructor(
        fixture: ComponentFixture<any>,
        buttonSelectors: string[] = []
    ) {
        super(fixture);

        // set buttonElements and buttonElementsMap based on given buttonSelectors
        buttonSelectors.forEach((selector: string) => {
            const button: ButtonElement = new ButtonElement(fixture, selector);
            this.buttonElements.push(button);
            this.buttonElementsMap[selector] = button;
        });
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
