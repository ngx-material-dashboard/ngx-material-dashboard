import { PropertyConverter } from '../../interfaces/property-converter.interface';
import { JsonModelConverterConfig } from '../../interfaces/json-model-converter-config.interface';
import { JsonApiNestedModel } from '../../models/json-nested.model';

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
 * value for `AttributeDecoratorOptions` when you are using the
 * `NestedAttribute` decorator.
 */
export class JsonModelConverter<T> implements PropertyConverter {
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
                    `ERROR: JsonModelConverter: Expected array but got ${typeof value}.`
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
                    temp.fill(item);
                } else {
                    temp = item;
                }

                result.push(temp);
            }
        } else {
            if (!(value instanceof this.modelType)) {
                result = new this.modelType();
                result.fill(value);
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
                if (item instanceof JsonApiNestedModel) {
                    item.nestedDataSerialization = true;
                    result.push(item.serialize());
                    item.nestedDataSerialization = false;
                } else {
                    result.push(item);
                }
            }
        } else {
            if (value instanceof JsonApiNestedModel) {
                value.nestedDataSerialization = true;
                result = value.serialize();
                value.nestedDataSerialization = false;
            } else {
                result = value;
            }
        }
        return result;
    }
}
