
import { AttributeDecoratorOptions, DateConverter } from '@ngx-material-dashboard/base-json';
export function JsonAttribute(options: AttributeDecoratorOptions = {}): PropertyDecorator {
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
            const metadata = Reflect.getMetadata('JsonAttribute', target) || {};

            metadata[propertyName] = {
                marked: true
            };

            Reflect.defineMetadata('JsonAttribute', metadata, target);

            const mappingMetadata = Reflect.getMetadata('AttributeMapping', target) || {};
            const serializedPropertyName = options.serializedName !== undefined ? options.serializedName : propertyName;
            mappingMetadata[serializedPropertyName] = propertyName;
            Reflect.defineMetadata('AttributeMapping', mappingMetadata, target);
        };

        const getter = function(this: any) {
            if (target.nestedDataSerialization) {
                return converter(Reflect.getMetadata('design:type', target, propertyName), this[`_${String(propertyName)}`], true);
            }
            return this[`_${String(propertyName)}`];
        };

        const setter = function(this: any, newVal: any) {
            const targetType = Reflect.getMetadata('design:type', target, propertyName);
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
