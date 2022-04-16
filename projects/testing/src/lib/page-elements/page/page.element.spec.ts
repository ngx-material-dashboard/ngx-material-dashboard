import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { PageElement } from "./page.element";

@Component({ 
    template: `
        <div class="parent">
            <div class="child"></div>
            <div class="child"></div>
        </div>
    `
}) class PageComponent {}

@Component({ template: `<div class="parent"></div>` }) class UndefinedComponent {}

describe('PageElement', () => {

    let pageElement: PageElement;
    
    describe('PageElement with defined children to query for', () => {
        beforeEach(() => {
            pageElement = init(PageComponent);
        });

        it('should return first HTMLElement when query method called', () => {
            expect(pageElement.query('.child')).toBeDefined();
        });

        it('should return first HTMLElement when query method called with HTML parent element', () => {
            // given: HTML parent element
            const parentElement: HTMLElement = pageElement.query<HTMLElement>('.parent');

            // expect: query should return first HTMLElement when query called with optional parent element
            expect(pageElement.query('.child', parentElement)).toBeDefined();
        });

        it('should return list of HTMLElements when queryAll method called', () => {
            // when: queryAll method is called
            const elements: HTMLElement[] = pageElement.queryAll<HTMLElement>('.child');

            // then: there should be 2 elements returned
            expect(elements.length).toEqual(2);
        });
    });

    describe('PageElement without defined children', () => {
        beforeEach(() => {
            pageElement = init(UndefinedComponent);
        });

        it('should throw an error when query method called for undefined element', () => {
            expect(() => pageElement.query('.child')).toThrowError('.child not found in fixture');
        });

        it('should throw an error when queryAll method called for undefined element', () => {
            expect(() => pageElement.queryAll('.child')).toThrowError('.child not found in fixture');
        });

        it('should throw an error when queryAll method called for undefined element with parent element', () => {
            // given: HTML parent element
            const parentElement: HTMLElement = pageElement.query<HTMLElement>('.parent');

            // expect: an error when queryAll method called with parent element
            expect(() => pageElement.queryAll('.child', parentElement)).toThrowError('.child not found in DIV');
        });
    });
});

function init(component: any) {
    TestBed.configureTestingModule({
        declarations: [component]
    });

    const fixture = TestBed.createComponent(component);
    return new PageElement(fixture);
}
