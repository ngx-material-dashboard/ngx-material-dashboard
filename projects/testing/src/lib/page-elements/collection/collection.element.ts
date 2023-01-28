import { ComponentFixture } from '@angular/core/testing';
import { JsonModel } from '@ngx-material-dashboard/base-json';
import { CheckboxElement } from '../checkbox/checkbox.element';
import { PageElement } from '../page/page.element';
import { SelectElement } from '../select/select.element';

/**
 * The `CollectionElement` defines properties and functions useful for testing
 * components with one or more collection components. This can be used for
 * collection where items can be selected or not (collections that include
 * checkboxes vs. collections that do not). It defaults to collections that can
 * have one or more items selected, but you may define a collection that does
 * not have checkboxes when you create a `CollectionElement` (simply pass
 * `false` for the `selectable` parameter in the constructor). You must define
 * a CSS marker selector for the collection, which should be unique to each
 * collection (in case you include multiple in the same component). You must
 * also define CSS marker selector for each item in the collection so the class
 * can identify and provide utilities for each item (i.e clicking a button or
 * selecting checkbox associated with button). The CSS marker for each item
 * does not need to be unique between collections, and should be the same for
 * each item. This is so the class can query for a list of HTMLElements that
 * match the item selector starting at the collection selector.
 *
 * > NOTE: If you configure a CollectionElement as not selectable, then
 * > functions that relate to selection capabilities will throw an error and
 * > should result in failures in your tests.
 *
 * @usageNotes
 * ### Basic Usage Example
 * ```typescript
 * // other imports...
 * import { PagedTableElement, TEST_DATA } from '@ngx-material-dashboard/testing'
 * import { ExamplePagedTableComponent } from './example-paged-collection.component'
 *
 * describe('ExamplePagedTableComponent', () => {
 *
 *     let pagedTable: PagedTableElement;
 *
 *     beforeEach(() => {
 *         TestBed.configureTestingModule({...});
 *         const fixture = TestBed.createComponent(ExamplePagedTableComponent);
 *
 *         // set pageSize after change detection cycle to ensure component
 *         // initialized and PagedTableComponent (which should be child of
 *         // ExamplePagedTableComponent) exists
 *         component.collection.pageSize = pageSize;
 *         fixture.detectChanges();
 *
 *         // create the PagedTable PageElement (NOTE: this assumes you defined a
 *         // CSS selector marker for the collection as defined below; this is in case
 *         // you have a component with more than 1 PagedTable, each collection should
 *         // have their own CSS selector for the PagedTable element to work
 *         // correctly)
 *         pagedTable = new PagedTable(fixture, '.marker-example-paged-collection');
 *     });
 *
 *     describe('No Collection Data', () => {
 *
 *         it('should display no data item', () => {
 *             // given: the no data item
 *             const noDataRow: HTMLElement = pagedTable.noDataRow;
 *
 *             // expect: the item to be defined
 *             expect(noDataRow).toBeDefined();
 *
 *             // and: the text of the item to be 'No data found'
 *             expect(noDataRow.innerText).toEqual('No data found');
 *         });
 *
 *         it('should display "0 of 0" in paginator range label', () => {
 *             expect(pagedTable.paginator.pagingatorRange.innerText).toEqual('0 of 0');
 *         });
 *     });
 *
 *     describe('With Collection Data', () => {
 *
 *         beforeEach(() => {
 *             pagedTable.data = TEST_DATA // set some test data for the collection
 *         });
 *
 *         it('should not display no data item', () => {
 *             // given: the no data item and it's parent
 *             const noDataRow = pagedTable.noDataRow;
 *             const noDataRowParent = noDataRow.parentElement;
 *
 *             // expect: the parent should have "hide" class to hide item
 *             expect(noDataRowParent?.className).toContain('hide');
 *         });
 *
 *         it(`should display "1 – ${pageSize} of ${TEST_DATA.length}" in paginator range label`, () => {
 *             expect(pageTable.paginator.pagingatorRange.innerText).toEqual(`1 – ${pageSize} of ${TEST_DATA.length}`);
 *         });
 *     });
 * });
 * ```
 *
 * @overviewDetails
 * ### Features
 *
 * `CollectionElements` have multiple features built in, including the ability
 * to click buttons in any element of the collection, check if all items are
 * selected, check if a single item is selected, select all items, and
 * select individual items.
 *
 * ##### Click Collection Button
 *
 * The `clickItemButton` method clicks the button with the given text in the
 * given item and column. If your actions column is defined last you can omit
 * the column as this defaults to the last column in the collection.
 *
 * ##### All Rows Selected
 *
 * The `isAllSelected` method returns true if all rows in the collection are
 * selected. Otherwise returns false.
 *
 * ##### Is Item Selected
 *
 * The `isItemSelected` method returns true if the item at the given index is
 * selected.
 *
 * ##### Select All Rows
 *
 * The `selectAll` function clicks the checkbox in the header which should
 * select all rows in the collection (or deselect all rows if all selected). This
 * method is asynchronous, so you should use async/await when calling this
 * in your code.
 *
 * ##### Select Item
 *
 * The `selectItem` function clicks the checkbox at the given item. This method
 * is asynchronouse, sou you should use async/await when calling this in your
 * code.
 */
