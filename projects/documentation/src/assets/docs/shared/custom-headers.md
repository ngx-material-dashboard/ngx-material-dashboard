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
