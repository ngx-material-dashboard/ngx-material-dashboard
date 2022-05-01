import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import * as _ from 'lodash';

import { AttributeMetadata } from "../constants/symbols";
import { Attribute } from "../decorators/attribute.decorator";
import { ModelConfig } from "../interfaces/model-config.interface";
import { JsonDatastore } from "../services/json-datastore.service";

/**
 * HACK/FIXME:
 * Type 'symbol' cannot be used as an index type.
 * TypeScript 2.9.x
 * See https://github.com/Microsoft/TypeScript/issues/24587.
 */
// tslint:disable-next-line:variable-name
const AttributeMetadataIndex: string = AttributeMetadata as any;

/**
 * The JsonModel class represents the base model object for all client side
 * data models. All client side data models that will interface with server
 * side APIs through this library should extend this class.
 */
export abstract class JsonModel {

    /** The primary key identifier for the model. */
    @Attribute() id?: string;
    /** The datastore service that performs CRUD operations. */
    internalDatastore: JsonDatastore
    /** Boolean value indicating whether model is being initialized. */
    modelInitialization = false;
    /** Map of strings to any objects, used for tracking object meta data. */
    [key: string]: any;

    constructor(internalDatastore: JsonDatastore) {
        this.internalDatastore = internalDatastore;
    }

    /**
     * Returns true if this model has dirty attributes. A model has dirty
     * attributes if any of it's properties changed.
     * 
     * @returns true if the model has dirty attributes.
     */
    get hasDirtyAttributes(): boolean {
        this.checkChanges();
        const attributesMetadata: any = this[AttributeMetadataIndex];
        let hasDirtyAttributes = false;
        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                const metadata: any = attributesMetadata[propertyName];
                if (metadata.hasDirtyAttributes) {
                    hasDirtyAttributes = true;
                    break;
                }
            }
        }
        return hasDirtyAttributes;
    }

    get modelConfig(): ModelConfig {
        return Reflect.getMetadata('JsonApiModelConfig', this.constructor);
    }

    /**
     * 
     * @returns 
     */
    public isModelInitialization(): boolean {
        return this.modelInitialization;
    }

    public rollbackAttributes(): void {
        const attributesMetadata: any = this[AttributeMetadataIndex];
        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                if (attributesMetadata[propertyName].hasDirtyAttributes) {
                    this[propertyName] = _.cloneDeep(attributesMetadata[propertyName].oldValue);
                }
            }
        }
    }

    public save(params?: any, headers?: HttpHeaders, customUrl?: string): Observable<this> {
        this.checkChanges();
        const attributesMetadata: any = this[AttributeMetadataIndex];
        return this.internalDatastore.saveRecord(attributesMetadata, this, params, headers, customUrl);
    }

    private checkChanges() {
        const attributesMetadata: any = this[AttributeMetadata];
        for (const propertyName in attributesMetadata) {
            if (attributesMetadata.hasOwnProperty(propertyName)) {
                const metadata: any = attributesMetadata[propertyName];
                if (metadata.nested) {
                    this[AttributeMetadata][propertyName].hasDirtyAttributes = !_.isEqual(
                        attributesMetadata[propertyName].oldValue,
                        attributesMetadata[propertyName].newValue
                    );
                    this[AttributeMetadata][propertyName].serialisationValue = attributesMetadata[propertyName].converter(
                        Reflect.getMetadata('design:type', this, propertyName),
                        _.cloneDeep(attributesMetadata[propertyName].newValue),
                        true
                    );
                }
            }
        }
    }
}