export class CollectionElement extends PageElement {
    /** CSS selector for checkboxes for each item (excludes select all). */
    checkboxItemSelector!: string;
    /** HTMLElement containing collection. */
    collectionElement: HTMLElement;
    /** The component instance containing the collection. */
    component: any;
    /** An array of all HTMLElement items in the collection. */
    items!: HTMLElement[];
    /** Array of all checkboxes in collection (excludes select all checkbox).*/
    itemCheckboxes!: CheckboxElement[];
    /** CSS selector for each item in collection. */
    itemSelector: string;
    sorter?: SelectElement;

    /**
     * Creates a new CollectionElement in given fixture with given CSS selector.
     * The given selector should be unique to each collection in case you
     * define multiple in the same component. You must also provide a CSS
     * itemSelector to define marker for each item in collection. This does not
     * need to be unique since the element will query from the HTMLElement found
     * with given selector. Optional checkboxItemSelector and selectable
     * parameters are included to control marker for item select checkboxes and
     * whether collection allows multi-select. These default to
     * '.marker-checkbox-item-select' and true respectively.
     *
     * @param fixture Fixture for component under test.
     * @param selector CSS selector for collection.
     * @param itemSelector CSS selector for each item in collection.
     * @param checkboxItemSelector CSS selector for checkboxes associated with each item.
     * @param selectable Boolean value indicating whether collection has items that are selectable (defaults to true).
     * @param noDataColumnSelector Optional CSS selector for no data column definition (defaults to 'noData').
     */
    constructor(
        fixture: ComponentFixture<any>,
        selector: string,
        itemSelector: string,
        checkboxItemSelector: string = '.marker-checkbox-item-select',
        private selectable = true
    ) {
        super(fixture);

        this.component = fixture.componentInstance;
        this.collectionElement = this.query<HTMLElement>(selector);
        this.itemSelector = itemSelector;
        this.checkboxItemSelector = checkboxItemSelector;
        this.initItemsAndCheckboxes(
            this.itemSelector,
            this.checkboxItemSelector
        );

        try {
            this.sorter = new SelectElement(
                this.fixture,
                this.collectionElement
            );
        } catch (error) {
            console.log('.mat-sort not found in collection element');
        }
    }

    /**
     * Returns the checkbox for selecting all visible items.
     */
    get selectAllCheckbox(): CheckboxElement {
        const element: HTMLElement = this.query<HTMLElement>(
            '.marker-checkbox-select-all',
            this.collectionElement
        );
        return new CheckboxElement(this.fixture, element);
    }

