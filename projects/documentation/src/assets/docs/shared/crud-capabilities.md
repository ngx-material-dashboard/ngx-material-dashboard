## CRUD Capabilities

The following section provides details on how to use the library once you have
completed creating your data models and datastore. Once you have an instance of the
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

> NOTE: this should only create a new instance of a model and should not make any HTTP requests.

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

To query for multiple objects (i.e. paged data sets) you can use the findAll
function as follows:

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
