/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, inject } from '@angular/core/testing';
import { ButtonElement } from '../button/button.element';
import { PageElement } from '../page/page.element';

/**
 * The MenuElement class defines properties and functions useful for testing
 * components that are rendered in an overlay. This was initially just intended
 * for MatMenu components, but apparently this works with dialogs as well (at
 * least the dialog used in updated FilterDropDownComponent).
 *
 * TODO refactor, ensure this works with any dialog, and rename element to
 * OverlayElement (or something similar) to indicate it is a generic element
 * that can be used for more than just MatMenu.
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
