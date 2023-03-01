/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { PropertyConverter } from './property-converter.interface';

/**
 * AttributeDecoratorOptions define options available for Attribute decorators.
 * Currently you can define custom keys that may differ from the property names
 * defined in your data models (i.e. if JSON uses snake_case, but you want to
 * use camelCase for your properties), and you can also provide a custom
 * converter function in case the attribute cannot be converted as a primitive,
 * date, or defined data model in your client side code.
 *
 * See [Attribute](/base-json/decorators/attribute) for more details on using
 * this interface.
 *
 * ### Converter
 *
 * The `converter` property defines how to convert your property between a JSON
 * literal and whatever object type you want to convert to/from. The property
 * takes a class that implements `PropertyConverter` interface, which must
 * implement 2 methods, `mask` and `unmask`. See the
 * [PropertyConverter](/base-json/interfaces/property-converter) docs for more
 * details.
 *
 * ### Serialized Name
 *
 * The `serializedName` property defines a custom name to use for the property
 * key in JSON. This is really meant for converting property keys that do not
 * match the name of the property where this decorator is defined. For example,
 * if you have a key in JSON that is in snake_case, but you want to use camel
 * case for your property names.
 */
export interface AttributeDecoratorOptions {
    /** Custom name for attribute as defined in JSON (i.e. if JSON uses snake_case). */
    serializedName?: string;
    /** Custom converter that defines how to mask/unmask property. */
    converter?: PropertyConverter;
}
