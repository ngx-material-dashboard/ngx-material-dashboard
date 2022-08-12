## Introduction

The json-api library is built on top of the [base-json](./base-json)
library and provides all the basic structures needed to interface with a
RESTful JSON API from your client side Angular applications that utilizes the
json:api specification as defined at https://jsonapi.org/. It allows you to 
define your data model classes with decorators, and provides a single
datastore service to manage HTTP requests for handling CRUD operations for all
of your data models with your JSON API. This means you don't have to work with
bare JSON, or work directly with HTTP requests to your API.

The library is based on the 
[angular2-jsonapi](https://github.com/ghidoz/angular2-jsonapi) library, which
does not seem to be actively maintained anymore. I have updated the library to
work with the latest version of Angular (currently 13; since I believe the
latest version that library was compatible with was 9). I've also broken out
some of the core features into the base-json library to make it more generic
and provide the capability to handle any type of JSON format (not just the
json:api spec).

I did have to make some changes to get the library to work with the latest version
of Angular. Most changes were minor, but the biggest change I had to make was 
removing hasDirtyAttributes and rollback capabilities due to some issues I ran
into testing the library. So far this has not been a real issue for me since
objects are still updated (they just include all attributes when doing so), and I
haven't really worked on an app that required the ability to rollback attribute
changes. I do hope to fix these issues at some point, but that is currently a
low priority item for me.