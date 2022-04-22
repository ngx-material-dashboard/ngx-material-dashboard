import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { DatastoreConfig } from "../interfaces/datastore-config.interface";
import { ModelType } from "../interfaces/model-type.interface";
import { JsonApiQueryData } from "../models/json-api-query-data";

/**
 * The JsonDatastore is the main datastore that should be used to interface
 * with your JSON API. It should include your basic CRUD operations for your
 * models, and I leave most of that up to you to define (if you choose to 
 * create your own). The only methods defined below are the minimum methods
 * needed to work with the widgets library. The json and json-api libraries
 * available in this workspace provide full implementations of this interface
 * as a point of reference in case either library fails to meet the needs of
 * your application.
 */
export abstract class JsonDatastore {

    protected config!: DatastoreConfig;

    /**
     * Finds all models of the given type based on the given parameters and
     * returns an observable of {@link JsonApiQueryData}, which should include
     * the resulting models and meta data (i.e. total number of results for
     * determining how many pages there are).
     *
     * @param modelType The type of model to query for.
     * @param params Optional parameters to include in query (filter, paging, sorting).
     * @param headers Optional headers to include with the request.
     * @param customUrl Optional custom URL to use for request (otherwise built from config and model).
     */
    abstract findAll(
        modelType: ModelType<any>,
        params?: any,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<JsonApiQueryData<any>>;

    /**
     * Creates a new model. This only creates the model locally, you must
     * implement the save capability in the base model class used in the JSON
     * library of your choice. The save method should return an observable of
     * the model being created as defined in {@link JsonModel}. 
     *
     * @param modelType The type of model to create.
     * @param data Optional parameter that contains model for data.
     */
    abstract createRecord(modelType: ModelType<any>, data?: any): any;

    /**
     * Deletes an existing model.
     *
     * @param modelType The type of model to delete. 
     * @param id The id of the model to delete.
     * @param headers Optional headers to include with the request.
     * @param customUrl Optional custom URL to use for request.
     */
    abstract deleteRecord(
        modelType: ModelType<any>,
        id: string,
        headers?: HttpHeaders,
        customUrl?: string
    ): Observable<any>;
}
