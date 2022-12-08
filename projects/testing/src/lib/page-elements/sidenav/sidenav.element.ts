import { ComponentFixture } from '@angular/core/testing';
import { PageElement } from '../page/page.element';

/**
 * The SidenavElement class defines properties and functions for testing
 * components that utilize a Sidenav.
 * 
 * @usageNotes
 * ## Basic Usage Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {TestBed} from '@angular/core/testing';
 * import {MatListModule} from '@angular/material/list';
 * import {MatSidenavModule} from '@angular/material/sidenav';
 * import {SidenavElement} from '@ngx-material-dashboard/testing';
 *
 * @Component({
 *   template: `
 *       <mat-nav-list>
 *           <mat-list-item class="marker-list-item-button-activeParent"
 *                   (click)="click()">
 *               <span class="marker-angle-down"></span>
 *               <span fxFlex="0 0 auto" class="marker-list-item">
 *                   <span class="pl-2 marker-list-item-text">Active Item With Children</span>
 *               </span>
 *           </mat-list-item>
 *           <mat-list-item class="marker-list-item-button-activeChild selected-list-item"
 *                   (click)="click()">
 *               <span fxFlex="0 0 auto" class="marker-list-item pl-4">
 *                   <span class="pl-2 marker-list-item-text">Active Child</span>
 *               </span>
 *           </mat-list-item>
 *           <mat-list-item class="marker-list-item-button-inactiveItem"
 *                   (click)="click()">
 *               <span class="marker-angle-right"></span>
 *               <span fxFlex="0 0 auto" class="marker-list-item pl-4">
 *                   <span class="pl-2 marker-list-item-text">Inactive Item</span>
 *               </span>
 *           </mat-list-item>
 *       </mat-nav-list>
 *   `
 * }) class SidenavExampleComponent {
 *   click() : void {}
 * }
 *
 * describe('SidenavExampleComponent', () => {
 *
 *     let buttonClickSpy: jasmine.Spy;
 *     let sidenavElement: SidenavElement;
 *
 *     beforeEach(() => {
 *         TestBed.configureTestingModule({
 *             declarations: [SidenavComponent],
 *             imports: [
 *                 MatListModule,
 *                 MatSidenavModule
 *             ]
 *         });
 *
 *         const fixture = TestBed.createComponent(SidenavComponent);
 *         sidenavElement = new SidenavElement(
 *             fixture,
 *             ['activeParent', 'inactiveItem'],
 *             ['activeChild']
 *         );
 *         buttonClickSpy = spyOn(sidenavElement.fixture.componentInstance, 'click');
 *     });
 *
 *     it('should have 2 main sidenav elements', () => {
 *         expect(sidenavElement.listItemsLength).toEqual(2);
 *     });
 *
 *     it('should return true when isListItemExpanded is called with activeParent', () => {
 *         expect(sidenavElement.isListItemExpanded('activeParent')).toBeTrue();
 *     });
 *
 *     it('should return false when isListItemExpanded is called with inactiveItem', () => {
 *         expect(sidenavElement.isListItemExpanded('inactiveItem')).toBeFalse();
 *     });
 *
 *     it('should return true when isListItemActive is called for activeChild', () => {
 *         expect(sidenavElement.isListItemActive('activeChild')).toBeTrue();
 *     });
 * 
 *     it('should do something when inactiveItem is clicked', async() => {
 *         // when: the inactiveItem is clicked
 *         await sidenavElement.clickListItem('inactiveItem');
 * 
 *         // then: something should happen
 *         // perform your tests...
 *     });
 * });
 * ```
 * 
 * ## Features
 * 
 * The main features available for the `SidenavElement` are the ability to get
 * the number of main (top level) sidenav items are in the sidenav, click a
 * sidenav item, check if a sidenav item is active, and check if a sidenav item
 * is expanded. 
 * 
 * ### Click Sidenav Item
 * 
 * The `clickListItem` method will click the sidenav item with the given
 * selector. This method is asynchronous, so you should use async/await when
 * calling this method in your code.
 * 
 * ### Sidenav Item Active
 * 
 * The `isListItemActive` method will return true if the sidenav item with the
 * given selector is active, otherwise it will return false. A sidenav item is
 * active if it contains the `selected-list-item` class.
 * 
 * ### Sidenav Item Expanded
 * 
 * The `isListItemExanded` method will return true if the sidenav item with the
 * given selector is expanded, otherwise it will return false. A sidenav item
 * is expanded if it has the angle down icon in the sidenav item.
 */
