## Introduction

The widgets library contains components built on top of the Angular Material
library. The Angular Material library is amazing, but there are some things
I continually found myself doing over and over again in my applications while
working with the library. This library is the result of me trying to simplify
certain tasks and functionality (i.e. make developing applications easier),
and to DRY up my client side code bases across all of my projects in the
seemingly endless struggle to be the best developer I can be.

This library does provide some basic CRUD capabilities, and as a result I do
need to have a consitent way to manage data. So this library depends on the
[base-json](./base-json) library for interfacing with JSON API servers.
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

You may also want to install the [testing](./testing)
library I created in conjunction with this one. It includes classes you can use that
will help writing karma tests in your application. Follow the included link to read
more about that and find installation instructions.

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

Some components in this library utilize icons from the
[angular-fontawesome](https://www.npmjs.com/package/@fortawesome/angular-fontawesome)
library. There are some icons that are included, for things like create, edit,
and delete buttons that appear in the table and table with toolbar components.
You can create your own buttons and configure those buttons with any icon you
want from the angular-fontawesome library, but it must be an icon from the
angular-fontawesome library.

I've been working with fontawesome icons long before I started working with
Angular, so when I made the move to Angular I kept using fontawesome since the
angular-fontawesome library was available. As I write this and think about it I
suppose I could update the components to allow for a choice between Angular
Material icons (since I am already utilizing that library) and
angular-fontawesome icons. But that would be a low priority for me unless there
was a lot of interest in this feature. At this time there is no issue created
for this, but if one is created then people can chime in and I could potentially
be convinced to add this capability in if there is enough support for it.

## Contributing

See [Contributing](https://github.com/ngx-material-dashboard/ngx-material-dashboard/CONTRIBUTING.md)


## Running unit tests

Run `ng test widgets` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Built With

This library was generated with [Angular CLI](https://github.com/angular/angular-cli)
version 13.1.0.

## Authors

* **[Jonathan Phillips]** - (https://github.com/Jonathan-S-Phillips)
