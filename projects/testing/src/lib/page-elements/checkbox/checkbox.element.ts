import { ComponentFixture } from "@angular/core/testing";
import { PageElement } from "../page/page.element";

/**
 * The CheckboxElement class defines properties and functions useful for
 * testing components with one or more checkboxes.
 */
export class CheckboxElement extends PageElement {

    /** The checkbox HTML input element. */
    private input: HTMLInputElement;

    /**
     * Creates a new CheckboxElement.
     *
     * @param fixture Fixture for component under test.
     * @param parentElement The parent element that contains the checkbox.
     */
    constructor(fixture: ComponentFixture<any>, parentElement: HTMLElement) {
        super(fixture);

        // get the checkbox HTML input element from the given parent 
        this.input = this.query<HTMLInputElement>('input', parentElement);
    }

    /**
     * Returns true if the checkbox is checked, otherwise false.
     */
    public get checked(): boolean {
        return this.input.checked;
    }

    /**
     * Clicks the checkbox and waits for the fixture to be stable.
     */
    public async click() {
        this.input.click();
        this.fixture.detectChanges();
        await this.fixture.whenStable();
    }
}
