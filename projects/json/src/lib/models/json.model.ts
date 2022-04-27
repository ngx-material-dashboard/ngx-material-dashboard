import { HttpHeaders } from '@angular/common/http';
import { AttributeMetadata, JsonModel as BaseJsonModel } from '@ngx-material-dashboard/base-json';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { JsonDatastore  } from '../services/json-datastore.service';

/**
 * HACK/FIXME:
 * Type 'symbol' cannot be used as an index type.
 * TypeScript 2.9.x
 * See https://github.com/Microsoft/TypeScript/issues/24587.
 */
// tslint:disable-next-line:variable-name
const AttributeMetadataIndex: string = AttributeMetadata as any;

export class JsonModel extends BaseJsonModel {
    [key: string]: any;

    constructor(private internalDatastore: JsonDatastore, data?: any) {
        super();

        if (data) {
            this.modelInitialization = true;
            this.id = data.id;
            Object.assign(this, data);
            this.modelInitialization = false;
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
