import { ComponentFixture } from '@angular/core/testing';

/**
 * The Page class is meant to be a base class that provides helper functions
 * for unit testing components. This class should be extended in the spec
 * file where the unit tests are. The following is a simple example for how to
 * use this inside of the app.component.spec.ts spec file.
 *
 * ```typescript
 * AppPage extends Page<AppComponent> {
 *
 *     constructor(fixture: ComponentFixture<AppComponent>) {}
 *
 *     get header(): HTMLElement {
 *         return this.query<HTMLElement>('ngx-material-dashboard-header');
 *     }
 * }
 * ```
 */
export class Page<Component> {

    constructor(protected fixture: ComponentFixture<Component>) {}

    /**
     * Clicks the given checkbox input to select or de-select it, i.e. mark it
     * checked or unchecked (if it is already checked).
     *
     * @param input The checkbox to click.
     */
    clickCheckbox(input: HTMLInputElement): void {
        input.click();
        this.fixture.detectChanges();
    }

    /**
     * Returns the HTMLInputElement in the given checkbox if it exists,
     * otherwise an error is thrown. The given element should be a checkbox.
     *
     * @param checkbox The checkbox to get the HTMLInputElement from.
     * @returns The HTMLInputElement if it exists.
     */
    getCheckboxInput(checkbox: HTMLElement): HTMLInputElement {
        const input: HTMLInputElement | null = checkbox.querySelector('input');
        if (input == null) {
            // throw an error if the input is not defined
            throw new Error('Expected HTMLInputElement in checkbox');
        }

        return input;
    }

    /**
     * Sets the value for the given HTMLInputElement and triggers the change
     * detection cycle so the component sees the new value.
     *
     * @param input The input whose value should be set.
     * @param value The value to set for the input.
     */
    setInputValue(input: HTMLInputElement, value: string, eventType = 'input'): void {
        input.value = value;
        input.dispatchEvent(new Event(eventType));
        this.fixture.detectChanges();
    }

    //// query helpers ////

    /**
     * Finds and returns the first element within the component that matches
     * the specified selector.
     *
     * @param selector The selector used to find the desired element.
     * @returns The first element that matches given selector or null if no matches found.
     */
    query<T>(selector: string): T {
        return this.fixture.nativeElement.querySelector(selector);
    }

    /**
     * Finds and returns all elements within the component that match the
     * specified selector.
     *
     * @param selector The selector used to find the desired elements.
     * @returns All elements that match the given selector (empty list if no matches found).
     */
    queryAll<T>(selector: string): T[] {
        return this.fixture.nativeElement.querySelectorAll(selector);
    }
}
