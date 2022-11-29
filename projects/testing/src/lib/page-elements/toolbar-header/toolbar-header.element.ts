import { ComponentFixture } from '@angular/core/testing';
import { MenuElement } from '../menu/menu.element';
import { ToolbarElement } from '../toolbar/toolbar.element';

/**
 * The `ToolbarHeaderElement` class defines properties and functions for testing
 * components with a header toolbar (i.e. the main toolbar at the top of the
 * page of an application). This class extends the basic `ToolbarElement` so you
 * have access to functions defined there in addition to the `logo` getter
 * that returns the text for the logo that should be in the header.
 * 
 * See [ToolbarElement](/testing/elements/toolbar) for more details.
 * 
 * TODO probably add property and method to click bars button to toggle sidenav
 */
export class ToolbarHeaderElement extends ToolbarElement {

    /** The logo in the toolbar. */
    private logoElement: HTMLElement;
    filterDropDown?: MenuElement;

    /**
     * Creates a new ToolbarElement.
     *
     * @param fixture {@link ComponentFixture} where toolbar is rendered.
     */
    constructor(
        fixture: ComponentFixture<any>,
        buttonSelectors?: string[]
    ) {
        super(fixture, ['.marker-bars-button', '.marker-home-button']);

        this.logoElement = this.query<HTMLElement>('.marker-header-logo');

        if (buttonSelectors) {
            this.filterDropDown = new MenuElement(fixture, buttonSelectors);
        }
    }

    /**
     * Returns the logo text for the header.
     * 
     * @returns The logo text for the header.
     */
    public get logo(): string {
        return this.logoElement.innerText;
    }
}