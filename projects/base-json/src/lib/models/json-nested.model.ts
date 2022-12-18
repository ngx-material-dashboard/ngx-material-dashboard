import { ModelConfig } from '../interfaces/model-config.interface';
import { JsonModel } from './json.model';

/**
 * The `JsonApiNestedModel` is meant to be used for complex attributes. Any
 * field defined for a `JsonApiNestedModel` attribute that is changed will mark
 * the entire attribute as dirty.
 *
 * An address is one example of a complex attribute which for whatever reason
 * you don't include as a relationship in your code.
 *
 * ```json
 * {
 *     street: '21 Jump Street',
 *     city: 'Metropolitan City',
 *     state: 'Any State',
 *     zip: '55555'
 * }
 * ```
 *
 * @overviewDetails
 * ## Basic Usage Example
 * ```typescript
 * import {JsonApiNestedModel} from '@ngx-material-dashboard/base-json';
 *
 * export class Address extends JsonApiNestedModel {
 *     street: string;
 *     city: string;
 *     state: string;
 *     zip: string;
 * }
 * ```
 */
export class JsonApiNestedModel {
    [key: string]: any;

    public nestedDataSerialization = false;

    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
        }
    }

    get modelConfig(): ModelConfig {
        return Reflect.getMetadata('JsonApiModelConfig', this.constructor);
    }

    public fill(data: any) {
        Object.assign(this, data);
    }

    public serialize(): any {
        return this.transformSerializedNamesToPropertyNames();
    }

    protected transformSerializedNamesToPropertyNames<T extends JsonModel>() {
        const serializedNameToPropertyName = this.getModelPropertyNames();
        const properties: any = {};
        Object.keys(serializedNameToPropertyName).forEach((serializedName) => {
            if (
                this &&
                this[serializedName] !== null &&
                this[serializedName] !== undefined &&
                serializedName !== 'nestedDataSerialization'
            ) {
                properties[serializedNameToPropertyName[serializedName]] =
                    this[serializedName];
            }
        });

        return properties;
    }

    protected getModelPropertyNames() {
        return Reflect.getMetadata('AttributeMapping', this) || [];
    }
}
