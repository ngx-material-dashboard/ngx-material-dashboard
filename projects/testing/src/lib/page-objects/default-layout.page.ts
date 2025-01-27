/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { ComponentFixture } from '@angular/core/testing';
import { PageElement } from '../page-elements/page/page.element';
import { SidenavElement } from '../page-elements/sidenav/sidenav.element';
import { ToolbarHeaderElement } from '../page-elements/toolbar-header/toolbar-header.element';

/**
 * The `DefaultLayoutPage` class defines properties and functions for testing
 * components that utilize the default layout. It is mostly a wrapper around
 * the `ToolbarHeaderElement` and `SidenavElement`. See the
 * [ToolbarHeaderElement](/testing/element/overview#toolbar-header-element) and
 * [SidenavElement](/testing/element/overview#sidenav-element) documentation for more details.
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
        sidenavListItemChildSelectors: string[] = [],
        headerFilterButtonSelectors: string[] = []
    ) {
        super(fixture);

        this.header = new ToolbarHeaderElement(
            fixture,
            headerFilterButtonSelectors
        );
        this.sidenav = new SidenavElement(
            fixture,
            sidenavListItemSelectors,
            sidenavListItemChildSelectors
        );
    }
}
