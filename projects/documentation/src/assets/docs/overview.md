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

## Documentation

The documentation is all generated from comments in the code itself, and automatically combined into the `documentation` project which is used to render the documentation as you see it here. The only parts of the documentation that do not come from the comments are the landing page, this workspace overview page, and the main overview pages displayed for each library. I decided to go with an automated approach because I wanted to make documentation as easy as possible, and because I didn't want to have to maintain documentation and comments in multiple places (in both the source code and some outside documentation project).

I know there are tools that automate the documentation process already like [typedoc](https://typedoc.org/), but I wasn't happy with how that laid out the documentation (particularly for Angular projects). I also really like how the Angular Material documentation is laid out, however there is limited (to no info) on how that documentation is rendered. So I begrudingly decided to create my own tools to make a project similar to the Angular Material documentation.

Continue on if you want to know how I created this documentation. It's been quite a journey, so I thought I might write it down in case it helps anyone else improve their own documentation.

### Tools

There is a `tools` directory at the root of the source code for the `ngx-material-dashboard` workspace which includes all the code I am using to automate the documentation process. I'm not going to go through the code itself, but I will give a general overview of what the code is doing. I am using `typedoc` to generate JSON from comments included in the code, and I am parsing that JSON into a set of objects I can use to generate markdown files with [handlebars](https://handlebarsjs.com/). The objects I created make it easier for me to organize the comments from the code (as opposed to working with the JSON directly). They also make it easier to auto generate routes and sidenav items for the `documentation` project based on what was included in `typedoc` comments. I did not want to manually manage routes and sidenav items because there are a lot of those to get right.

I was also able to use the objects I created from the `typedoc` JSON output along with the markdown output to have control over how markdown is rendered at any route. This allows me to have shared bits of markdown to render in various places without having to repeat the content of that markdown. One drawback is there can be multiple requests to load markdown files from a single route, potentially slowing down page load time, however the markdown is fairly small (especially shared files), so it should be a relatively small slow down.

> NOTE: Don't expect to be able to use these tools as they are because they are geared to the structure of the libraries included in this workspace and the format of the documentation I included in the code. You might be able to customize them for your own project, but that is outside the scope of this project and documentation. I would really like to come up with a generalized approach for generating documentation for any Angular project, but I haven't gotten there yet. Perhaps the combination of the `tools` and `documentation` project could form the basis for that, although I admit there would be a long way to go to completely generalize them to work with any project.

### Documentation Project

The `documentation` project is based off of the example provided with the [ngx-markdown](https://www.npmjs.com/package/ngx-markdown) library. The example project provides a good base for creating an application that renders documentation very similar to the Angular Material documentation. It is not exact though, so I did have to come up with a custom layout in order to include the sidenav (which actually uses the sidenav defined in the `widgets` library). I also had to update how the page content navigator on the right hand side of the page is initialized (from the `ngx-markdown` example) based on how I structured my markdown files.

Additionally I built in capabilities to render multiple markdown files in a given order for any given route. This also includes the ability to render tabbed views of markdown files at any point in that order. The tabbed views are mainly for rendering code examples (specifically components) that have both `HTML` and `Typescript` included in the example, similar to how Angular Material renders their code examples on tabs.

One thing that is missing from the tabbed views are live examples like the ones included in the Angular Material documentation. It would be awesome to include that feature, but I just don't have the time to add that capability right now. Hopefully the static example code I have included in the `overview` pages is enough to get people started with using these libraries.

## Authors

* **[Jonathan Phillips]** - (https://github.com/Jonathan-S-Phillips)
