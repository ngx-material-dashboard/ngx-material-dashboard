/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { ComponentFixture } from '@angular/core/testing';
import { PageElement } from '../page/page.element';

/**
 * The `CheckboxElement` class defines properties and functions useful for
 * testing components with one or more checkboxes.
 *
 * @overviewDetails
 * #### Basic Usage Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {TestBed} from '@angular/core/testing';
 * import {CheckboxElement} from '@ngx-material-dashboard/testing';
 *
 * // define a simple component with a button to test with
 * @Component({
 *     template: `
 *         <div>
 *             <mat-checkbox class="marker-checkbox"
 *                 (change)="onChange();">
 *             </mat-checkbox>
 *         </div>
 *     `
 * }) class ButtonComponent {
 *     onChange(): void {
 *         // do something when checkbox changed...
 *     }
 * }
 *
 * describe('CheckboxElement', () => {
 *
 *     let checkboxClickSpy: jasmine.Spy;
 *     let checkboxElement: CheckboxElement;
 *
 *     beforeEach(() => {
 *         TestBed.configureTestingModule({
 *             declarations: [CheckboxComponent]
 *         });
 *
 *         const fixture = TestBed.createComponent(CheckboxComponent);
 *         checkboxElement = new CheckboxElement(fixture, '.marker-checkbox');
 *         checkboxClickSpy = spyOn(checkboxElement.fixture.componentInstance, 'onChange');
 *     });
 *
 *     it('should click the Checkbox when click method called', async() => {
 *         // when: the CheckboxElement click Checkbox is called
 *         await checkboxElement.click();
 *
 *         // then: the CheckboxClickSpy should have been called
 *         expect(checkboxClickSpy).toHaveBeenCalled();
 *
 *         // and: the checkbox should be checked
 *         expect(checkboxElement.checked).toBeTrue();
 *     });
 *
 *     it('should not have checked input by default', () => {
 *         // expect: the checkbox should not be checked
 *         expect(checkboxElement.checked).toBeFalse();
 *     });
 * });
 * ```
 *
 * #### Features
 *
 * `CheckboxElements` can be clicked, and you can check for whether checkbox is
 * checked or disabled.
 *
 * ##### Click
 *
 * Once you have defined a `CheckboxElement` simply call the `click` function
 * to simulate a user clicking the checkbox in the UI. This function is
 * asynchronous so you should use `async/await` in your test code.
 *
 * ```typescript
 * it('should do something when checkbox is clicked', async() => {
 *     // when: the checkbox is clicked
 *     await checkboxElement.click();
 *
 *     // then: something should happen
 *     // do your tests for whatever you expect to happen when button clicked
 * });
 * ```
 *
 * ##### Checked
 *
 * The `CheckboxElement` includes a `checked` getter that returns true if the
 * input associated with the checkbox is checked, otherwise it returns false.
 *
 * ##### Disabled
 *
 * Additionally the `CheckboxElement` includes a `disabled` getter that returns
 * true if the checkbox is disabled.
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
     * Returns true if the checkbox is disabled, otherwise false.
     */
    public get disabled(): boolean {
        return this.input.disabled;
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
