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

export abstract class JsonModel {

    @Attribute() id?: string;
    internalDatastore: JsonDatastore
    modelInitialization = false;
    [key: string]: any;

    constructor(internalDatastore: JsonDatastore) {
        this.internalDatastore = internalDatastore;
    }

    get hasDirtyAttributes() {
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
