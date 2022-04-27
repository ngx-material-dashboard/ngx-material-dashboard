# Json

The Json library is meant to help define objects and services needed for
interacting with server side JSON API endpoints. The JSON for these
endpoints can have any structure (i.e. it does not follow the
[json:api](https://jsonapi.org/) specification). It provides a generic way for
handling basic CRUD operations with your server side API.

While I have tried to make this library as generic as possible there are a few
assumptions I have had to make with regard to the structure of your server side
API. The most basic of which is that each endpoint in your API corresponds with
a specific entity and you operate on them using GET, POST, PUT, and DELETE 
request types. So if you have a Task entity you would have something like the
following endpoints defined:

    GET     /tasks          For querying and paging through list of tasks
    GET     /tasks/:id      For returning details for task with given id
    POST    /tasks/         For creating a new task
    PUT     /tasks/:id      For updating task with given id
    DELETE  /tasks/:id      For deleting task with given id

The code is based on code from the json-api library and strives to work in a
similar way so widgets can utilize either type of data handler (depending on
your server side API capabilities). It has been modified significantly as this
library does not utilize a lot of the features available from the json-api
library.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.0.

## Code scaffolding

Run `ng generate component component-name --project json` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project json`.
> Note: Don't forget to add `--project json` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build json` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build json`, go to the dist folder `cd dist/json` and run `npm publish`.

## Running unit tests

Run `ng test json` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
