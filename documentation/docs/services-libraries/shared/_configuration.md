In order for the library to work as expected you need to make sure you have the
`emitDecoratorMetadata` and `experimentalDecorators` options set to true. So
make sure your `tsconfig.json` has the following:

```json
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
