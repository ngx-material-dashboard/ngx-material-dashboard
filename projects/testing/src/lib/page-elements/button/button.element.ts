import { ComponentFixture } from '@angular/core/testing';
import { PageElement } from '../page/page.element';

/**
 * The `ButtonElement` class defines properties and functions useful for testing
 * components with buttons.
 * 
 * @overviewDetails
 * ## Basic Usage Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {TestBed} from '@angular/core/testing';
 * import {ButtonElement} from '@ngx-material-dashboard/testing';
 * 
 * // define a simple component with a button to test with
 * @Component({
 *     template: `
 *         <div>
 *             <button class="marker-button" (click)="onClick()"></button>
 *         </div>
 *     `
 * }) class ButtonComponent {
 *     onClick(): void {
 *         // do something when button is clicked...
 *     }
 * }
 * 
 * describe('ButtonElement', () => {
 *
 *     let buttonClickSpy: jasmine.Spy;
 *     let buttonElement: ButtonElement;
 *
 *     describe('Enabled Button', () => {
 *         beforeEach(() => {
 *             TestBed.configureTestingModule({
 *                 declarations: [ButtonComponent]
 *             });
 * 
 *             const fixture = TestBed.createComponent(ButtonComponent);
 *             buttonElement = new ButtonElement(fixture, '.marker-button');
 *             buttonClickSpy = spyOn(buttonElement.fixture.componentInstance, 'onClick');
 *         });
 *
 *         it('should return false for isDisabled', () => {
 *             expect(buttonElement.isDisabled()).toBeFalse();
 *         });
 *
 *         it('should click the button when click method called', async() => {
 *             // when: the buttonElement click button is called
 *             await buttonElement.click();
 *   
 *             // then: the buttonClickSpy should have been called
 *             expect(buttonClickSpy).toHaveBeenCalled();
 *         });
 *     });
 * });
 * ```
 * 
 * ## Features
 * 
 * `ButtonElements` can be clicked and ou can check if the button is disabled.
 * 
 * ### Click
 * 
 * Once you have defined a `ButtonElement` simply call the `click` function to
 * simulate a user clicking the button in the UI. This function is asynchronous
 * so you should use `async/await` in your test code.
 * 
 * ```typescript
 * it('should do something when button is clicked', async() => {
 *     // given: a button
 *     const buttonElement = init(ButtonComponent, 'div');
 *     
 *     // when: the button is clicked
 *     await buttonElement.click();
 * 
 *     // then: something should happen
 *     // do your tests for whatever you expect to happen when button clicked
 * });
 * ```
 * 
 * ### Is Disabled
 * 
 * The `isDisabled` function is just a wrapper around the `disabled` property
 * defined for `HTMLButtonElement` since the button element is private and
 * there is no way for you to access this in your tests. I suppose I could
 * make the `HTMLButtonElement` public, but I think that defeats the purpose
 * of what I am trying to go for here where you work with `PageElements` and
 * `PageObjects`. TODO make this disabled getter so it's similar to
 * HTMLButtonElement
 */
export class ButtonElement extends PageElement {

    /** The HTML button element. */
    button: HTMLButtonElement;

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
