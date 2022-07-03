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
