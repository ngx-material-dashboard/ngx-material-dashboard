# NgxMaterialDashboard

The NgxMaterialDashboard is an Angular workspace that contains multiple inter-dependent libraries. The [widgets](widgets) library defines components built on top of Angular Material to provide additional functionality, including basic CRUD capabilities, with minimal code while adhering to Material design principles. The JSON service libraries ([base-json](base-json), [json](json), and [json-api](json-api)) are designed to make interfacing with JSON APIs easy, and allow you to work with classes and services instead of HttpClient and JSON directly. The [testing](testing) library is designed to simplify writing tests for the [widgets](widgets) libraries using Page element objects that eliminate the need for a lot of boilerplate set up so you can focus on the tests themselves. 

You can use the JSON service libraries without the [widgets](widgets) or [testing](testing) libraries, however the [widgets](widgets) library requires the [base-json](base-json) and either the [json](json), [json-api](json-api), or your own custom library extending the [base-json](base-json) in order to provide basic CRUD capabilities. The [base-json](base-json) library provides the necessary interfaces to handle CRUD operations and should be capable of being extended to handle most (if not all) kinds of JSON formats by defining how the JSON data is structured and how to serialize and deserialize it. The [json](json) and [json-api](json-api) libraries are examples of libraries that extend the [base-json](library) for different types of JSON, and should provide a basis for your to create your own custom JSON library if neither the [json](json) nor the [json-api](json-api) libraries work for your applications. The [testing](testing) library is not required with the [widgets](widgets) library, but it does help when writing karma tests for any components that utilize the [widgets](widgets) library.

## Libraries

Click on the corresponding links below to see more details about each library.

1. [base-json](base-json) - base library for interfacing with RESTful JSON API from Angular
2. [json](json) - customized library using base-json to interface with general JSON API
3. [json-api](json-api) - customized library using base-json to interface with JSON API that uses [json:api spec](https://jsonapi.org)
4. [testing](testing) - library with helper classes for testing Angular components
5. [widgets](widgets) - library built on top of  [Angular Material](https://material.angular.io) with various widgets that can be used in a dashboard layout

## Playground Project

I have included [angularplayground.it](https://angularplayground.it) with sandboxes for developing library components in isolation. Since it requires a main application I added a `playground` directory with minimum files needed for a main application for `angularplayground`, and linked the widgets library so sandboxes can be created from components there. After you have cloned the workspace and installed the required `node_modules`, you can run the playground with the following command:

```bash
npm run playground
```

## Sample Project

I intend to add a sample project that shows how to utilize the json and widgets libraries. Stay tuned...

## Contributing

See [Contributing](CONTRIBUTING.md)

## Running unit tests

To run all unit tests in the workspace you can run

```bash
npm test
```

This will run unit tests for all libraries/projects in the workspace without watching for changes in the libraries (i.e. no re-runs of tests if you make any code changes). If you are developing for one or more of the libraries and you want to run tests with `--watch` enabled, then I suggest using the `ng test` command with the corresponding library name (i.e. `ng test base-json`).

## Authors

* **[Jonathan Phillips]** - (https://github.com/Jonathan-S-Phillips)
