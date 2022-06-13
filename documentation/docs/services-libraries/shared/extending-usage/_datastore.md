import Datastore from '../code-examples/_extending-datastore.md'

The datastore you define is meant to provide configuration options required by
this library using the `JsonApiDatastoreConfig` decorator. The following is an
example datastore that you might define in your angular app.

<Datastore />

The only thing that is really needed here is the configuration provided in the
`JsonApiDatastoreConfig` decorator. You must define a `baseUrl`, which is the
base URL used when the library makes HTTP requests to your server side API, and
you must also define `models`, which is a map of model types to model classes
for models that have endpoints in your JSON API. The service itself does not
need to include any code (unless you want to override any of the built-in
functionality).
