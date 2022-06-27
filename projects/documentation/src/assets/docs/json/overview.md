## Introduction

The json library is built on top of the [base-json](./json/base-json) library
and provides all the basic structures needed to interface with a RESTful JSON
API from your client side Angular applications. It allows you to define your
data model classes with decorators, and provides a single datastore service to
manage HTTP requests for handling CRUD operations for all of your data models
with your JSON API. This means you don't have to work with bare JSON, or work
directly with HTTP requests to your API.

There are a few assumptions I had to make about your server side API in order
to make this library work. Check the [Background](../base-json/background.md)
section in the base-json library for more information on the assumptions I made.
You can skip to the 3rd paragraph if you want to get right into the assumptions.
