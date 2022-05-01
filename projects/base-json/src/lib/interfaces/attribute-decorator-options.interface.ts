import { PropertyConverter } from './property-converter.interface';

/**
 * AttributeDecoratorOptions define options available for Attribute decorators.
 * Currently you can define custom keys that may differ from the property names
 * defined in your data models (i.e. if JSON uses snake_case, but you want to
 * use camelCase for your properties), and you can also provide a custom
 * converter function in case the attribute cannot be converted as a primitive,
 * date, or defined data model in your client side code. If no options are
 * included, then the attribute will be parsed as is, so the key should match
 * the property name in your data model, and the value to be converted should
 * either be a primitive, date, or other data model defined in your client side
 * code.
 */
export interface AttributeDecoratorOptions {
    /** Custom name for attribute as defined in JSON (i.e. if JSON uses snake_case). */
    serializedName?: string;
    /** Custom converter that defines how to mask/unmask property. */
    converter?: PropertyConverter;
}
