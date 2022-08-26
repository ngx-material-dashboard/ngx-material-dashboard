## Error Handling

Error handling is done in the `subscribe` method of the `Observables` returned
from CRUD operations. Your API should return a valid JSON error object. The
[JsonApiError](/base-json/interfaces/json-api-error)
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
