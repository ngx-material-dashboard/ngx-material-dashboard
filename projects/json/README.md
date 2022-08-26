# json

## Table of Contents

* [Introduction](#introduction)
* [JSON Format](#json-format)
* [Getting Started](#getting-started)
    * [Install the Library](#install-the-library)
    * [Configuration](#configuration)
* [Usage](#usage)
    * [Data Models](#data-models)
    * [Datastore](#datastore)
    * [CRUD Capabilities](#crud-capabilities)
        * [Create](#create)
        * [Save/Update](#saveupdate)
        * [Read](#read)
        * [Delete](#delete)
* [Custom Headers](#custom-headers)
* [Error Handling](#error-handling)
* [Contributing](#contributing)
* [Running Unit Tests](#running-unit-tests)
* [Built With](#built-with)
* [Authors](#authors)

## Introduction

The json library is built on top of the [base-json](projects/base-json/) library
and provides all the basic structures needed to interface with a RESTful JSON
API from your client side Angular applications. It allows you to define your
data model classes with decorators, and provides a single datastore service to
manage HTTP requests for handling CRUD operations for all of your data models
with your JSON API. This means you don't have to work with bare JSON, or work
directly with HTTP requests to your API.

There are a few assumptions I had to make about your server side API in order
to make this library work. Check the 
[Background](../base-json/README.md#background-how-and-why-this-library-came-to-be)
section in the base-json library for more information on the assumptions I made.
You can skip to the 3rd paragraph if you want to get right into the assumptions.

## JSON Format

The JSON generated and consumed by this library is pretty generic, and basically
converts objects directly into their JSON representation. So if you had the 
following simple data model class:

```typescript
@JsonApiModelConfig({
    type: 'tasks'
})
export class Task extends JsonModel {

    @Attribute() name?: string;
    @Attribute() description?: string;
    @Attribute({ serializedName: 'due_date' }) dueDate?: Date;
    @Attribute() dateCompleted?: Date;
    @Attribute() isComplete: boolean = false;
}
```

Then it would be converted to and from the following JSON for HTTP requests:

```json
{
    "name": "Task Title",
    "description": "Do a thing",
    "due_date": "2022-09-02",
    "dateCompleted": null,
    "isComplete": false
}
```

If your JSON API works with this type of JSON, then you can continue on to the
[Getting Started](#getting-started) section below to see how to use this 
library. If your JSON API follows the [json:api spec](https://jsonapi.org/),
then check out the [json-api](projects/json-api) library since that is designed
to work with that specification. If your JSON API does not follow either of
these structures, then fear not because you might still be able to utilize the
base-json library to define your own JSON structure. That is of course if your
API still follows the basic assumptions I lay out 
[here](../base-json/README.md#background-how-and-why-this-library-came-to-be).
There are details in that documentation to show how you can extend the bas-json
library for your own purposes.

## Getting Started

### Install the Library

To install the library run the following command:

```
npm install @ngx-material-dashboard/base-json @ngx-material-dashboard/json
```

This will install the base-json library, which is a required dependency and
this library.

### Configuration

In order for the library to work as expected you need to make sure you have the
`emitDecoratorMetadata` and `experimentalDecorators` options set to true. So
make sure your `tsconfig.json` has the following:

```json
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

## Usage

The following sections detail how to use this library. There are 2 main steps
you will need to take in order to do this.

1. Define/update your data models to extend the JsonModel defined in this library.
2. Define a simple datastore that extends the JsonDatastore service defined in
this library.

### Data Models

All data models you intend to use with this library should extend the base
JsonModel class defined in this library, and should include model configuration
and attribute decorators. The following is an example data model that you might
define in your angular app.

```typescript
import { Attribute, JsonApiModelConfig } from "@ngx-material-dashboard/base-json";
import { JsonModel } from '@ngx-material-dashboard/json'

@JsonApiModelConfig({
    type: 'tasks'
})
export class Task extends JsonModel {

    @Attribute() name?: string;
    @Attribute({ serializedName: 'due_date' }) dueDate?: Date;
}
```

The `JsonApiModelConfig` decorator is used to define the type of class along
with several other optional configurations. Type is the only required
configuration, and it is used when building the URL for HTTP requests to your
server side API (if it is the only configuration option used). The `Attribute`
decorator is used to define attributes to include when converting objects to
and from JSON. Any property that does not include an `Attribute` decorator will
not be included in JSON. You may include an optional `serializedName`
configuration if your JSON attribute(s) have different names from the ones you
define for your model classes (i.e. if you JSON uses snake_case, but your 
classes use camelCase).

### Datastore

The datastore you define is meant to provide configuration options required by
this library using the `JsonApiDatastoreConfig` decorator. The following is an
example datastore that you might define in your angular app.

```typescript
import { Injectable } from '@angular/core';
import { JsonApiDatastoreConfig } from '@ngx-material-dashboard/base-json';
import { JsonDatastore } from '@ngx-material-dashboard/json';

import { Task } from '@shared/models/task.model'; // assuming path defined in tsconfig.json

@Injectable()
@JsonApiDatastoreConfig({
    baseUrl: 'http://localhost:8080/api',
    models: {
        'tasks': Task
    }
})
export class JsonApiService extends JsonDatastore {}
```

The only thing that is really needed here is the configuration provided in the
`JsonApiDatastoreConfig` decorator. You must define a `baseUrl`, which is the
base URL used when the library makes HTTP requests to your server side API, and
you must also define `models`, which is a map of model types to model classes
for models that have endpoints in your JSON API. The service itself does not
need to include any code (unless you want to override any of the built-in
functionality).

### CRUD Capabilities

The following section provides details on how to use the library once you have
completed creating your data models and datastore. Notice that the service
includes the @Injectable() decorator, which means you can inject it into your
components like any other injectable service. Once you have an instance of the
datastore service defined in your client you can perform all basic CRUD
operations. See below for a break down of each operation.

> NOTE: All methods related to interfacing with your server side API return
> Observables, so don't forget to subscribe in order to make the necessary
> HTTP requests.

### Create

To create a new model you will need to call the createRecord method. The first
argument is the type of object you want to create, and the second argument is
a JSON object with attributes for the model you want to create.

```typescript
const data: Partial<Task> = { name: 'Create a task', ... };
const task: Task = this.jsonDatastore.createRecord(Task, data);
```

> NOTE: as stated above this will only create a new instance of a model and
> does not make any HTTP requests.

### Save/Update

Once you create a new instance of a model you can save it by calling save on
the model directly. If you call save() on a new model, the library will create
the necessary POST method when connecting to your server side API.

```typescript
task.save().subscribe((val: Task) => {
    // whatever you need to do after you save the value
});
```

You can also use the above code to update existing models through your server
side API. Calling save() on an existing model will create the necessary PATCH
request to update the model through your API. Internally the save method uses
the saveRecord method defined in the base datastore, and it is "smart" enough
to determine the appropriate HTTP request method to use based on whether the
model exists in your server data or not. The way it determines whether a model
exists is if it has an id defined, which is pretty simple, but effective since
you shouldn't be defining this yourself in your client side code anyway.

### Read

There are 2 ways to fetch data from your server side API.

1. Find a single model by id.
2. Query for multiple paged data sets.

To find a single model you can use the findRecord function as follows:

```typescript
this.jsonDatastore.findRecord<Task>(Task, '1').subscribe((val: Task) => {
    // anything you need to do once you get the record
});
```

To query for multiple paged data sets you can use the findAll function as
follows:

```typescript
let tasks: Task[];
let total: number;
this.jsonDatastore.findAll<JsonApiQueryData<Task>>(
    Task,
    page: { size: 10, number: 1 }
).subscribe(
    (val: JsonApiQueryData<Task>) => {
        tasks = val.getModels();
        total = val.getMeta().meta.total;
        // anything else you need to do...
    }
)
```

### Delete

To delete an existing model you can use the deleteRecord function as follows:

```typescript
this.jsonDatastore.deleteRecord(Task, '1').subscribe(() => {});
```

## Custom Headers

You can add custom headers to be appended to each HTTP request:

```typescript
this.jsonDatastore.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + accessToken });
```

You can also pass custom headers as one of the optional arguments for any CRUD
method call (see method signatures for determining which parameter to use):

```typescript
task.save({}, new HttpHeaders({ 'Authorization': 'Bearer ' + accessToken }));
```

## Error Handling

Error handling is done in the `subscribe` method of the `Observables` returned
from CRUD operations. Your API should return a valid JSON error object. The
[JsonApiError](../base-json/src/lib/interfaces/json-api-error.interface.ts)
interface, which uses the error format defined in the 
[json:api spec](https://jsonapi.org/format/#error-objects),
can be used for handling error responses. You may also define your own interface
and use that in your error handling.

```typescript
task.save().subscribe(
    (res: Task) => { /* do something with the success response here */ },
    (error: any) => {
        // you may use your own interface instead of JsonApiError if you like
        if (error instanceof JsonApiError) {
            // do something with error.errors
        }
    } 
);
```

## Contributing

See [Contributing](../../CONTRIBUTING.md)

## Running unit tests

Run `ng test json` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Built With

This library was generated with [Angular CLI](https://github.com/angular/angular-cli)
version 13.1.0.

## Authors

* **[jphillips]** - (https://github.com/jphillips03)
