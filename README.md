# NgxMaterialDashboard

The NgxMaterialDashboard is an Angular workspace that contains several libraries
and an example project that demonstrates how to use those libraries (example
project to be added...).

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

## Sample Project

I intend to add a sample project that shows how to utilize the above libraries.
Stay tuned...

## Contributing

Currently I am the only developer contributing to this project, and since this
is my first open source project I do not have any specific guidelines for how
to contribute. If you want to add something you feel might be useful, then open
an issue and we can discuss how to go about doing that. The only thing I really
request right now is that you write good clean code and that you include unit
tests to ensure your code works as expected.

> NOTE: see my [disclaimer](#disclaimer) below about submitting bugs/issues.

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

## Disclaimer

This project is provided as is. I do hope to actively maintain and add to it as
I have time, but I am the only person working on it and I do have a full time
job that does not involve developing this project. So with that in mind, please
be aware that if you submit any bugs/issues for this project or any library
within, I most likely will not get to them in any sort of timely manner.
