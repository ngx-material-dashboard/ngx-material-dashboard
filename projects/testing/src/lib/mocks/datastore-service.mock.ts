/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    DatastoreConfig,
    JsonDatastore,
    JsonApiDatastoreConfig,
    ModelType,
    JsonApiQueryData
} from '@ngx-material-dashboard/base-json';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

const BASE_URL = 'http://localhost:8080/api';

/**
 * A mock datastore that can be used for tests. This datastore will not make
 * any HTML requests, removing the need for that dependency in your tests. You
 * can use this mock service in any place that injects the `JsonDatastore`.
 *
 * > NOTE: The functionality in this class is mostly incomplete, and needs to
 * > be filled out to potentially be more useful for tests.
 *
 * @usageNotes
 * #### Basic Usage Example
 * ```typescript
 * import {HttpClientTestingModule} from '@angular/common/http/testing';
 * import {TestBed} from '@angular/core/testing';
 * import {JsonDatastore} from '@ngx-material-dashboard/base-json';
 * import {Datastore} from '@ngx-material-dashboard/testing';
 *
 * TestBed.configureTestingModule({
 *     // any declarations...
 *     imports: [
 *         HttpClientTestingModule
 *         // any other imports...
 *     ],
 *     providers: [
 *         { provide: JsonDatastore, useClass: Datastore }
 *     ]
 * })
 * ```
 */
@Injectable()
@JsonApiDatastoreConfig({
    baseUrl: BASE_URL,
    models: {
        tasks: Task
    }
})
export class Datastore extends JsonDatastore {
    protected override config: DatastoreConfig = {
        baseUrl: BASE_URL,
        apiVersion: 'v1'
    };

    public override findAll(
        modelType: ModelType<any>,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<JsonApiQueryData<any>> {
        return of(new JsonApiQueryData([]));
    }

    createRecord(modelType: ModelType<any>, data?: any): any {
        return new modelType(data);
    }

    public override deleteRecord(
        modelType: ModelType<any>,
        id: string,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<any> {
        return of();
    }

    public override saveRecord(
        attributesMetadata: any,
        model: any,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<any> {
        return of(model);
    }

    deserializeModel(modelType: ModelType<any>, data: any) {
        data = this.transformSerializedNamesToPropertyNames(modelType, data);
        return new modelType(this, data);
    }

    serializeModel(
        model: any,
        attributesMetadata: any,
        transition?: string,
        includeRelationships?: boolean
    ) {}

    protected extractQueryData(
        response: HttpResponse<object>,
        modelType: ModelType<any>,
        withMeta?: boolean
    ): JsonApiQueryData<any> {
        return new JsonApiQueryData([]);
    }

    protected extractRecordData(
        res: HttpResponse<object>,
        modelType: ModelType<any>,
        model?: any
    ) {}
}
