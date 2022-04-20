# Testing

The Testing library is meant to make testing components and angular apps easier
when using components from libraries defined in this workspace. It is NOT a 
general purpose testing library that will work for every app since it relies on
the customized structure of components defined in this workspace. There are 
already general purpose testing libraries available (I leave it up to you to 
find and determine which one is best for your purposes should you decide to use
a different library), but I decided to create my own for this workspace since I
felt it gave me more leeway in how I wanted to structure my tests. Also I have
not found any testing libraries for use with protractor for e2e tests (although
I admit I did not look very hard), and I wanted to use the same structures and
principles defined for karma tests. If there is enough interest AND I have time
I may be convinced to try to turn this into a more general purpose library.

## Library Structure

This library was created based on principles described in the following article
[https://martinfowler.com/bliki/PageObject.html](https://martinfowler.com/bliki/PageObject.html)
with some slight modifications. The article describes everything as a "page",
whereas I define significant elements as PageElements. Siginificant elements
can be simple things like a button, form field, checkbox, but they can also be
more complicated things like a form (with form fields), paged table, etc. As 
such PageElements can be made up of other PageElements (i.e. a paged table 
consists of a table and paginator elements). Following from this, Pages can be
made up of multiple PageElements.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli)
version 13.1.0.

## Code scaffolding

Run `ng generate component component-name --project testing` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project testing`.
> Note: Don't forget to add `--project testing` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build testing` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build testing`, go to the dist folder `cd dist/testing` and run `npm publish`.

## Running unit tests

Run `ng test testing` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
