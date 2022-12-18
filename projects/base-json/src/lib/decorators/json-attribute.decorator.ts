import { DateConverter } from '../converters/date/date.converter';
import { AttributeDecoratorOptions } from '../interfaces/attribute-decorator-options.interface';

/**
 * The `JsonAttribute` decorator is similar to the `Attribute` decorator in
 * how attributes are converted. It seems the main difference is the `Attribute`
 * decorator includes meta data that tracks new and old data for each attribute
 * which allows for checking if objects have dirty attributes, and rolling back
 * attribute values to previous state.
 *
 * To be honest I'm not sure why you would want to use this over the `Attribute`
 * decorator, but the [angular2-jsonapi](https://github.com/ghidoz/angular2-jsonapi)
 * library included this decorator, so I'm including it here as well. The only
 * thing I can think of is if you do not need to worry about determining if
 * your data has dirty attributes, or you don't need to provide the ability to
 * rolling back attribute data.
 *
 * @param options Custom options included in decorator.
 * @returns A custom property decorator for JSON attributes.
 */
export function JsonAttribute(
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
            const metadata = Reflect.getMetadata('JsonAttribute', target) || {};

            metadata[propertyName] = {
                marked: true
            };

            Reflect.defineMetadata('JsonAttribute', metadata, target);

            const mappingMetadata =
                Reflect.getMetadata('AttributeMapping', target) || {};
            const serializedPropertyName =
                options.serializedName !== undefined
                    ? options.serializedName
                    : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
        };

        const getter = function (this: any) {
            if (target.nestedDataSerialization) {
                return converter(
                    Reflect.getMetadata('design:type', target, propertyName),
                    this[`_${String(propertyName)}`],
                    true
                );
            }
            return this[`_${String(propertyName)}`];
        };

        const setter = function (this: any, newVal: any) {
            const targetType = Reflect.getMetadata(
                'design:type',
                target,
                propertyName
            );
            this[`_${String(propertyName)}`] = converter(targetType, newVal);
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
