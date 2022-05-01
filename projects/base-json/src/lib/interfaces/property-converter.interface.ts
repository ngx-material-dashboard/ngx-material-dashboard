/**
 * PropertyConverter provides methods needed to define a converter for JSON
 * properties.
 */
export interface PropertyConverter {
    /**
     * Converts given value (which should be a string) to expected type, which
     * can be used to set properties in client side data models.
     *
     * @param value Value to convert. 
     */
    mask(value: any): any;

    /**
     * Converts given value to a string, which is meant to be used when
     * converting property values to JSON to include in HTTP requests.
     *
     * @param value Value to convert. 
     */
    unmask(value: any): any;
}
