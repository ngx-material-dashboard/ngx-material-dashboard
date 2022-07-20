/**
 * PropertyConverter provides methods needed to define a converter for JSON
 * properties. Classes that implement this interface can be used to convert
 * between JSON literals and any object type, but you must provide the logic
 * to do that in the `mask` and `unmask` functions.
 * 
 * @overviewDetails
 * ## Basic Usage Example
 * ```typescript
 * import {parseISO} from 'date-fns';
 * import {PropertyConverter} from '@ngx-material-dashboard/base-json';
 * 
 * export class DateConverter implements PropertyConverter {
 *     mask(value: any): Date {
 *         if (typeof value === 'string') {
 *             return parseISO(value);
 *         } else {
 *             return value;
 *         }
 *     }
 *
 *     unmask(value: Date | null): string | null {
 *         if (value === null) {
 *             return null;
 *         }
 *         return value.toISOString();
 *     }
 * }
 * ```
 * 
 * ## Mask
 * 
 * The `mask` function is used to convert JSON literals to whatever type you
 * want. In the case of a simple property like a Date you would be converting
 * a string value to a Date object. You can convert more than just string JSON
 * literals. TODO link to `JsonModelConverter` in `json-api` library for a more
 * interesting example.
 * 
 * ## Unmask
 * 
 * The `unmask` function is used to convert objects of a certain type to JSON
 * literals. In the case of a simple property like a Date you would be
 * converting a Date object to a string.
 * 
 */
export interface PropertyConverter {
    /**
     * Converts given value to expected type, which can be used to set
     * properties in client side data models.
     *
     * @param value Value to convert. 
     */
    mask(value: any): any;

    /**
     * Converts given value to a JSON literal, which is meant to be used when
     * converting property values to JSON to include in HTTP requests.
     *
     * @param value Value to convert. 
     */
    unmask(value: any): any;
}
