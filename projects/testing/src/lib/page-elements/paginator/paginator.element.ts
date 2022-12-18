import { ComponentFixture } from '@angular/core/testing';
import { PageElement } from '../page/page.element';

/**
 * The PaginatorElement class defines properties and functions useful for
 * testing components with a paginator.
 *
 * @usageNotes
 * ## Basic Usage Example
 * import {Component} from '@angular/core';
 * import {TestBed} from '@angular/core/testing';
 * import {MatButtonModule} from '@angular/material/button';
 * import {MatPaginatorModule} from '@angular/material/paginator';
 * import {NoopAnimationsModule} from '@angular/platform-browser/animations';
 * import {PaginatorElement} from '@ngx-material-dashboard/testing';
 *
 * // define a simple component with a button to test with
 * @Component({
 *     template: `
 *         <div>
 *             <mat-paginator [length]="length"
 *                 [pageSize]="pageSize"
 *                 [pageSizeOptions]="[15, 25, 50, 75, 100]"
 *                 (page)="page()">
 *             </mat-paginator>
 *         </div>
 *     `
 * }) class PaginatorComponent {
 *     length = 200;
 *     pageSize = 25;
 *
 *     page(): void {
 *         // do something when page event occurs
 *     }
 * }
 *
 * describe('PaginatorElement defined', () => {
 *     let pageClickSpy: jasmine.Spy;
 *     let paginatorElement: PaginatorElement;
 *
 *     beforeEach(() => {
 *          TestBed.configureTestingModule({
 *              declarations: [PaginatorComponent],
 *              imports: [MatButtonModule, MatPaginatorModule, NoopAnimationsModule]
 *          });
 *
 *          const fixture = TestBed.createComponent(component);
 *          fixture.detectChanges();
 *          const element = fixture.nativeElement.querySelector(querySelector);
 *          paginatorElement = new PaginatorElement(fixture, element);
 *          pageClickSpy = spyOn(paginatorElement.fixture.componentInstance, 'page');
 *     });
 *
 *     it('should return "1 – 25 of 200" for paginator range when length=200 and pageSize=25', () => {
 *         expect(paginatorElement.pagingatorRange.innerText).toEqual('1 – 25 of 200');
 *     });
 *
 *     it('should emit page event when next button clicked', () => {
 *         // when: next button clicked
 *         paginatorElement.clickNextButton();
 *
 *         // expect: the pageClickSpy should have been called
 *         expect(pageClickSpy).toHaveBeenCalled();
 *     });
 *
 *     it('should not emit page event when previous button clicked by default', () => {
 *         // when: previous button clicked
 *         paginatorElement.clickPreviousButton();
 *
 *         // expect: pageClickSpy to not have been called (since it should be disabled when on 1st page)
 *         expect(pageClickSpy).not.toHaveBeenCalled();
 *     });
 *
 *     it('should emit page event when previous button clicked', () => {
 *         // when: next button clicked (needs to be clicked to enable previous button)
 *         paginatorElement.clickNextButton();
 *
 *         // and: previous button clicked
 *         paginatorElement.clickPreviousButton();
 *
 *         // expect: the pageClickSpy should have been called twice
 *         expect(pageClickSpy).toHaveBeenCalledTimes(2);
 *     });
 * });
 * ```
 *
 * ## Features
 *
 * The `PaginatorElement` provides the ability to read the range label (i.e.
 * the text that reads "x - y of z" in the paginator), and click next and
 * previous buttons.
 *
 * ### Range Label
 *
 * The `paginatorRange` getter returns an `HTMLElement` with the range label.
 *
 * ### Next/Previous
 *
 * The `clickNextButton` and `clickPreviousButton` methods click the next and
 * previous buttons respectively. Both of these methods are asynchronous, so
 * you should use async/await when using these methods in your code.
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
        const range = this.element.querySelector<HTMLElement>(
            '.mat-paginator-range-label'
        );
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
        const button = this.element.querySelector<HTMLButtonElement>(
            `.mat-paginator-navigation-${marker}`
        );
        if (button) {
            button.click();
            this.fixture.detectChanges();
            await this.fixture.whenStable();
        } else {
            throw Error(
                `Error mat-paginator-navigation-${marker} not found when trying to click ${marker} button`
            );
        }
    }
}
