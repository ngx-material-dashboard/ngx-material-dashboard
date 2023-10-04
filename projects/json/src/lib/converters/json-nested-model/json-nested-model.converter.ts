/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import {
    JsonModelConverterConfig,
    ModelType,
    PropertyConverter
} from '@ngx-material-dashboard/base-json';
import { JsonModel } from '../../models/json.model';

/**
 * Default option values to set for `JsonModelConverter`.
 */
export const DEFAULT_OPTIONS: JsonModelConverterConfig = {
    nullValue: false,
    hasMany: false
};

/**
 * A JSON object converter that handles converting complex attributes. Complex
 * attributes include array of simply typed values [1,2,3], array of complex
 * values [{name: 'Create Docs', ...}, ...], or a complex object
 * {name: 'Create Docs', ...}. This converter must be included as the converter
 * value for `AttributeDecoratorOptions` when you are using the `Attribute`
 * decorator for an attribute that extends JsonModel. This ensures that only
 * property attributes are included when converting the object to JSON and
 * prevents `TypeError: cyclic object value` which occurs if you try to convert
 * an object that extends JsonModel as is.
 */
export class JsonNestedModelConverter<T> implements PropertyConverter {
    private modelType: any; // ModelType<T>
    private options: JsonModelConverterConfig;

    constructor(model: T, options: JsonModelConverterConfig = {}) {
        this.modelType = model; // <ModelType<T>>model
        this.options = { ...DEFAULT_OPTIONS, ...options };
    }

    mask(value: any): T | Array<T> {
        if (!value && !this.options.nullValue) {
            if (this.options.hasMany) {
                return [];
            }
            return new this.modelType();
        }

        let result = null;
        if (this.options.hasMany) {
            if (!Array.isArray(value)) {
                throw new Error(
                    `ERROR: JsonNestedModelConverter: Expected array but got ${typeof value}.`
                );
            }
            result = [];
            for (const item of value) {
                if (item === null) {
                    continue;
                }
                let temp;
                if (typeof item === 'object') {
                    temp = new this.modelType();
                    Object.assign(temp, item);
                } else {
                    temp = item;
                }

                result.push(temp);
            }
        } else {
            if (!(value instanceof this.modelType)) {
                result = new this.modelType();
                Object.assign(result, value);
            } else {
                result = value;
            }
        }
        return result;
    }

    unmask(value: any): any {
        if (!value) {
            return value;
        }
        let result = null;
        if (Array.isArray(value)) {
            result = [];
            for (const item of value) {
                if (!item) {
                    continue;
                }
                if (item instanceof JsonModel) {
                    result.push(this.serialize(this.modelType, item));
                } else {
                    result.push(item);
                }
            }
        } else {
            if (value instanceof JsonModel) {
                result = this.serialize(this.modelType, value);
            } else {
                result = value;
            }
        }
        return result;
    }

    /**
     * Returns the serialized representation for the model that can be used as
     * JSON in HTTP request body. Without this everything from the object would
     * be included in JSON resulting in `TypeError: cyclic object value` if you
     * try to define an @Attribute with type that extends JsonModel.
     *
     * @returns Serialized representation for the model.
     */
    serialize(model: ModelType<T>, attributes: any): any {
        const serializedNameToPropertyName =
            Reflect.getMetadata('AttributeMapping', model) || [];
        const properties: any = {};
        Object.keys(serializedNameToPropertyName).forEach((serializedName) => {
            if (
                this &&
                attributes[serializedName] !== null &&
                attributes[serializedName] !== undefined &&
                serializedName !== 'nestedDataSerialization'
            ) {
                properties[serializedNameToPropertyName[serializedName]] =
                    attributes[serializedName];
            }
        });

        return properties;
    }
}
