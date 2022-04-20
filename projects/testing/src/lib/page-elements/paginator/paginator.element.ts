import { ComponentFixture } from "@angular/core/testing";
import { PageElement } from "../page/page.element";

/**
 * The PaginatorElement class defines properties and functions useful for
 * testing components with a paginator.
 */
export class PaginatorElement extends PageElement {

    /** The HTML element for the paginator. */
    element: HTMLElement;

    /**
     * Creates a new PaginatorElement.
     *
     * @param fixture Fixture for component under test.
     * @param parentElement The parent element containing the paginator.
     */
    constructor(fixture: ComponentFixture<any>, parentElement: HTMLElement) {
        super(fixture);

        // get the HTML element for the paginator from the given parent
        this.element = this.query<HTMLElement>('mat-paginator', parentElement);
    }

    /**
     * Returns the paginator range label, something like "x of y".
     */
    get pagingatorRange(): HTMLElement {
        const range = this.element.querySelector<HTMLElement>('.mat-paginator-range-label');
        if (range) {
            return range;
        } else {
            throw Error('Paginator range label not found');
        }
    }

    /**
     * Clicks the next page button.
     */
    public async clickNextButton(): Promise<void> {
        await this.clickPageButtonHelper('next');
    }

    /**
     * Clicks the previous button.
     */
    public async clickPreviousButton(): Promise<void> {
        await this.clickPageButtonHelper('previous');
    }

    /**
     * Finds and clicks the button with the given class marker.
     *
     * @param marker The class to query for the button.
     */
    private async clickPageButtonHelper(marker: string): Promise<void> {
        const button = this.element.querySelector<HTMLButtonElement>(`.mat-paginator-navigation-${marker}`);
        if (button) {
            button.click();
            this.fixture.detectChanges();
            await this.fixture.whenStable();
        } else {
            throw Error(`Error mat-paginator-navigation-${marker} not found when trying to click ${marker} button`);
        }
    }
}
