import { DatastoreConfig, JsonApiDatastoreConfig } from '../../src/lib';

import { JsonDatastore } from './json-datastore.service';
import { Task } from '../models/task.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:8080';
const API_VERSION = 'v1';

@JsonApiDatastoreConfig({
    baseUrl: BASE_URL,
    apiVersion: API_VERSION,
    models: {
        tasks: Task
    }
})
export class DatastoreCustomConfig extends JsonDatastore {
    constructor(httpClient: HttpClient, config: DatastoreConfig) {
        super(httpClient);
        this.config = config;
    }
}
