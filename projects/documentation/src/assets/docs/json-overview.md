## Overview

The JSON Libraries are designed to make interfacing with RESTful JSON APIs
easy and allow you to work with classes and services instead of HttpClient
and JSON directly in your client side applications. If your server side code
utilizes the json:api specification as defined at https://jsonapi.org/, then
you should check out the json-api library which should be sufficient for
interfacing with your server API. If your server utilizes basic JSON structures
(where you are basically converting objects directly into their JSON
representation), then you should take a look at the json library to see if that
library will work with your server side API.

Otherwise you should take a look at the base-json library which contains the
most basic structures needed for developing libraries to interface with a
JSON API. This library needs to be extended to define how the JSON data is
structured and how to serialize and deserialize it. The json-api and json
libraries are 2 examples of how to extend this library. If neither of those
libraries meet the needs of your application, then you should be able to
write your own extending implementation with minimal effort. Jump to the
Getting Started to see how to do that.

## Background 

### How And Why This Library Came To Be

The code for this library is mostly based on code from the
[angular2-jsonapi](https://github.com/ghidoz/angular2-jsonapi) library, which
was specifically designed to follow the json:api spec, but this library has been
modified to allow for any type of JSON serialization/deserialization. The code
has also been updated to work with the latest version of Angular, currently 
version 13, because as of this writing it does not appear that the 
angular2-jsonapi is actively being supported and it is not compatible with the
latest version of Angular.

While the angular2-jsonapi library was great, I could only use it if the API
I needed to interface with followed the json:api spec, which sadly not all
APIs do. I think the json:api spec is amazing and all APIs should be based off
of it... but I digress. Since APIs do vary widely and I did not find any
similar library that I could use with any kind of JSON (although I admit I
didn't look very hard), I found myself using the angular2-jsonapi as a guide
to build a generic client side data model and store. After having the 2
separate libraries, seeing just how much code was duplicated, and spending
countless nights thinking about DRYing up my code across projects (because why
should I just DRY up my code in one project when I can DRY up my code for all
projects), I finally managed to combine the duplicate code into this library.

### Assumptions

While I have tried to make this library as generic and extensible as possible,
there are a few assumptions that I had to make when creating it. Your API should
be structured so that each endpoint in your API corresponds with an entity or
model in your database, and you should be using common HTTP request methods. As
an example, if you have a Task model for your application you should have
something like the following endpoints defined in your API:

| HTTP Method | URL Endpoint | Description                                   |
| ----------- | ------------ | --------------------------------------------- |
| GET         | /tasks       | For querying and paging through list of tasks |
| GET         | /tasks/:id   | For returning details for task with given id  |
| POST        | /tasks/      | For creating a new task                       |
| PATCH       | /tasks/:id   | For updating task with given id               |
| DELETE      | /tasks/:id   | For deleting task with given id               |

Another reason I wrote this library was to provide a base line client API for
interfacing with a JSON server side API to use with custom built Angular
components that I have provided in the [widgets](./widgets) library. While
the base-json, json, and json-api libraries can be used on their own, they can
(and need to be included) when using the widgets library. The widgets library
includes a lot of functionality for managing your application entities from
your client side application to your server side API without a lot of code. A
lot of the projects I've worked on allow for managing data through various
paged tables, and yet again I found myself duplicating a lot of code across
projects. The widgets library is the result of even more countless hours of me
sitting up at night trying to figure out how to remove as much duplicate code
from my Angular components as possible, and to allow for incredibly fast
delivery of certain repeated features. For more about the widgets library see
the link above.
