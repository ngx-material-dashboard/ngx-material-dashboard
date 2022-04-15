import { ComponentFixture } from '@angular/core/testing';

export class PageElement {
    
    constructor(protected fixture: ComponentFixture<any>) {}

    //// query helpers ////

    /**
     * Finds and returns the first element within the component that matches
     * the specified selector.
     *
     * @param selector The selector used to find the desired element.
     * @returns The first element that matches given selector or null if no matches found.
     */
    query<T>(selector: string): T {
        return this.fixture.nativeElement.querySelector(selector);
    }

    /**
     * Finds and returns all elements within the component that match the
     * specified selector.
     *
     * @param selector The selector used to find the desired elements.
     * @returns All elements that match the given selector (empty list if no matches found).
     */
    queryAll<T>(selector: string): T[] {
        return this.fixture.nativeElement.querySelectorAll(selector);
    }
}