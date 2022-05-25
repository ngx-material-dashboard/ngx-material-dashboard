# NgxMaterialDashboard

The NgxMaterialDashboard is an Angular workspace that contains several libraries
and an example project that demonstrates how to use those libraries (example
project to be added...). I have also included
[angularplayground.it](https://angularplayground.it/) with sandboxes so you can
see some examples for how to use components in the widgets library.

## Libraries

Click on the corresponding links below to see more details about each library.

1. [base-json](projects/base-json/) - base library for interfacing with RESTful
JSON API from Angular
2. [json](projects/json/) - customized library using base-json to interface with
general JSON API
3. [json-api](projects/json-api/) - customized library using base-json to
interface with JSON API that uses [json:api spec](https://jsonapi.org/)
4. [testing](projects/testing/) - library with helper classes for testing Angular
components
5. [widgets](projects/widgets/) - library built on top of 
[Angular Material](https://material.angular.io/) with various widgets that can be
used in a dashboard layout

## Playground Project

I have included [angularplayground.it](https://angularplayground.it/) with
sandboxes for developing library components in isolation. Since it requires a
main application I added a `playground` directory with minimum files needed
for a main application for `angularplayground`, and linked the widgets library
so sandboxes can be created from components there. To run the playground just
run the following:

```bash
npm run playground
```

## Sample Project

I intend to add a sample project that shows how to utilize the json and widgets
libraries. Stay tuned...

## Contributing

See [Contributing](CONTRIBUTING.md)

## Running unit tests

To run all unit tests in the workspace you can run

```bash
npm test
```

This will run unit tests for all libraries/projects in the workspace without
watching for changes in the libraries (i.e. no re-runs of tests if you make any
code changes). If you are developing for one or more of the libraries and you
want to run tests with `--watch` enabled, then I suggest using the `ng test`
command with the corresponding library name (i.e. `ng test base-json`).

## Authors

* **[Jonathan Phillips]** - (https://github.com/Jonathan-S-Phillips)
