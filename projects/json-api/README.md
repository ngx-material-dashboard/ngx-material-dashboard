# JsonApi

The JsonApi library is meant to use the json:api specification as defined at
https://jsonapi.org/ for server side API calls and is basically a forked version
of https://github.com/ghidoz/angular2-jsonapi, but it has been updated to work
with the latest version of Angular (currently 13). The linked library does not
seem to be actively maintained anymore, but I really like the library and wanted
to continue to use it with the latest version of Angular.

I did have to make some changes to get the library to work with the latest version
of Angular. Most changes were minor, but the biggest change I had to make was 
removing hasDirtyAttributes and rollback capabilities due to some issues I ran
into testing the library. So far this has not been a real issue for me since
objects are still updated (they just include all attributes when doing so), and I
haven't really worked on an app that required the ability to rollback attribute
changes. I do hope to fix these issues at some point, but that is currently a
low priority item for me.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.0.

## Code scaffolding

Run `ng generate component component-name --project JsonApi` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project JsonApi`.
> Note: Don't forget to add `--project JsonApi` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build JsonApi` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build JsonApi`, go to the dist folder `cd dist/json-api` and run `npm publish`.

## Running unit tests

Run `ng test JsonApi` to execute the unit tests via [Karma](https://karma-runner.github.io).
> Note: The library is required to target es5 for testing and includes this in
> tsconfig.spec.json due to circular dependencies between some of test data
> included in original [angular2-jsonapi](https://github.com/ghidoz/angular2-jsonapi)
> library.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