    /**
     * Sets the data for the collection.
     */
    set data(data: JsonModel[]) {
        this.component.data = data;
        this.fixture.detectChanges();
        this.initItemsAndCheckboxes(
            this.itemSelector,
            this.checkboxItemSelector
        );
    }

    /**
     * Initializes the items and item checkboxes. Called when element initially
     * created, and when data set for element (so items and corresponding
     * checkboxes are updated accordingly).
     */
    private initItemsAndCheckboxes(
        selector: string,
        checkboxkItemSelector: string
    ) {
        try {
            this.items = this.queryAll<HTMLElement>(
                selector,
                this.collectionElement
            );
        } catch (error: any) {
            if (error.message.toString().includes(`${selector} not found in`)) {
                // this should happen when no data loaded in collection; might be
                // possible that selector just not defined though...
                this.items = [];
            } else {
                // something else happened; throw error so user can see (not
                // really sure what this would be but throw error just in case)
                throw error;
            }
        }

        // re-initialize item checkboxes and query for CSS selectors if applicable
        this.itemCheckboxes = [];
        if (this.items.length > 0 && this.selectable) {
            // only query for item checkboxes if items available and collection selectable
            const checkboxes: HTMLElement[] = this.queryAll<HTMLElement>(
                checkboxkItemSelector,
                this.collectionElement
            );

            // add each checkbox HTML element to item checkboxes
            checkboxes.forEach((checkbox: HTMLElement) => {
                this.itemCheckboxes.push(
                    new CheckboxElement(this.fixture, checkbox)
                );
            });
        }
    }

    /**
     * Clicks a button in the buttons associated with the item in the collection
     * at the given index.
     *
     * @param click The button to click.
     * @param rowIndex The item in collection with button that should be clicked.
     */
    clickItemButton(click: string, rowIndex: number): void {
        const item: HTMLElement = this.items[rowIndex];
        // add a '.' to start if itemSelector doesn't already have it
        const selectorStart: string = this.itemSelector.startsWith('.')
            ? ''
            : '.';
        const itemButtons: HTMLElement | null = item.querySelector(
            `${selectorStart}${this.itemSelector}-buttons`
        );
        const button: HTMLButtonElement | null | undefined =
            itemButtons?.querySelector(`.marker-button-${click}`);
        if (button == null) {
            // throw an error if the button is not found
            throw new Error(
                `Expected HTMLButtonElement with CSS selector ".marker-button-${click}" in collection item buttons`
            );
        } else {
            // click the button if it is not null
            button.click();
        }
    }

    /**
     * Returns true if header checkbox is checked.
     *
     * @returns True if header checkbox is checked.
     */
    isAllSelected(): boolean {
        if (this.selectable) {
            return this.selectAllCheckbox.checked;
        } else {
            throw Error('Collection is not selectable');
        }
    }

    /**
     * Returns true if the item with the given index is selected (i.e. that it's
     * checkbox is checked).
     *
     * @param index The index of the item to test.
     * @returns True if the item with the given index is selected.
     */
    isItemSelected(index: number): boolean {
        if (this.selectable) {
            return this.itemCheckboxes[index].checked;
        } else {
            throw Error('Collection is not selectable');
        }
    }

    /**
     * Selects the checkbox in the item at the given index.
     *
     * @param index The item to click the checkbox in.
     */
    public async selectItem(index: number): Promise<void> {
        if (this.selectable) {
            await this.itemCheckboxes[index].click();
        } else {
            throw Error('Collection is not selectable');
        }
    }

    /**
     * Selects the select all checkbox in the header of the collection to mark all
     * visible checkboxes as selected (i.e. checked).
     */
    public async selectAll(): Promise<void> {
        if (this.selectable) {
            await this.selectAllCheckbox.click();
        } else {
            throw Error('Collection is not selectable');
        }
    }
}