export class SidenavElement extends PageElement {

    private listItemChildSelectors: string[];
    private listItemGrandChildSelectors: string[];
    /** List of main items in sidenav. */
    private listItemElements: HTMLElement[] = [];
    /** Map of CSS selectors to list items in sidenav. */
    private listItemElementsMap: { [selector: string]: HTMLElement } = {};
    /** Map of CSS selectors to child list items in sidenav. */
    private listItemChildElementsMap: { [selector: string]: HTMLElement } = {};
    /** Map of CSS selector to grand child list itmes in sidenav. */
    private listItemGrandChildElementsMap: { [selector: string]: HTMLElement } = {};

    /**
     * Creates a new SidenavElement.
     *
     * @param fixture {@link ComponentFixture} where sidnav is rendered.
     * @param listItemSelectors Optional text for each main nav list item.
     * @param listItemChildSelectors Optional text for each child nav list item.
     * @param listItemGrandChildSelectors Optional text for each grand child nav list item.
     */
    constructor(
        fixture: ComponentFixture<any>,
        listItemSelectors: string[] = [],
        listItemChildSelectors: string[] = [],
        listItemGrandChildSelectors: string[] = []
    ) {
        super(fixture);
        this.listItemChildSelectors = listItemChildSelectors;
        this.listItemGrandChildSelectors = listItemGrandChildSelectors;

        // set listItemElements and listElementsMap based on given text which
        // is used in CSS selectors
        listItemSelectors.forEach((listItemSelector: string) => {
            const listElement: HTMLElement = this.query(`.marker-list-item-button-${listItemSelector}`);
            this.listItemElements.push(listElement);
            this.listItemElementsMap[listItemSelector] = listElement;
        });

        // try to initialize children and grandchildren; not all will initialize if
        // sidenavItems are not expanded though...
        this.initChildren();
        this.initGrandChildren();
    }

    // set listItemChildElementsMap based on given text which is used in
    // CSS selectors
    private initChildren() {
        this.listItemChildSelectors.forEach((listItemChildSelector: string) => {
            try {
                const listChildElement: HTMLElement = this.query(`.marker-list-item-button-${listItemChildSelector}`);
                this.listItemChildElementsMap[listItemChildSelector] = listChildElement;
            } catch (error) {

            }
        });
    }

    private initGrandChildren() {
        this.listItemGrandChildSelectors.forEach((listItemGrandChildSelector: string) => {
            try {
                const listGrandChildElement: HTMLElement = this.query(`.marker-list-item-button-${listItemGrandChildSelector}`);
                this.listItemGrandChildElementsMap[listItemGrandChildSelector] = listGrandChildElement;
            } catch (error) {

            }
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

        // try initializing children/grandchildren in case this is first time
        // element is expanded; TODO probably keep track of expanded items and
        // only do this as needed
        this.initChildren();
        this.initGrandChildren();
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
        let listItem = this.listItemElementsMap[selector];
        if (listItem) {
            return listItem;
        } else {
            // if listItem is not found, then element should be a child
            listItem = this.listItemChildElementsMap[selector];
            if (listItem) {
                return listItem;
            } else {
                // if listItem not found, then element should be a grand child
                return this.listItemGrandChildElementsMap[selector];
            }
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
        let listItem = this.listItemElementsMap[selector];
        if (!listItem) {
            // if listItem not found, then listItem should be in child elements
            listItem = this.listItemChildElementsMap[selector];
        }
        
        const angleIcon = listItem.querySelector('.marker-angle-down');
        return angleIcon !== null;
    }
}
