## Introduction

The widgets library contains components built on top of the Angular Material
library. The Angular Material library is amazing, but there are some things
I continually found myself doing over and over again in my applications while
working with the library. This library is the result of me trying to simplify
certain tasks and functionality (i.e. make developing applications easier),
and to DRY up my client side code bases across all of my projects in the
seemingly endless struggle to be the best developer I can be.

## Features

There are currently 9 modules defined in this library. The alert module provides a bootstrap style alert message. The collection, grid, list, and table modules are for managing collections (paged or not). The dialog, layout, and toolbar modules define overall layout features. While the form module provides features useful for managing forms, including validation and error messages. You can explore each of the modules and their respective components, directives, etc. using the sidenav to the left. I also include some details on the modules below.

This library does provide some basic CRUD capabilities, and as a result I do need to have a consitent way to manage data. So this library depends on the [base-json](./base-json) library for interfacing with JSON API servers. I recommend that you take a look at that library to see if that will work for your project before you dig too deep into this library.

### Alerts

The alerts module provides Bootstrap style alerts, allowing for multiple alerts to be rendered at a time. I thought you said this was an Angular Material library? It is... for the most part. I know this goes against material design principles allowing multiple alerts on the page, and using something other than the snack-bar notifications, BUT... there have been times where I've needed to render multiple messages to a user, and the snack-bar just doesn't cut it. So I created my own Bootstrap style alert messages.

### Collections

The bulk of the components in this library center around collections (mainly paged collections, but they don't have to be). There are great examples of working with paged tables in the Angular Material documentation, but tables aren't the only things that can be paged. Things like grids and lists can be paged as well. While I do provide paged grids, lists, and tables, I use basic (i.e. not paged) collections as the base for these collections; and make these available for consumption in the public library.

> NOTE: There are probably other things that can be paged that I can't think of right now (if I do I will add those and their corresponding components as well).

The [collections](/widgets/collection) module defines the most basic components/directives for managing collections. None of the components defined in this module actually include templates. As such you should not be using this module directly, and instead should use either the grid, list, or table modules. These modules extend the basic functionality defined for the collection module and provide templates for rendering their respective type of collection. Check out the [grid](/widgets/grid), [list](/widgets/list), and [table](/widgets/table) modules for more details.

### Layout Features

The layout module defines most of the components necessary for a basic layout of an application. I have included a [DefaultLayoutComponent](/widgets/layout/overview#default-layout-component) which defines a typical layout with header, footer, sidenav, and main content areas. The documentation actually utilizes the sidenav from this library, so you can see one of the components in action.

The toolbar module defines various toolbars, mostly for use with collections to provide buttons, paging, and sorting capabilities. The dialog module currently only provides a dialog to confirm deleting things from collections.

### Forms Module

The forms module provides things I found useful for all forms I've worked with, and has really helped reduce the amount of repeated validation/error handling and template details in my apps. I also define a generic structure for defining validation messages that I think can be used for just about any form and validation type. See the [ValidationMessages](/widgets/form/overview#validation-messages) for more details.

## Getting Started

### Install the Library

To install the library run the following command:

```
npm install @ngx-material-dashboard/base-json @ngx-material-dashboard/widgets
```

This will install the base-json library, which is a required dependency and
this library.

You may also want to install the [testing](./testing)
library I created in conjunction with this one. It includes classes you can use that
will help writing karma tests in your application. Follow the included link to read
more about that library. Command to install testing library included below for convenience.

```bash
npm install @ngx-material-dashboard/testing
```

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

## Theming

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

## Icons

Some components (i.e. Sidenav, Toolbar) have optional icons you can define for their respective SidenavItem or ToolbarButton. You may use [angular-fontawesome](https://www.npmjs.com/package/@fortawesome/angular-fontawesome) or mat-icons for the icon property when defining each of these. If you want to render a fontawesome icon, then you should use a value of type IconDefinition from the angular-fontawesome library. Otherwise you may use the name of the icon in string format for rendering a mat-icon (the same string you would use if you were rendering a mat-icon directly in your component).

Some components in this library utilize icons from the [angular-fontawesome](https://www.npmjs.com/package/@fortawesome/angular-fontawesome) library, so this is a peer dependency you'll need to include in your project.

## Contributing

See [Contributing](https://github.com/ngx-material-dashboard/ngx-material-dashboard/CONTRIBUTING.md)


## Running unit tests

Run `ng test widgets` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Built With

This library was generated with [Angular CLI](https://github.com/angular/angular-cli)
version 13.1.0.

## Authors

* **[jphillips]** - (https://github.com/jphillips03)
