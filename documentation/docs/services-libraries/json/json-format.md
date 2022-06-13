---
sidebar_position: 2
---

import TaskModel from '../shared/code-examples/_tasks-basic-model.md'

# JSON Format

The JSON generated and consumed by this library is pretty generic, and basically
converts objects directly into their JSON representation. So if you had the 
following simple data model class:

<TaskModel />

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
[Getting Started](./getting_started.md) section to see how to use this library.
If your JSON API follows the [json:api spec](https://jsonapi.org/), then check
out the [json-api](../json-api/intro.md) library since that is designed to work
with that specification. If your JSON API does not follow either of these 
structures, then fear not because you might still be able to utilize the
base-json library to define your own JSON structure. That is of course if your
API still follows the basic assumptions I lay out in the base-json library
documentation [here](../base-json/background.md). There are details in that
documentation to show how you can extend the base-json library for your own
purposes.
