# Testing

## Table of Contents

* [Introduction](#introduction)
    * [Library Structure](#library-structure)
* [Getting Started](#getting-started)
    * [Install the Library](#install-the-library)
* [Usage](#usage)
* [Contributing](#contributing)
* [Built With](#built-with)
* [Authors](#authors)

## Introduction

The Testing library is meant to make testing components and angular apps easier
when using components from libraries defined in this workspace. It is NOT a 
general purpose testing library that will work for every app since it relies on
the customized structure of components defined in this workspace. There are 
already general purpose testing libraries available (I leave it up to you to 
find and determine which one is best for your purposes should you decide to use
a different library), but I decided to create my own for this workspace since I
felt it gave me more leeway in how I wanted to structure my tests.

### Library Structure

This library was created based on principles described in the following article
[https://martinfowler.com/bliki/PageObject.html](https://martinfowler.com/bliki/PageObject.html)
with some slight modifications. The article describes everything as a "page",
whereas I define significant elements as PageElements. Siginificant elements
can be simple things like a button, form field, checkbox, but they can also be
more complicated things like a form (with form fields), paged table, etc. As 
such PageElements can be made up of other PageElements (i.e. a paged table 
consists of a table and paginator elements). Following from this, Pages can be
made up of multiple PageElements.

Each PageElement contains useful methods and properties for that particular
element. For example, the ButtonElement contains a `click()` method which
clicks the button and waits for the fixture to be stable. So you can write the
following code in your tests:

```typescript
await button.click();
// test for whatever results you are expecting after button click
```

instead of having to write the following:

```typescript
button.click();
fixture.detectChanges();
await fixture.whenStable();
// test for whatever results you are expecting after button click
```

While this is a simple example, it can get very repetitive and tedious to write
`fixture.detectChanges()` and `await fixture.whenStable()` every time you need
to write tests that click a button. It also helps to make reading tests easier,
since anyone can look at the first block of code above and understand what is
happening without the need or clutter of boilerplate code. Take a look at the
API documentation to see the full list of PageElements and the capabilities I
have included for each.

> NOTE: I've tried to come up with as many general purpose PageElements as I could. I
> may add more if/when I come up with any additional PageElements.

## Getting Started

Since this library was developed for this workspace it does rely on the base-json
library for it's mocks and features. As such you will need to make sure that you
install the base-json library when you install this one.

### Install the Library

To install the library run the following command:

```
npm install @ngx-material-dashboard/base-json @ngx-material-dashboard/testing
```

This will install the base-json library, which is a required dependency and
this library.

## Usage

This library can be used to write tests for classes and services derived from
the base-json, json, or json-api libraries included in the workspace. It can
also be used to write tests for any angular components that utilize components
defined in the widgets library. In some cases you might be able to use some of
the PageElements to write tests for your own components that do not use any
components defined in the widgets library (that is simple elements like the
button or checkbox), but you will most likely not be able to use some of the
more complex PageElements like the PagedTable or PagedTableWithToolbar IF you
are not utilizing the widgets library for those components.

> NOTE: If you are not using the widgets library DO NOT submit issues with the
> complex PageElements I have defined since they rely on the structure of the
> components defined in the widgets library. Unless this library becomes widely
> popular by some chance and there is a huge demand for this to be a general
> purpose testing library, then I will not address these issues.

### Mock Objects and Fixtures

The library includes several mock classes and fixtures that you may use when
writing karma tests or creating sandboxes for your angularplayground.it. The
`dummy-object.mock.ts` class defines a simple model class that extends the
base-json JsonModel class. While the `dummy-object.fixture.ts` class generates
some dummy data based on the `DummyObject` class that can be used in your tests.

### PageElements and PageObjects

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
// other imports...
import { PagedTableElement, TEST_DATA } from '@ngx-material-dashboard/testing'
import { ExamplePagedTableComponent } from './example-paged-table.component'

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

## Contributing

See [Contributing](../../CONTRIBUTING.md)

## Running unit tests

Run `ng test testing` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Built With

This library was generated with [Angular CLI](https://github.com/angular/angular-cli)
version 13.1.0.

## Authors

* **[jphillips]** - (https://github.com/jphillips03)
