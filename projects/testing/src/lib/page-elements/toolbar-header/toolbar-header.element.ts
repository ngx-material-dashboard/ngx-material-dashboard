import { ComponentFixture } from '@angular/core/testing';
import { ToolbarElement } from '../toolbar/toolbar.element';

/**
 * The ToolbarHeaderElement class defines properties and functions for testing
 * components with a header toolbar (i.e. the main toolbar at the top of the
 * page of an application).
 */
export class ToolbarHeaderElement extends ToolbarElement {

    /** The logo in the toolbar. */
    private logoElement: HTMLElement;

    /**
     * Creates a new ToolbarElement.
     *
     * @param fixture {@link ComponentFixture} where toolbar is rendered.
     */
    constructor(
        fixture: ComponentFixture<any>
    ) {
        super(fixture, ['.marker-bars-button', '.marker-home-button']);

        this.logoElement = this.query<HTMLElement>('.marker-header-logo');
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