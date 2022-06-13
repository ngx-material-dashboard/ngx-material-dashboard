---
sidebar_position: 4
---

# Usage

import DatastoreExample from '../shared/code-examples/_datastore.md'
import JsonModel from '../shared/code-examples/_json-model.md'
import TasksBasicModel from '../shared/code-examples/_tasks-basic-model.md'
import AttributeDecorator from '../shared/decorator-properties/_attribute-decorator.md'
import JsonApiDatastoreConfig from '../shared/decorator-properties/_json-api-datastore-config.md'
import DatastoreMethods from '../shared/method-descriptions/_datastore.md'

The following sections detail how to extend this library in case the JSON
structure defined in the json or json-api library do not meet your
application needs. There are 2 main steps you will need to take in order to
extend this library.

1. Create a base data model and add/update your client side data models
2. Create a datastore service to be used for interfacing with your API

## Data Models

The first thing you will need to do is create a base data model that extends
the base-json JsonModel. All the data classes you intend to interface with this
library should in turn extend the base data model that you create. Your base
data model should at a minimum define how to initialize your client side data.
Below is a sample JsonModel, which is taken directly from the json library.

<JsonModel />

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
intend to use with this library. Your application's data models will need to
include the JsonApiModelConfig on the class itself, and Attribute decorators on
each of the properties you need to include in your JSON. Below is a sample Task
data model you might define that could correspond with the endpoints listed in
the Background section above.

<TasksBasicModel />

The JsonApiModelConfig decorator provides configuration options the
library needs to interface with the server side API. The only required option
is the `type` option. When this is the only option included it is used to
define the endpoint used to interface with your server side API. There are
additional configuration options available. You can take a look at the source
code to see the additional options.

Every property that has an Attribute decorator will be included when
serializing/deserializing JSON. The Attribute decorator includes the following
options.

<AttributeDecorator />

## Datastore

The next thing you need to do is create a datastore service that extends the
JsonDatastore service defined in this library. The datastore service is used
for interfacing with your server side API and includes basic implementations
for CRUD operations. The only thing it does not include are implementations for
serializing and deserializing your data, as well as extracting model data from
HTTP responses. This functionality is broken down into the following 5 methods
which you must provide implementations for in your service:

<DatastoreMethods />

The deserializeModel method is intended to be used by the extractQueryData and
extractRecordData methods, while the serializeModel method is used by internal
CRUD methods to convert object data into JSON that can be inserted into the body
of HTTP requests. The createModel is kind of a one off method that I thought
should be implemented by extending libraries since this can vary depending on
how your models are structured. I am including the JsonDatastore from the json
library for your reference below, but I also suggest taking a look at the
JsonApiDatastore defined in the json-api library to see a different
implementation for a more well defined JSON structure.

<DatastoreExample />

Once you have defined your main datastore you need to add configuration using
the `@JsonApiDatastoreConfig` decorator. You can do this one of two ways,

1. Add decorator to datastore you created above and use that directly in your
app; or
2. Create a separate JsonDatastore that extends the one you created

Going with option 1. is perfectly fine, and you are more than welcome to do so.
I just include option 2 since this is more in line with how the json and json-api
libraries are structured and used.

The `@JsonApiDatastoreConfig` decorator provides the following configuration
options used by the datastore:

<JsonApiDatastoreConfig />

See below for an example of adding the `@JsonApiDatastoreConfig` with minimum
options needed for the library:

```typescript
import { Injectable } from '@angular/core';
import { DatastoreConfig, JsonApiDatastoreConfig } from '@ngx-material-dashboard/base-json';
import { JsonDatastore } from '@ngx-material-dashboard/json';

import { Task } from '@shared/models/task.model';

// define configuration options
const config: DatastoreConfig = {
    baseUrl: 'http://localhost:8080/api',
    models: {
        'tasks': Task
    }
}

@Injectable()
@JsonApiDatastoreConfig(config) // add configuration options
export class JsonApiService extends JsonDatastore {...}
```

> NOTE: you may define and add configuration options directly to the decorator
> if you like, I just prefer to keep them separate since the configuration is
> usually a lot larger with real world applications where you will have a lot
> more than just 1 model defined.

If you've made it this far, then you should be ready to start making calls to
your API for your entities.
