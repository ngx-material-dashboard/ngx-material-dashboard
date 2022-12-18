import * as _ from 'lodash-es';

import { AttributeDecoratorOptions } from '../interfaces/attribute-decorator-options.interface';
import { AttributeMetadata } from '../constants/symbols';

/**
 * Nested Attributes can be used for complex attributes. Complex attributes
 * include array of simply typed values `[1,2,3]`, array of complex values
 * `[{name: 'Create Docs', ...}, ...]`, or a complex object
 * `{name: 'Create Docs', ...}`.
 *
 * > NOTE: when using the `NestedAttribute` decorator you must include
 * > `JsonModelConverter` as the `converter` option in
 * > `AttributeDecoratorOptions`.
 *
 * @param options Custom options included in decorator.
 * @returns A custom property decorator for JSON attributes.
 *
 * @overviewDetails
 * ## Basic Usage Examples
 * ```typescript
 * //Array of simple typed values (string, number....)
 * @NestedAttribute({converter: new JsonModelConverter(Array,{hasMany:true})}
 * emails: Array<string>;
 *
 * //Array of complex values
 * @NestedAttribute({converter: new JsonModelConverter(Item,{hasMany:true})}
 * items: Array<Item>;
 *
 * //Complex value
 * @NestedAttribute({converter: new JsonModelConverter(Item)}
 * item: Item;
 * ```
 */
export function NestedAttribute(
    options: AttributeDecoratorOptions = {}
): PropertyDecorator {
    return (target: any, propertyName: string | symbol) => {
        const converter = (
            dataType: any,
            value: any,
            forSerialisation = false
        ): any => {
            let attrConverter;

            if (options.converter) {
                attrConverter = options.converter;
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
            const metadata =
                Reflect.getMetadata('NestedAttribute', target) || {};

            metadata[propertyName] = {
                marked: true
            };

            Reflect.defineMetadata('NestedAttribute', metadata, target);

            const mappingMetadata =
                Reflect.getMetadata('AttributeMapping', target) || {};
            const serializedPropertyName =
                options.serializedName !== undefined
                    ? options.serializedName
                    : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
        };

        const updateMetadata = (instance: any) => {
            const newValue = instance[`_${String(propertyName)}`];

            if (!instance[AttributeMetadata]) {
                instance[AttributeMetadata] = {};
            }
            if (
                instance[AttributeMetadata][propertyName] &&
                !instance.isModelInitialization()
            ) {
                instance[AttributeMetadata][propertyName].newValue = newValue;
                instance[AttributeMetadata][propertyName].hasDirtyAttributes =
                    !_.isEqual(
                        instance[AttributeMetadata][propertyName].oldValue,
                        newValue
                    );
                instance[AttributeMetadata][propertyName].serialisationValue =
                    newValue;
            } else {
                const oldValue = _.cloneDeep(newValue);
                instance[AttributeMetadata][propertyName] = {
                    newValue,
                    oldValue,
                    converter,
                    nested: true,
                    hasDirtyAttributes: !_.isEqual(newValue, oldValue)
                };
            }
        };

        const getter = function (this: any) {
            return this[`_${String(propertyName)}`];
        };

        const setter = function (this: any, newVal: any) {
            const targetType = Reflect.getMetadata(
                'design:type',
                target,
                propertyName
            );
            this[`_${String(propertyName)}`] = converter(targetType, newVal);
            updateMetadata(target);
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
