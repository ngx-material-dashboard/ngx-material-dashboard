# Widgets

## Table of Contents

* [Introduction](#introduction)
* [Getting Started](#getting-started)
    * [Install the Library](#install-the-library)
    * [Configuration](#configuration)
* [Usage](#usage)
* [Contributing](#contributing)
* [Running Unit Tests](#running-unit-tests)
* [Built With](#built-with)
* [Authors](#authors)

## Introduction

The widgets library contains components built on top of the
[Angular Material](https://material.angular.io/) library. The Angular Material
library is amazing, but there are some things I continually found myself doing
over and over again in my applications while working with the library. This
library is the result of me trying to simplify certain tasks and functionality
(i.e. make developing applications easier), and to DRY up my client side code
bases across all of my projects in the seemingly endless struggle to be the
best developer I can be.

This library does provide some basic CRUD capabilities, and as a result I do
need to have a consitent way to manage data. So this library depends on the
[base-json](projects/base-json) library for interfacing with JSON API servers.
I recommend that you take a look at that library to see if that will work for
your project before you dig too deep into this library.

## Getting Started

### Install the Library

To install the library run the following command:

```
npm install @ngx-material-dashboard/base-json @ngx-material-dashboard/widgets
```

This will install the base-json library, which is a required dependency and
this library.

You may also want to install the [testing](projects/testing) library I created
in conjunction with this one. It includes classes you can use that will help
writing karma tests in your application. Follow the included link to read more
about that and find installation instructions.

### Configuration

To utilize the widgets in this library you will need to import the modules where
those components are found into your application. This works just like importing
any other module you use from other libraries. So if you are going to use any of
the components defined in the TableModule, then you should have the following
import in your application module (or wherever you intend to use the components):

```typescript
import { TableModule } from '@ngx-material-dashboard/widgets';

@NgModule({
    // declarations...
    imports: [
        // other imports...
        TableModule
    ]
    // anything else...
})
export class SomeModule {}
```

### Theming

I have provided a simple mixin for you to set the color palette of the sidenav
if you choose to use the `LayoutModule`, which provides a basic dashboard
interface with header, footer, and sidenav. Since the library is built on top
of Angular Material you can use any pre-built or custom color palettes that
you create. To use the mixin you must be using `SCSS` for your styles. If you
are using a custom theme, then you might consider calling this mixin where you
define that theme, so you have access to the custom color palette(s) you intend
to use with your application. You may use the mixin as follows:

```scss
@import '@ngx-material-dashboard/widgets/sidenav-theming'; // import the mixin

$app-primary: mat-palette($app-black); // define custom primary color palette
@include sidenav-theme($app-primary); // use custom or any built in palette i.e. '$mat-blue'
```

Since you can set the color by palette, you are free to use any palette you want
to use from your theme. Buttons rendered in widgets from this library should use
the `primary` color from your theme.

## Usage

## Paged Components

One of the biggest things I found myself repeating was creating components that
work with paged data sets. There are great examples of working with paged
tables in the Angular Material documentation, but in projects that manage lots
of different types of table data I used to duplicate a lot of code and
functionality creating paged table components for each type of data object I
had. Additionally, there are only examples of paging tables of data, but there
are other things that can be paged as well. This includes lists and grids, and
probably other things I can't think of right now (if I do I will add those and
their corresponding components).

### PagedTableComponent

The `PagedTableComponent` defines all of the HTML and code needed to render and
use a `MatTable` and corresponding `Paginator` with both local and remote data
sources. To use this component you only need to define a few basic configuration
options in your Typescript and the columns for your table in your template (as
you would if you were creating a MatTable). Below is a sample HTML template that
shows you how to use the `PagedTableComponent`.

```html
<ngx-material-dashboard-paged-table matSort [buttons]="buttons" [data]="data" [displayedColumns]="displayedColumns" [multiple]="multiple" class="marker-paged-table">
    <ng-container matColumnDef="id">
        <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
        <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef mat-sort-header>Name</mat-header-cell>
        <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.name}}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="noData">
        <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
            No data found
        </mat-footer-cell>
    </ng-container>
</ngx-material-dashboard-paged-table>
```

And below is the corresponding Typescript class.

```typescript
@Component({
    template: `
    <ngx-material-dashboard-paged-table matSort [buttons]="buttons" [data]="data" [displayedColumns]="displayedColumns" [multiple]="multiple" class="marker-paged-table">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
            <mat-cell class="col1-cell" *matCellDef="let obj">{{obj.id}}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="noData">
            <mat-footer-cell *matFooterCellDef colspan="displayedColumns.length" fxLayoutAlign="center center">
                No data found
            </mat-footer-cell>
        </ng-container>
    </ngx-material-dashboard-paged-table>
    `
}) class TestPagedTableComponent {
    @ViewChild(PagedTableComponent) table!: PagedTableComponent<DummyObject>;
    buttons: TableButton[] = [EDIT_BUTTON, DELETE_BUTTON];
    data: JsonModel[] = [];
    displayedColumns: string[] = ['select', 'id', 'actions'];
    multiple = true;
}
```

## Contributing

See [Contributing](../../CONTRIBUTING.md)

## Running unit tests

Run `ng test testing` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Built With

This library was generated with [Angular CLI](https://github.com/angular/angular-cli)
version 13.1.0.

## Authors

* **[Jonathan Phillips]** - (https://github.com/Jonathan-S-Phillips)
