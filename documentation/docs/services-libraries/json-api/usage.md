---
sidebar_position: 3
---

# Usage

import TasksBasicModel from '../shared/code-examples/_tasks-basic-model.md'
import JsonApiDatastoreConfig from '../shared/decorator-properties/_json-api-datastore-config.md'
import UsageIntro from '../shared/extending-usage/_intro.md'
import UsageJsonApiModelConfig from '../shared/extending-usage/_json-api-model-config.md'
import UsageDatastore from '../shared/extending-usage/_datastore.md'

<UsageIntro />

## Data Models

All data models you intend to use with this library should extend the base
JsonApiModel class defined in this library, and should include model
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

<UsageJsonApiModelConfig />

The `BelongsTo` decorator defines a belongs-to relationship, and the `HasMany`
decorator defines a has-many relationship.

## Datastore

<UsageDatastore />
