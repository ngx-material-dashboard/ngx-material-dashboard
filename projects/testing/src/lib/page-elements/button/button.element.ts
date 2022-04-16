import { ComponentFixture } from '@angular/core/testing';
import { PageElement } from '../page/page.element';

/**
 * The ButtonElement class defines properties and functions useful for testing
 * components with buttons.
 */
export class ButtonElement extends PageElement {

    /** The HTML button element. */
    private button: HTMLButtonElement;

    /**
     * Creates a new ButtonElement.
     *
     * @param marker The CSS class marker used to find the button. 
     * @param fixture {@link ComponentFixture} where button is rendered.
     */
    constructor(
        fixture: ComponentFixture<any>,
        private marker: string,
        private element?: HTMLElement
    ) {
        super(fixture);

        this.button = this.query<HTMLButtonElement>(this.marker, this.element);
    }

    /**
     * Clicks the button and waits for the fixture to be stable.
     */
    public async click(): Promise<void> {
        this.button.click();
        this.fixture.detectChanges();
        await this.fixture.whenStable();
    }

    /**
     * Returns true if the button is disabled.
     *
     * @returns true if the button is disabled; otherwise false. 
     */
    public isDisabled(): boolean {
        return this.button.disabled;
    }
}
