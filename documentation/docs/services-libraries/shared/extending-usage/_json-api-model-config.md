import AttributeDecorator from '../decorator-properties/_attribute-decorator.md'

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

Every property that has an Attribute decorator will be included when
serializing/deserializing JSON. The Attribute decorator includes the following
options.

<AttributeDecorator />
