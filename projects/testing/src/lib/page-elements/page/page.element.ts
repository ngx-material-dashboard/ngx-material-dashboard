/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { ComponentFixture } from '@angular/core/testing';

/**
 * The PageElement class represents the most basic element for testing. All
 * other page elements and objects should extend this class to make use of
 * basic utility functions needed for tests. Currently the only utility
 * functions needed are query and queryAll, to find one or more HTML
 * elements in component under test.
 *
 * If either query or queryAll fail to find an element that matches the given
 * selector, then an error is thrown. This seems to be the appropriate response
 * for testing utilities, since the page elements themselves will expect the
 * HTML elements to exist in order for them to work in the tests. It should
 * also provide some form of debugging as I hope the error message is
 * descriptive enough for others to determine what they did wrong in
 * structuring their component for their tests.
 */
export class PageElement {
    /** The fixture for component under test. */
    fixture: ComponentFixture<any>;

    /**
     * Creates a new PageElement.
     *
     * @param fixture The fixture for component under test.
     */
    constructor(fixture: ComponentFixture<any>) {
        this.fixture = fixture;
    }

    //// query helpers ////

    /**
     * Finds and returns the first element within the component that matches
     * the specified selector. The optional HTMLElement parameter provides more
     * control over the query since that is where the query is run from if it
     * is included. This is useful for testing components that may have more
     * than one of the same type of page element included, in which case you
     * can include the parent of the desired page element you need to query
     * from to get the correct one (otherwise the first page element found from
     * the entire test fixture will be returned).
     *
     * @param selector The selector used to find the desired element.
     * @param element Optional element to query from (otherwise query from fixture).
     * @returns The first element that matches given selector or null if no matches found.
     */
    query<T>(selector: string, element?: HTMLElement): T {
        let closure: (selector: string) => T | null;
        if (element) {
            // if the element is defined then create closure to query from element
            closure = function (selector: string): T | null {
                return element.querySelector(selector) as any;
            };
        } else {
            // if element not defined then create closure to query from fixture
            const fixture = this.fixture;
            closure = function (selector: string): T {
                return fixture.nativeElement.querySelector(selector);
            };
        }
        return this.queryUtil<T>(selector, closure, element);
    }

    /**
     * Finds and returns all elements within the component that match the
     * specified selector. The optional HTMLElement parameter provides more
     * control over the query since that is where the query is run from if it
     * is included. This is useful for testing components that may have more
     * than one of the same type of page element included, in which case you
     * can include the parent of the desired page element you need to query
     * from to get the correct one (otherwise the first page element found from
     * the entire test fixture will be returned).
     *
     * @param selector The selector used to find the desired elements.
     * @param element Optional element to query from (otherwise query from fixture).
     * @returns All elements that match the given selector (empty list if no matches found).
     */
    queryAll<T>(selector: string, element?: HTMLElement): T[] {
        let closure: (selector: string) => T[] | null;
        if (element) {
            // if element defined then create closure to query all from element
            closure = function (selector: string): T[] | null {
                return element.querySelectorAll(selector) as any;
            };
        } else {
            // if element not defined then create closure to query all from fixture
            const fixture = this.fixture;
            closure = function (selector: string): T[] {
                return fixture.nativeElement.querySelectorAll(selector);
            };
        }
        return this.queryUtil<T[]>(selector, closure, element);
    }

    /**
     * Utility function to perform query. This just helps to dry up some of the
     * error handling.
     *
     * @param selector CSS selector used to find element(s).
     * @param closure Function to perform query.
     * @param element Optional element to query from.
     * @returns The element(s) that match given selector (if the exist in fixture or given element).
     */
    private queryUtil<T>(
        selector: string,
        closure: (selector: string) => T | null,
        element?: HTMLElement
    ): T {
        const res = closure(selector);
        if (
            (res && !(res instanceof NodeList)) ||
            (res && res instanceof NodeList && res.length > 0)
        ) {
            // if the result is just a single element (query), then it should
            // be returned; if result is a NodeList (queryAll), then there
            // should be at least one element in NodeList, otherwise an error
            // should be thrown (since no elements were found by given selector)
            return res;
        } else {
            let errorMsg: string;
            if (!element) {
                errorMsg = `${selector} not found in fixture`;
            } else {
                errorMsg = `${selector} not found in ${element.nodeName}`;
            }
            throw Error(errorMsg);
        }
    }
}
