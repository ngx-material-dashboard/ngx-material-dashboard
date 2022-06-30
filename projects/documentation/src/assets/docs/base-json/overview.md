## Introduction

The base-json library contains the most basic structures needed for developing
libraries to interface with a RESTful JSON API from your client side Angular
applications. It allows you to interact with classes and models instead of 
trying to work with JSON directly. It provides a mostly generic way of defining
your client side data models with decorators (i.e. @Attribute,
@JsonApiModelConfig), and corresponding abstract data service with some
reusable code implemented to handle basic CRUD operations.

The intent for this library is that it should be extended so you can define
how your data is structured and how to serialize and deserialize it. I have
created 2 libraries that extend this one and provide implementations for which
you should be able to use as is with minimal configuration and code changes
required when adding to your application (that is if the JSON structure defined
in either library works with your application). The libraries I created are the
[json](./json/json) and [json-api](./json/json-api) libraries. The json library uses
a general JSON structure that effectively turns an object directly into JSON,
while the json-api library follows the json:api specification as defined at
https://jsonapi.org/. See the respective libraries in the links provided above
for more details on using them.

If the above libraries do not suit your applications needs, then you should be
able to extend this library and provide your own implementation. You can jump
to [Getting Started](#getting-started) to see how to do that. I still suggest
taking a look at the source code for both libraries since they provide fully
functional examples of how to extend this library.

