# NgxMaterialDashboard

The NgxMaterialDashboard is an Angular workspace that contains multiple inter-dependent libraries. The [widgets](widgets) library defines components built on top of Angular Material to provide additional functionality, including basic CRUD capabilities with minimal code. The JSON service libraries ([base-json](base-json), [json](json), and [json-api](json-api) are designed to make interfacing with JSON APIs easy, and allow you to work with classes and services instead of HttpClient and JSON directly. The [testing](testing) library is designed to simplify writing tests for the `widgets` libraries using Page element objects that eliminate the need for a lot of boilerplate set up so you can focus on the tests themselves.

You can use the JSON service libraries without the `widgets` or `testing` libraries, however the `widgets` library requires the `base-json` and either the `json`, `json-api`, or your own custom library extending the `base-json` in order to provide basic CRUD capabilities. The `base-json` library defines the basic API to handle CRUD operations and is designed to be extended to handle most (if not all) kinds of JSON formats by allowing you to define how to structure your JSON data and how to (des)serialize it. The `json` and `json-api` libraries are examples of libraries that extend the `base-json` for different types of JSON, and should provide a basis for you to create your own custom JSON library if neither library work for your applications. The `testing` library is not required with the `widgets` library, but I find it useful when writing karma tests for any components that utilize the `widgets` library (and thought others might too).

## Libraries

Click on the corresponding links below to see more details about each library.

1. [base-json](base-json) - base library for interfacing with RESTful JSON API from Angular
2. [json](json) - customized library using base-json to interface with basic JSON API
3. [json-api](json-api) - customized library using base-json to interface with JSON API that uses [json:api spec](https://jsonapi.org)
4. [testing](testing) - library with helper classes for testing Angular components
5. [widgets](widgets) - library built on top of  [Angular Material](https://material.angular.io) with various widgets that can be used in a dashboard layout

## Playground Project

I have included [angularplayground.it](https://angularplayground.it) with sandboxes for developing library components in isolation. The playground is probably the best source for examples of how to use the components defined in the widgets library, and it allows you to see the components in action. I have tried to provide examples in the documentation, along with the API documentation, but I know I have quite a ways to go with making sure everything is fully covered and up to date. I did go through a pretty extensive refactor recently, and I haven't caught up with making sure all of the examples have been updated with the latest code. As such if you are running into any issues with the examples as they are, be sure to check if the playground has a more updated and working example.

Since it requires a main application I added a `playground` directory with minimum files needed for a main application for `angularplayground`, and linked the widgets library so sandboxes can be created from components there. After you have cloned the workspace and installed the required `node_modules`, you can run the playground with the following command:

```bash
npm run playground
```

Once started you can access the playground at `http://localhost:4201/`.

## Documentation

I spent a lot of time developing the documentation, so I figured I might mention a little about it here. All documentation is auto generated as markdown from comments in the code, and added to the `documentation` project (along with routes and configuration data) using a series of custom tools I developed specifically for this workspace. The only parts of the documentation that do not come from the comments are the landing page, this workspace overview page, and the main overview pages displayed for each library.

I know there are tools that automate the documentation process already like [typedoc](https://typedoc.org/), but I wasn't happy with how that laid out the documentation particularly for Angular projects (I do actually use typedoc when generating the docs here, but just the JSON output). I really like how the Angular Material documentation is laid out, however there is limited (to no info) on how that documentation is rendered. So I decided to create my own tools to make a project similar to the Angular Material documentation. I also added a workflow in the repository to build and deploy the latest documentation app in github pages when commits are added to the main branch. All this so I don't have to do anything to make sure the libs are fully documented other than keep comments, overview details, and examples up to date in the code base (which is hard enough as it is...).

Continue on if you want to know how I created this documentation. It's been quite a journey, so I wanted to include some details in case it helps anyone else improve their own documentation.

### Documentation Project

The `documentation` project is based on the example provided with the [ngx-markdown](https://www.npmjs.com/package/ngx-markdown) library, which is a good base for creating an application that renders documentation from markdown files very similar to the Angular Material documentation. It is not an exact match though, so I did have to come up with a custom layout in order to include the sidenav (which actually uses the sidenav I created for the `widgets` library). I also had to update how the page content navigator on the right hand side of the page is initialized based on how I structured my markdown files.

Additionally I built in capabilities to render multiple markdown files in a given order for any given route. This also includes the ability to render tabbed views of markdown files at any point in that order. The tabbed views are mainly for rendering code examples (specifically components) that have both `HTML` and `Typescript` included in the example, similar to how Angular Material renders their code examples on tabs. As such the project itself doesn't include too many components, just a lot of auto generated routes and map of routes to markdown files to render for those routes, as well as auto generated sidenav items.

One thing that is missing from the tabbed views are live examples like the ones included in the Angular Material documentation. It would be awesome to include that feature, but I just don't have the time to add that capability right now. Hopefully the static example code I have included in the `overview` pages is enough to get people started with using these libraries.

### Tools

There is a `tools` directory at the root of the source code for the `ngx-material-dashboard` workspace which includes all the code I am using to automate the documentation process. I'm not going to go through the code itself, but I will give a general overview of what the code is doing. I created a custom version of the [typedoc-json-parser](https://www.npmjs.com/package/typedoc-json-parser) library to parse JSON from `typedoc` and use that to generate markdown files for overview, API, and example details using [handlebars](https://handlebarsjs.com/). Once the markdown files are generated I create routes based on the markdown files created, a map of routes to markdown files (used as configuration data for the `documentation` app to render the appropriate markdown files at any given route), and sidenav items for all classes included in each of the libraries.

Additionally I came up with a way to share markdown files between routes, reducing the need to repeat content. One drawback is there can be multiple requests to load markdown files from a single route, potentially slowing down page load time, however the markdown is fairly small (especially shared files), so it should be a relatively small slow down.

> NOTE: Don't expect to be able to use these tools as they are because they are geared to the structure of the libraries included in this workspace and the format of the documentation I included in the code. You might be able to customize them for your own project, but that is outside the scope of this project and documentation. I would really like to come up with a generalized approach for generating documentation for any Angular project, but I haven't gotten there yet. Perhaps the combination of the `tools` and `documentation` project could form the basis for that, although I admit there would be a long way to go to completely generalize them to work with any project.

## Sample Project

I intend to add a sample project that shows how to utilize the json and widgets libraries. Stay tuned...

## Contributing

See [Contributing](https://github.com/ngx-material-dashboard/ngx-material-dashboard/CONTRIBUTING.md)

## Running unit tests

To run all unit tests in the workspace you can run

```bash
npm test
```

This will run unit tests for all libraries/projects in the workspace without watching for changes in the libraries (i.e. no re-runs of tests if you make any code changes). If you are developing for one or more of the libraries and you want to run tests with `--watch` enabled, then I suggest using the `ng test` command with the corresponding library name (i.e. `ng test base-json`).

## Built With

This workspace was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.0.

## Authors

* **[jphillips]** - (https://github.com/jphillips03)
