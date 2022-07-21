import * as _ from 'lodash';

import { AttributeMetadata } from '../constants/symbols';
import { DateConverter } from '../converters/date/date.converter';
import { AttributeDecoratorOptions } from '../interfaces/attribute-decorator-options.interface';

/**
 * Attribute decorator defines a custom property decorator that should be added
 * to each property defined in your client side data models that you intend to
 * include in HTTP request/response data handled by the JSON library.
 * 
 * @param options Custom options included in decorator. 
 * @returns A custom property decorator for JSON attributes.
 * 
 * @overviewDetails
 * ## Basic Usage Example
 * ```typescript
 * import {Attribute, JsonModel} from "@ngx-material-dashboard/base-json";
 * 
 * class Task extends JsonModel {
 *     // this property does not get included in HTTP request/response data
 *     internalProperty?: string;
 *     // below properties are included in HTTP request/response data
 *     @Attribute() name?: string;
 *     @Attribute() dueDate?: string;
 * }
 * ```
 * 
 * The `Attribute` decorator includes an optional `AttributeDecoratorOptions`
 * parameter which provides configuration options to define how to convert
 * a property, and a custom key to use when serializing/deserializing JSON.
 * If no options are included, then the attribute will be parsed as is, so
 * the key should match the property name in your data model, and the value to
 * be converted should either be a primitive, date, or other data model 
 * defined in your client side code.
 * 
 * ## AttributeDecoratorOptions Usage Example
 * ```typescript
 * import {Attribute, JsonModel} from "@ngx-material-dashboard/base-json";
 * import {CustomDateConverter} from './custom-date-converter';
 * 
 * class Task extends JsonModel {
 *     @Attribute() name?: string;
 *     @Attribute({ 
 *         converter: CustomDateConverter,
 *         serializedName: 'due_date'
 *     }) dueDate?: string;
 * }
 * ```
 * 
 * See the docs for
 * [AttributeDecoratorOptions](/base-json/interfaces/attribute-decorator-options)
 * for more details.
 */
export function Attribute(options: AttributeDecoratorOptions = {}): PropertyDecorator {
    return (target: any, propertyName: string | symbol) => {
        const converter = (dataType: any, value: any, forSerialisation = false): any => {
            let attrConverter;

            if (options.converter) {
                attrConverter = options.converter;
            } else if (dataType === Date) {
                attrConverter = new DateConverter();
            } else {
                const datatype = new dataType();

                if (datatype.mask && datatype.unmask) {
                    attrConverter = datatype;
                }
            }

            if (attrConverter) {
                if (!forSerialisation) {
                    return attrConverter.mask(value);
                }
                return attrConverter.unmask(value);
            }

            return value;
        };

        const saveAnnotations = () => {
            const metadata = Reflect.getMetadata('Attribute', target) || {};

            metadata[propertyName] = {
                marked: true
            };

            Reflect.defineMetadata('Attribute', metadata, target);

            const mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
            const serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
        };

        const setMetadata = (
            instance: any,
            oldValue: any,
            newValue: any
        ) => {
            const targetType = Reflect.getMetadata('design:type', target, propertyName);

            if (!instance[AttributeMetadata]) {
                instance[AttributeMetadata] = {};
            }
            instance[AttributeMetadata][propertyName] = {
                newValue,
                oldValue,
                nested: false,
                serializedName: options.serializedName,
                hasDirtyAttributes: !_.isEqual(oldValue, newValue),
                serialisationValue: converter(targetType, newValue, true)
            };
        };

        const getter = function(this: any) {
            return this[`_${String(propertyName)}`];
        };

        const setter = function(this: any, newVal: any) {
            const targetType = Reflect.getMetadata('design:type', target, propertyName);
            const convertedValue = converter(targetType, newVal);
            let oldValue = null;

            // TODO: figure out issue with setting oldValue; this currently
            // breaks the hasDirtyAttributes and rollback capabilities in the
            // library but allows all other tests to pass; it seems that oldValue
            // contains data from previous tests somehow (maybe something to do with
            // the fact that we need to define this as parameter to remove below
            // compilation error)
            // Compilation Error: 'this' implicitly has type 'any' because it does not have a type annotation.
            // if (this.isModelInitialization() && this.id) {
            //     oldValue = converter(targetType, newVal);
            // } else {
            //     if (this[AttributeMetadata] && this[AttributeMetadata][propertyName]) {
            //         oldValue = this[AttributeMetadata][propertyName].oldValue;
            //     }
            // }

            this[`_${String(propertyName)}`] = convertedValue;
            setMetadata(target, oldValue, convertedValue);
        };

        if (delete target[propertyName]) {
            saveAnnotations();
            Object.defineProperty(target, propertyName, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    };
}
