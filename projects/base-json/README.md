# base-json

## Introduction

The base-json library contains the most basic structures needed for developing
libraries to interface with a RESTful JSON API from your client side Angular
applications. It allows you to interact with classes and models instead of 
trying to work with JSON directly. It provides a mostly generic way of defining
your client side data models with decorators (i.e. @Attribute,
@JsonApiModelConfig), and corresponding abstract data service with some
reusable code implemented to handle basic CRUD operations.

The intent for this library is that it should be extended so you can define
how your data is structured and how to serialize and deserialize it. I have
created 2 libraries that extend this one and provide implementations for which
you should be able to use as is with minimal configuration and code changes
required when adding to your application (that is if the general JSON structure
defined in either library works with your application). The libraries I created
are the json and json-api libraries. The json library uses a general JSON
structure that effectively turns an object directly into JSON, while the
json-api library follows the json:api specification as defined at
https://jsonapi.org/. See the respective libraries in the links provided above
for more details on using them.

If the above libraries do not suit your applications needs, then you should be
able to extend this library and provide your own implementation. You can jump
to [Getting Started](#getting-started) to see how to do that. I still suggest
taking a look at the source code for both libraries since they provide fully
functional examples of how to extend this library.

## Background (how and why this library came to be)

The code for this library is mostly based on code from the
[angular2-jsonapi](https://github.com/ghidoz/angular2-jsonapi) library, which
was specifically designed to follow the json:api spec, but this library has been
modified to allow for any type of JSON serialization/deserialization. The code
has also been updated to work with the latest version of Angular, currently 
version 13, because as of this writing it does not appear that the 
angular2-jsonapi is actively being supported and it is not compatible with the
latest version of Angular.

While the angular2-jsonapi library was great, I could only use it if the API
I needed to interface with followed the json:api spec, which sadly not all
APIs do. I think the json:api spec is amazing and all APIs should be based off
of it... but I digress. Since APIs do vary widely and I did not find any
similar library that I could use with any kind of JSON (although I admit I
didn't look very hard), I found myself using the angular2-jsonapi as a guide
to build a generic client side data model and store. After having the 2
separate libraries, seeing just how much code was duplicated, and spending
countless nights thinking about DRYing up my code, I finally managed to combine
the duplicate code into this library.

While I have tried to make this library as generic and extensible as possible,
there are a few assumptions that I had to make when creating it. Your API should
be structured so that each endpoint in your API corresponds with an entity or
model in your database, and you should be using common HTTP request methods. As
an example, if you have a Task model for your application you should have
something like the following endpoints defined in your API:

    GET     /tasks          For querying and paging through list of tasks
    GET     /tasks/:id      For returning details for task with given id
    POST    /tasks/         For creating a new task
    PATCH   /tasks/:id      For updating task with given id
    DELETE  /tasks/:id      For deleting task with given id

Another reason I wrote this library was to provide a base line API to use with
custom built Angular components that I have provided in the widgets library.
While the base-json, json, and json-api libraries can be used on their own,
they can (and need to be included) when using the widgets library. The widgets
library includes a lot of functionality for managing your application entities
from your client side application to your server side API without a lot of code.
A lot of the projects I've worked on allow for managing data through various
paged tables, and yet again I found myself duplicating a lot of code. The
widgets library is the result of even more countless hours of me sitting up at
night trying to figure out how to remove as much duplicate code from my
Angular components as possible, and to allow for incredibly fast delivery of
certain repeated features. For more about the widgets library see the link
above.

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

## Usage

The following sections detail how to extend this library in case the JSON
structure defined in the json or json-api library do not meet your
application needs.

### Data Models

The first thing you will need to do is create a base data model that extends
the base-json JsonModel. All the data classes you intend to interface with this
library should in turn extend the base data model that you create. Your base
data model should at a minimum define how to initialize your client side data.
Below is a sample JsonModel, which is taken directly from the json library.

```typescript
import { JsonModel as BaseJsonModel } from '@ngx-material-dashboard/base-json';
import { JsonDatastore } from '../services/json-datastore.service';

export class JsonModel extends BaseJsonModel {

    constructor(internalDatastore: JsonDatastore, data?: any) {
        super(internalDatastore);

        if (data) {
            this.modelInitialization = true;
            this.id = data.id;
            Object.assign(this, data);
            this.modelInitialization = false;
        }
    }
}
```

The above JsonModel class simply defines a constructor which takes in a
datastore service and optional JSON data object. The datastore provided is just
passed to the super() call as this is needed in the base-json model class for
some of the reusable functionality in the library. More details about this
datastore service (which you will need to create) are included below. The
optional data parameter should be a map that corresponds with properties
included in the JSON for the data model. When data is included the values from
the JSON are assigned to the properties defined for the model class using
`Object.assign(this, data)`. As such the map should contain keys that match up
with properties you define in each of your data models.

> NOTE: the library provides some basic transformation configuration options
> for properties in your data models using the @Attribute decorator, which
> means that you can configure how each of your JSON properties are converted
> and that you should always use the datastore when initializing your data
> models instead of trying to create them directly (more on that below)

With your base data model defined you can create the remaining data models you
intend to use with this library. Below is a sample Task data model you might
define that could correspond with the endpoints listed in the Background
section above.

```typescript
import { Attribute, JsonApiModelConfig } from "@ngx-material-dashboard/base-json";
import { JsonModel } from "./json.model";

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

The above class includes Attribute and JsonApiModelConfig decoraters from this
library. The JsonApiModelConfig decorator provides configuration options the
library needs to interface with the server side API. The only required option
is the `type` option. When this is the only option included it is used to
defines the endpoint used to interface with your server side API. There are
additional configuration options available. You can take a look at the source
code to see the additional options.

Every property that has an Attribute decorator will be included when
serializing/deserializing JSON. The Attribute decorator includes the following
options.

| Option         | Description                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| serializedName | Custom value for JSON serialization in case it doesn't match property name (i.e. snake_case in JSON)              |
| converter      | Custom converter function (in case you need to convert more than primitives, dates, and other data models)        |

### Datastore

The next thing you need to do is create a datastore service that extends the
JsonDatastore service defined in this library. The datastore service is used
for interfacing with your server side API and includes basic implementations
for CRUD operations. The only thing it does not include are implementations for
serializing and deserializing your data, as well as extracting model data from
HTTP responses. This functionality is broken down into the following 5 methods
which you must provide implementations for in your service:

| Method Name       | Parameters                                                                                                                                                                                                                                                                       | Description                                                                                                                                                                                                      |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| createRecord      | 1) modelType - Type of model to return<br>2) data - Optional map of data with properties for model                                                                                                                                                                               | Returns a new instance of given model type.                                                                                                                                                                      |
| deserializeModel  | 1) modelType - Type of model to return<br>2) data - JSON data used to create model                                                                                                                                                                                               | Returns given JSON data as given modelType.                                                                                                                                                                      |
| serializeModel    | 1) model - Model to serialize to JSON<br>2) attributesMetadata - Metadata for model instance<br>3) transition - Optional transition to include as meta data in request body<br>4) includeRelationships - Optional boolean value to include relationship data (defaults to false) | Returns JSON object that can be included in HTTP request body.                                                                                                                                                   |
| extractQueryData  | 1) response - HTTP response from server<br>2) modelType - Type of model included in response<br>3) withMeta - Optional value indicating if meta data included                                                                                                                    | Parses and extracts query data from given HTTP response body which should contain a list of results, and returns an object<br>that includes the list of models and any meta data (i.e. total number of results). |
| extractRecordData | 1) response - HTTP response from server<br>2) modelType - Type of model included in response<br>3) model - Instance of model                                                                                                                                                     | Parses and extracts query data from given HTTP response body which should contain a single main object (and may include other objects in terms of relational data).                                              |

The deserializeModel method is intended to be used by the extractQueryData and
extractRecordData methods, while the serializeModel method is used by internal
CRUD methods to convert object data into JSON that can be inserted into the body
of HTTP requests. The createModel is kind of a one off method that I thought
should be implemented by extending libraries since this can vary depending on
know how your models are structured. I am including the JsonDatastore from the
json library for your reference below, but I also suggest taking a look at the
JsonApiDatastore defined in the json-api library to see a different
implementation for a more well defined JSON structure.

```typescript
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    JsonApiQueryData,
    JsonDatastore as BaseJsonDatastore,
    ModelType
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from '../models/json.model';

@Injectable()
export class JsonDatastore extends BaseJsonDatastore {

    constructor(protected override httpClient: HttpClient) {
        super();
    }

    public deserializeModel<T extends JsonModel>(modelType: ModelType<T>, data: any): T {
        data = this.transformSerializedNamesToPropertyNames(modelType, data);
        return new modelType(this, data);
    }

    public serializeModel(model: any, attributesMetadata: any, transition?: string): any {
        const data: any = this.getDirtyAttributes(attributesMetadata, model);

        let body;
        if (transition) {
            body = {
                meta: {
                    transition
                },
                data
            };
        } else {
            body = data;
        }

        return body;
    }

    protected extractQueryData<T extends JsonModel>(
        response: HttpResponse<object>,
        modelType: ModelType<T>,
        withMeta = false
    ): Array<T> | JsonApiQueryData<T> {
        const body: any = response.body;
        const models: T[] = [];

        body.data.forEach((data: any) => {
            const model: T = this.deserializeModel(modelType, data);
            models.push(model);
        });

        if (withMeta && withMeta === true) {
            return new JsonApiQueryData(models, this.parseMeta(body, modelType));
        }

        return models;
    }

    protected extractRecordData<T extends JsonModel>(
        res: HttpResponse<object>,
        modelType: ModelType<T>,
        model?: T
    ): T {
        const body: any = res.body;

        if (model) {
            model.modelInitialization = true;
            model.id = body.id;
            Object.assign(model, body);
            model.modelInitialization = false;
        }

        const deserializedModel = model || this.deserializeModel(modelType, body.data);
        return deserializedModel;
    }
}
```

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
