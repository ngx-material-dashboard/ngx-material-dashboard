import { ComponentFixture } from '@angular/core/testing';
import { PageElement } from '../page-elements/page/page.element';
import { SidenavElement } from '../page-elements/sidenav.element';
import { ToolbarHeaderElement } from '../page-elements/toolbar-header.element';

/**
 * The DefaultLayoutPage class defines properties and functions for testing
 * components that utilize the default layout.
 */
export class DefaultLayoutPage extends PageElement {

    /** The header toolbar for the page. */
    header: ToolbarHeaderElement;
    /** The sidenav for the page. */
    sidenav: SidenavElement;

    /**
     * Creates a new DefaultLayoutPage.
     *
     * @param fixture {@link ComponentFixture} under test.
     */
    constructor(
        fixture: ComponentFixture<any>,
        sidenavListItemSelectors: string[] = [],
        sidenavListItemChildSelectors: string[] = []
    ) {
        super(fixture);

        this.header = new ToolbarHeaderElement(fixture);
        this.sidenav = new SidenavElement(
            fixture,
            sidenavListItemSelectors,
            sidenavListItemChildSelectors
        );
    }
}
