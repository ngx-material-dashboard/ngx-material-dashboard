---
sidebar_position: 4
---

# Usage

This library can be used to write tests for any angular components that utilize
components defined in the [widgets](../../component-libraries/widgets/intro.md)
library. It can also be used to help with writing tests for classes and services
derived from the [base-json](../../services-libraries/base-json/intro.md),
[json](../../services-libraries/json/intro.md), or [json-api](../../services-libraries/json-api/intro.md) libraries by providing some basic mock classes to ensure no
HTTP requests are made by the base datastore service utilized by those libraries.
In some cases you might be able to use some of the PageElements to write tests
for your own components that do not use any components defined in the widgets
library (that is simple elements like the button or checkbox), but you will most
likely not be able to use some of the more complex PageElements like the PagedTable
or PagedTableWithToolbar IF you are not utilizing the widgets library for those
components.

> NOTE: If you are not using the widgets library DO NOT submit issues with the
> complex PageElements I have defined since they rely on the structure of the
> components defined in the widgets library. I will not address these issues
> unless this library becomes widely popular by some chance and there is a huge
> demand for this to be a general purpose testing library.

## Mock Objects and Fixtures

The library includes several mock classes and fixtures that you may use when
writing karma tests or creating sandboxes for your angularplayground.it. The
`dummy-object.mock.ts` class defines a simple model class that extends the
base-json JsonModel class. While the `dummy-object.fixture.ts` class generates
some dummy data based on the `DummyObject` class that can be used in your tests.

## PageElements and PageObjects

The core capabilities for this library come from the PageElements and
PageObjects. Every PageElement and PageObject relies on a ComponentFixture. The
ComponentFixture should be passed as the first argument to the constructor for
whatever PageElement or PageObject you instantiate. To get the ComponentFixture
you can use the object created when you call `TestBed.createComponent()`, which
you should be familiar with. Take a look at the API documentation to see what if
any additional parameters are required when creating specific PageElements.

Below is an example of how to use the `PagedTableElement` to test a component
that utilizes the PagedTableComponent defined in the widgets library.

```typescript
import { PagedTableElement, TEST_DATA } from '@ngx-material-dashboard/testing'
import { ExamplePagedTableComponent } from './example-paged-table.component'
// any other imports you may need...

describe('ExamplePagedTableComponent', () => {

    let pagedTable: PagedTableElement;

    beforeEach(() => {
        TestBed.configureTestingModule({...});
        const fixture = TestBed.createComponent(ExamplePagedTableComponent);

        // set pageSize after change detection cycle to ensure component
        // initialized and PagedTableComponent (which should be child of
        // ExamplePagedTableComponent) exists
        component.table.pageSize = pageSize;
        fixture.detectChanges();

        // create the PagedTable PageElement (NOTE: this assumes you defined a
        // CSS selector marker for the table as defined below; this is in case
        // you have a component with more than 1 PagedTable, each table should
        // have their own CSS selector for the PagedTable element to work 
        // correctly)
        pagedTable = new PagedTable(fixture, '.marker-example-paged-table');
    });

    describe('No Table Data', () => {

        it('should display no data row', () => {
            // given: the no data row
            const noDataRow: HTMLElement = pagedTable.noDataRow;

            // expect: the row to be defined
            expect(noDataRow).toBeDefined();

            // and: the text of the row to be 'No data found'
            expect(noDataRow.innerText).toEqual('No data found');
        });

        it('should display "0 of 0" in paginator range label', () => {
            expect(pagedTable.paginator.pagingatorRange.innerText).toEqual('0 of 0');
        });
    });

    describe('With Table Data', () => {
        
        beforeEach(() => {
            pagedTable.data = TEST_DATA // set some test data for the table
        });

        it('should not display no data row', () => {
            // given: the no data row and it's parent
            const noDataRow = pagedTable.noDataRow;
            const noDataRowParent = noDataRow.parentElement;

            // expect: the parent should have "hide" class to hide row
            expect(noDataRowParent?.className).toContain('hide');
        });

        it(`should display "1 – ${pageSize} of ${TEST_DATA.length}" in paginator range label`, () => {
            expect(pageTable.paginator.pagingatorRange.innerText).toEqual(`1 – ${pageSize} of ${TEST_DATA.length}`);
        });
    });
});
```

You can check out tests I've written for components in the widgets library for
more in depth examples of how to use the PageElements defined in this library.
