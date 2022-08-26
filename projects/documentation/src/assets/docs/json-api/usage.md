## Usage

The following sections detail how to use this library. There are 2 main steps
you will need to take in order to do this.

1. Define/update your data models to extend the `JsonModel` defined in this library.
2. Define a simple datastore that extends the `JsonDatastore` service defined in
this library.

### Data Models

All data models you intend to use with this library should extend the base
`JsonApiModel` class defined in this library, and should include model
configuration, attribute, and relationship decorators. The following is an
example of data models that you might define in your angular app.

```typescript
import { Attribute, JsonApiModelConfig } from "@ngx-material-dashboard/base-json";
import { BelongsTo, HasMany, JsonApiModel } from '@ngx-material-dashboard/json-api'

@JsonApiModelConfig({
    type: 'tasks'
})
export class Task extends JsonApiModel {

    @Attribute() name?: string;
    @Attribute({ serializedName: 'due_date' }) dueDate?: Date;
    @BelongsTo() person: Person;
}

@JsonApiModelConfig({
    type: 'people'
})
export class Person extends JsonApiModel {

    @Attribute() name?: string;
    @HasMany() tasks: Task[];
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

The `BelongsTo` decorator defines a belongs-to relationship, and the `HasMany` decorator defines a has-many relationship. See the [JsonApiModelConfig](/base-json/decorators/json-api-model-config), [Attribute](/base-json/decorators/attribute), [BelongsTo](/json-api/decorators/belongs-to), and [HasMany](/json-api/decorators/has-many) decorators documentation for more details.

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
