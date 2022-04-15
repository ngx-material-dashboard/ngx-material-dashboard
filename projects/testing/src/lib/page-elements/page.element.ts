import { ComponentFixture } from '@angular/core/testing';

export class PageElement {
    
    fixture: ComponentFixture<any>

    constructor(fixture: ComponentFixture<any>) {
        this.fixture = fixture;
    }

    //// query helpers ////

    /**
     * Finds and returns the first element within the component that matches
     * the specified selector.
     *
     * @param selector The selector used to find the desired element.
     * @param element Optional element to query from (otherwise query from fixture).
     * @returns The first element that matches given selector or null if no matches found.
     */
    query<T>(selector: string, element?: HTMLElement): T {
        if (element) {
            const res = element.querySelector(selector) as any;
            if (res) {
                return res as T;
            } else {
                throw Error(`${selector} not found in ${element.nodeName}`);
            }
        } else {
            const res = this.fixture.nativeElement.querySelector(selector);
            if (res) {
                return res;
            } else {
                throw Error(`${selector} not found in fixture`);
            }
        }
    }

    /**
     * Finds and returns all elements within the component that match the
     * specified selector.
     *
     * @param selector The selector used to find the desired elements.
     * @param element Optional element to query from (otherwise query from fixture).
     * @returns All elements that match the given selector (empty list if no matches found).
     */
    queryAll<T>(selector: string, element?: HTMLElement): T[] {
        if (element) {
            const res = element.querySelectorAll(selector) as any;
            if (res) {
                return res as T[];
            } else {
                throw Error(`Error searching for ${selector} in ${element.nodeName}`);
            }
        } else {
            return this.fixture.nativeElement.querySelectorAll(selector);
        }
    }
}