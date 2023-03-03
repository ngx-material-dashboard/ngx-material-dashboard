## Usage

The following sections detail how to extend this library in case the JSON
structure defined in the `json` or `json-api` library do not meet your
application needs. There are 2 main steps you will need to take in order to
extend this library.

1. Create a base data model and add/update your client side data models
2. Create a datastore service to be used for interfacing with your API

### Data Models

The first thing you will need to do is create a base data model that extends
the base-json `JsonModel`. All the data classes you intend to interface with this
library should in turn extend the base data model that you create. Your base
data model should at a minimum define how to initialize your client side data.
Below is a sample `JsonModel`, which is taken directly from the `json` library.

```typescript
import { JsonModel as BaseJsonModel } from '@ngx-material-dashboard/base-json';
import { JsonDatastore } from '../services/json-datastore.service';

export class JsonModel extends BaseJsonModel {

    // override id and add Attribute decorator so id included in JSON
    @Attribute() override id?: string;

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

The above `JsonModel` class simply defines a constructor which takes in a
datastore service and optional JSON data object. The datastore provided is just
passed to the super() call as this is needed in the `base-json` model class for
some of the reusable functionality in the library. More details about this
datastore service (which you will need to create) are included below. The
optional data parameter should be a map that corresponds with properties
included in the JSON for the data model. When data is included the values from
the JSON are assigned to the properties defined for the model class using
`Object.assign(this, data)`. As such the map should contain keys that match up
with properties you define in each of your data models.

> NOTE: the library provides some basic transformation configuration options
> for properties in your data models using the `@Attribute` decorator, which
> means that you can configure how each of your JSON properties are converted
> and that you should always use the datastore when initializing your data
> models instead of trying to create them directly (more on that below)

With your base data model defined you can create the remaining data models you
intend to use with this library. Your application's data models will need to
include the `JsonApiModelConfig` on the class itself, and attribute decorators on
each of the properties you need to include in your JSON. Below is a sample Task
data model you might define that could correspond with the endpoints listed in
the Background section above.

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

#### Attribute Decorators

There are multiple attribute decorators included for you to use on the properties in your models that you want to include in the JSON serialization/deserialization. The `Attribute` decorator is the most basic decorator, and should be used for primitives (`string`, `number`, or `boolean`) or date values. The `NestedAttribute` decorator can be used for more complex types including arrays of simply typed values `[1,2,3]`, arrays of complex values `[{name: 'Create Docs', ...}, ...]`, or complex objects `{name: 'Create Docs', ...}`.

Only properties that have decorators will be included in the JSON serialization/deserialization. Methods (if you include any) will be ignored when converting these objects to/from JSON. See the [Attribute](/base-json/overview#attribute) and [NestedAttribute](/base-json/overview#nested-attribute) documentation for more details.

#### JsonApiModelConfig Decorator

The `JsonApiModelConfig` decorator provides configuration options the
library needs to interface with the server side API. The only required option
is the `type` option. When this is the only option included it is used to
define the endpoint used to interface with your server side API. See the [JsonApiModelConfig](/base-json/overview#json-api-model-config) decorator documentation for more details on the options available.

### Datastore

The next thing you need to do is create a datastore service that extends the
`JsonDatastore` service defined in this library. The datastore service is used
for interfacing with your server side API and includes basic implementations
for CRUD operations. The only thing it does not include are implementations for
serializing and deserializing your data, as well as extracting model data from
HTTP responses. See the [documentation](/base-json/api#json-datastore) for the JsonDatastore for more details.

I am including the source for the JsonDatastore from the json library so you
can see an example of how to implement the necessary methods. I also suggest
taking a look at the [JsonApiDatastore](/json-api/overview#json-api-datastore)
defined in the `json-api` library to see a different implementation for a more
well defined JSON structure (especially if you plan to write your own extension
of this library).

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

Once you have defined your main datastore you need to add configuration using
the `@JsonApiDatastoreConfig` decorator. You can do this one of two ways,

1. Add decorator to datastore you created above and use that directly in your
app; or
2. Create a separate `JsonDatastore` that extends the one you created

Going with option 1. is perfectly fine, and you are more than welcome to do so.
I just include option 2 since this is more in line with how the `json` and `json-api`
libraries are structured and used.

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
