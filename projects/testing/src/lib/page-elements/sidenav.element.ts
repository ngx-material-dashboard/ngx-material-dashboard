import { ComponentFixture } from '@angular/core/testing';
import { PageElement } from './page/page.element';

/**
 * The SidenavElement class defines properties and functions for testing
 * components that utilize a Sidenav.
 */
export class SidenavElement extends PageElement {

    /** List of main items in sidenav. */
    private listItemElements: HTMLElement[] = [];
    /** Map of CSS selectors to list items in sidenav. */
    private listItemElementsMap: { [selector: string]: HTMLElement } = {};
    /** Map of CSS selectors to child list items in sidenav. */
    private listItemChildElementsMap: { [selector: string]: HTMLElement } = {};

    /**
     * Creates a new SidenavElement.
     *
     * @param fixture {@link ComponentFixture} where sidnav is rendered.
     * @param listItemSelectors Optional text for each main nav list item.
     * @param listItemChildSelectors Optional text for each child nav list item.
     */
    constructor(
        fixture: ComponentFixture<any>,
        listItemSelectors: string[] = [],
        listItemChildSelectors: string[] = []
    ) {
        super(fixture);

        // set listItemElements and listElementsMap based on given text which
        // is used in CSS selectors
        listItemSelectors.forEach((listItemSelector: string) => {
            const listElement: HTMLElement = this.query(`.marker-list-item-button-${listItemSelector}`);
            this.listItemElements.push(listElement);
            this.listItemElementsMap[listItemSelector] = listElement;
        });

        // set listItemChildElementsMap based on given text which is used in
        // CSS selectors
        listItemChildSelectors.forEach((listItemChildSelector: string) => {
            const listChildElement: HTMLElement = this.query(`.marker-list-item-button-${listItemChildSelector}`);
            this.listItemChildElementsMap[listItemChildSelector] = listChildElement;
        });
    }

    /**
     * Returns the number of main list item elements.
     */
    public get listItemsLength(): number {
        return this.listItemElements.length;
    }

    /**
     * Clicks a list item in the sidenav and waits for fixture to be stable.
     * 
     * NOTE: if given item is a child item, then you must handle expanding
     * the parent item to allow the child to be clicked (does it make sense to
     * automatically do this? what if fixture already has parent expanded from
     * user performing some other operation in test and clicking parent
     * actually collapses it?... it's certainly possible to add logic to
     * handle that case, but do I really want to do that here...?)
     *
     * @param selector CSS selector for list item to click. 
     */
    public async clickListItem(selector: string): Promise<void> {
        this.getListItem(selector).click();
        this.fixture.detectChanges();
        await this.fixture.whenStable();
    }

    /**
     * Returns true if list item with given selector is active. A list item is
     * active if it contains "selected-list-item" in it's CSS class list.
     *
     * @param selector CSS selector for list item to determine active status. 
     * @returns true if list item with given selector is active; otherwise false.
     */
    public isListItemActive(selector: string): boolean {
        return this.getListItem(selector).classList.contains('selected-list-item');
    }

    /**
     * Returns the list item by the given selector. Attempts to get the list
     * item from the main list first, if the item is not found there, then the
     * child element list is used.
     *
     * @param selector CSS selector for list item to get. 
     * @returns List item by the given selector.
     */
    private getListItem(selector: string): HTMLElement {
        const listItem = this.listItemElementsMap[selector];
        if (listItem) {
            return listItem;
        } else {
            // if listItem is not found, then element should be a child
            return this.listItemChildElementsMap[selector];
        }
    }

    /**
     * Returns true if list item with given selector is expanded. A list item
     * is expanded if it contains an angle down icon (i.e. has an element with
     * the "marker-angle-down" selector). NOTE: a list item can only be 
     * expanded if it has children.
     *
     * @param selector CSS selector for list item to determine expanded state.
     */
    public isListItemExpanded(selector: string): boolean {
        const listItem = this.listItemElementsMap[selector];
        const angleIcon = listItem.querySelector('.marker-angle-down');
        return angleIcon !== null;
    }
}
