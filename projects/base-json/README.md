# base-json

## Introduction

The base-json library contains the most basic structures needed for developing
libraries to interface with a RESTful JSON API, allowing you to interact with
classes and models instead of dealing with JSON directly. It provides a mostly
generic way of defining your client side data models with decorators (i.e.
@Attribute, @JsonApiModelConfig), and corresponding abstract data service with
some reusable code implemented to handle CRUD operations.

The intent for this library is that it should be extended so you can define
how to serialize/deserialize your data, how your CRUD operations should work,
and how your data is structured. While it can be used on it's own it can also
be used in conjunction with reusable components and libraries like the widgets
library I created. The components defined in that library rely on certain API
actions, and need to have certain CRUD functions available for them to work as
expected, but they should not (and don't) care about how the JSON itself is
structured.

## Getting Started

### Install the Library

To install the library run the following command:

```
npm install @ngx-material-dashboard/base-json
```

### Configuration

In order for the library to work as expected you need to make sure you have the
following configuration included in your tsconfig.json:

```
{
    "compilerOptions": {
        ...
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
        ...
    }
}
```

> NOTE: without this configuration you will run into errors related to reading
> attribute metadata

## Using/Extending This Library

I have created 2 libraries that extend this one that are included in the
workspace defined for this library. They are the json and json-api libraries.
The json library relies on a general JSON structure that effectively turns an
object directly into JSON, while the json-api library follows the json:api
specification as defined at https://jsonapi.org/. If you are using either the
json or json-api library, then see the corresponding library for how to use
them since the majority of your interactions will come from those extending
libraries (aside from a few imports from this one i.e. property and class
decorators).

If neither the json or json-api library fit your specific data needs, then you
should be able to create your own library to extend this one. You may use the
existing libraries as a general guide for how to extend this one. The simplest
way to do that is to follow the code from the json library as this is a more
"basic" library compared to the json-api one. Looking at that library the only
classes you will need to create are a JSON model object and a JSON datastore
service. The model should at a minimum define a constructor that handles how to
initialize your data models using JSON data, and the datastore service should
provide implementations for the abstract functions defined in the JsonDatastore
service defined in this library as well as functions for extracting data from
HTTP requests.

## Background (how and why this Library was created)

The code for this library is mostly taken from the
[angular2-jsonapi](https://github.com/ghidoz/angular2-jsonapi) library, which
was specifically designed to follow the json:api spec, but this library has been
modified to allow for any type of JSON serialization/deserialization. The code
has also been updated to work with the latest version of Angular, currently 
version 13, because as of this writing it does not appear that the 
angular2-jsonapi is actively being supported and it is not compatible with the
latest version of Angular.

While I have tried to make this library as generic and extensible as possible,
there are a few assumptions that I had to make when creating it. Your API should
be structured so that each endpoint in your API corresponds with an entity or
model in your database, and you should be using common HTTP request methods. As
an example, if you have a Task model for your application you should have
something like the following endpoints defined in your API:

    GET     /tasks          For querying and paging through list of tasks
    GET     /tasks/:id      For returning details for task with given id
    POST    /tasks/         For creating a new task
    PUT     /tasks/:id      For updating task with given id
    DELETE  /tasks/:id      For deleting task with given id

Based on that I could write a single use data service for the Task model,
something like TaskService, which makes HTTP requests directly and handles
transforming the results into the client side data model. If I were only making
apps that relied on a single endpoint, then that would be fine, however there
real world apps typically have more than just a single API endpoint. It can
become very tedious and repetitive to write seperate services for each of your
API endpoints, simply replacing the data model/structure within each of your
services. So I decided to write this library in the effort to remove a lot of
duplicate code.

## Running unit tests

Run `ng test base-json` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Built With

This library was generated with [Angular CLI](https://github.com/angular/angular-cli)
version 13.1.0.

## Authors

* **[Jonathan Phillips]** - (https://github.com/Jonathan-S-Phillips)

## Disclaimer

This library is provided as is. I do hope to actively maintain and add to it as
I have time, but I am the only person working on this library and I do have a
full time job that does not involve developing this library. So with that in
mind, please be aware that I most likely will not get to fix any bugs or issues
you may find in any sort of timely manner.
