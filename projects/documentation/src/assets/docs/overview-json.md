## Overview

The JSON Libraries are designed to make interfacing with RESTful JSON APIs easy and allow you to work with classes and services instead of HttpClient and JSON directly in your client side applications. If your server side code utilizes the json:api specification as defined at https://jsonapi.org/, then you should check out the [json-api](json-api) library which should be sufficient for interfacing with your server API. If your server utilizes complex JSON literals that doesn't follow the json:api spec (where you are basically converting objects directly into their JSON representation), then you should take a look at the [json](json) library to see if that library will work with your server side API. If neither of these libraries work for you, you can take a look at the [base-json](base-json) library which contains the most basic structures needed for developing libraries to interface with a JSON API that you should be able to extend to fit the needs of your application.

## Background 

### How And Why The JSON Libraries Came To Be

The code for the JSON libraries is mostly based on code from the
[angular2-jsonapi](https://github.com/ghidoz/angular2-jsonapi) library, which
was specifically designed to follow the json:api spec. I stumbled across the angular2-jsonapi library while working on a project that utilized the json:api spec and really liked working with it. Sadly not all APIs follow the json:api spec. I think the json:api spec is amazing and wished more APIs utilized it. But I digest...

Since APIs do vary widely and I did not find any similar library that I could use with any kind of JSON (although I admit I didn't look very hard), I found myself using the angular2-jsonapi as a guide to build a client side data model and store that could work with generic JSON that didn't follow the json:api spec. After creating the generic JSON library, seeing just how much code was duplicated, and spending countless nights thinking about DRYing up my code across projects (because why should I just DRY up my code in one project when I can DRY up my code for all projects), I finally managed to come up with a library structure that removed duplicate code and allowed for any type of JSON (des)serialization.

### Library Structure and Modifications from angular2-json

The `base-json` library defines the most basic code and structures from the `angular2-json` library. It also defines the abstract methods that must be implemented to define how the JSON data is structured and how to (des)serialize it. As such this library must be "extended" to provide implementations on these abstract methods. The `json-api` and `json` libraries are 2 examples of how to "extend" the `base-json` library. The `json-api` library defines all code for structuring and (des)serializing JSON based on the json:api spec. The `json` library on the other hand defines a more generic structure for (des)serializing JSON.

> NOTE: If the `json-api` or the `json` libraries do not meet the needs of your application, then you should be able to write your own implementation using the `json-api` and `json` libraries as templates. I recommend looking through the source code for both libraries (starting with the `json` library since that is the simpler of the 2). You should also check out the [usage](/base-json#usage) section for the `base-json` library for more details on how to use it and implement all the abstract methods for defining how to structure and (des)serialize your JSON.

I did have to make some changes to the core of the `angular2-json` library to break it up into the `base-json` and `json-api`/`json` libraries. I also had to make some changes to get the libraries to work with Angular 13. Most changes were minor, but the biggest change I had to make was removing the capability to only send dirty attributes in request body due to some issues I ran into testing. As a result any `PATCH` request will include all attributes right now (instead of just the dirty ones). So far this has not been a real issue for me since objects are still updated. I just might include additional logic on the server side to only update changed attributes. I do hope to fix this at some point, but that is currently a low priority item for me.

### Assumptions

While I have tried to make the `base-json` library as generic and extensible as possible, there are a few assumptions that I had to make when creating it. Your API should be structured so that each endpoint in your API corresponds with an entity or model in your database, and you should be using common HTTP request methods. As an example, if you have a Task model for your application you should have something like the following endpoints defined in your API:

| HTTP Method | URL Endpoint | Description                                   |
| ----------- | ------------ | --------------------------------------------- |
| GET         | /tasks       | For querying and paging through list of tasks |
| GET         | /tasks/:id   | For returning details for task with given id  |
| POST        | /tasks/      | For creating a new task                       |
| PATCH       | /tasks/:id   | For updating task with given id               |
| DELETE      | /tasks/:id   | For deleting task with given id               |

Another reason I created the JSON libraries was to provide a mostly generic client API for managing CRUD operations that could be used with custom built Angular components that I have provided in the [widgets](./widgets) library. The `widgets` library includes a lot of functionality for managing your application entities from your client side application to your server side API without a lot of code. A lot of the projects I've worked on allow for managing data through various paged tables, and yet again I found myself duplicating a lot of code across projects. The `widgets` library is the result of even more countless hours of me sitting up at night trying to figure out how to remove as much duplicate code from my Angular components as possible, and to allow for incredibly fast delivery of certain repeated features.
