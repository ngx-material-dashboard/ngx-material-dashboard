import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, inject } from '@angular/core/testing';
import { ButtonElement } from '../button/button.element';
import { PageElement } from '../page/page.element';

/**
 * The `Select` class defines properties and functions useful for testing
 * components with one or more select fields. NOTE: you must use fakeAsync in
 * your tests when calling `initOptions` and `select` methods. Mostly based on
 * code provided at following gist:
 * https://gist.github.com/glendaviesnz/fc8e99b41f0dda8b1c0dc4d397e0d152
 */
export class MenuElement extends PageElement {
    private buttonElements: ButtonElement[] = [];
    /** A map of selectors to buttons. */
    private buttonElementsMap: { [selector: string]: ButtonElement } = {};
    private buttonSelectors: string[] = [];
    private container!: OverlayContainer;
    containerElement!: HTMLElement;
    private parentElement?: HTMLElement;

    constructor(
        fixture: ComponentFixture<any>,
        buttonSelectors: string[] = ['.marker-button-search'],
        parentElement?: HTMLElement
    ) {
        super(fixture);
        inject([OverlayContainer], (oc: OverlayContainer) => {
            this.container = oc;
            this.containerElement = oc.getContainerElement();
        })();
        this.buttonSelectors = buttonSelectors;
        this.parentElement = parentElement;
    }

    get trigger(): HTMLElement {
        return this.query<HTMLElement>(
            '.marker-menu-trigger',
            this.parentElement
        );
    }

    initButtons() {
        this.open();
        // set buttonElements and buttonElementsMap based on given buttonSelectors
        this.buttonSelectors.forEach((selector: string) => {
            const button: ButtonElement = new ButtonElement(
                this.fixture,
                selector,
                this.containerElement
            );
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
    public clickButton(selector: string): void {
        this.open();
        this.buttonElementsMap[selector].button.click();
    }

    /**
     * Open the menu.
     */
    open() {
        this.trigger.click();
    }
}
