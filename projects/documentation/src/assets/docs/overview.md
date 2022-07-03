# NgxMaterialDashboard

The NgxMaterialDashboard is an Angular workspace with multiple libraries. The main library with angular components designed to help create dashboards with some basic CRUD capabilities is the [widgets](widgets) library. This library depends on the [base-json](base-json) library which is a library for interfacing with RESTful JSON APIs (which provides the necessary interfaces to handle CRUD operations), and either the [json](json), [json-api](json-api), or your own custom library extending the base-json library that defines how the JSON data is structured and how to serialize and deserialize it.

I have included [angularplayground.it](https://angularplayground.it) with sandboxes so you can see some examples for how to use components from the widgets library. I also intend to add an example project that demonstrates how to use the libraries defined in this workspace. Stay tuned for that... 

## Libraries

Click on the corresponding links below to see more details about each library.

1. [base-json](base-json) - base library for interfacing with RESTful JSON API from Angular
2. [json](json) - customized library using base-json to interface with general JSON API
3. [json-api](json-api) - customized library using base-json to interface with JSON API that uses [json:api spec](https://jsonapi.org)
4. [testing](testing) - library with helper classes for testing Angular components
5. [widgets](widgets) - library built on top of  [Angular Material](https://material.angular.io) with various widgets that can be used in a dashboard layout

## Playground Project

I have included [angularplayground.it](https://angularplayground.it) with sandboxes for developing library components in isolation. Since it requires a main application I added a `playground` directory with minimum files needed for a main application for `angularplayground`, and linked the widgets library so sandboxes can be created from components there. To run the playground just run the following:

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
