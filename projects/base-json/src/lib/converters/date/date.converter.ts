import { parseISO } from 'date-fns';

import { PropertyConverter } from '../../interfaces/property-converter.interface';

/**
 * A custom date converter that handles converting between strings and Date
 * objects. Attributes that are defined with type Date are automatically
 * converted using this. Date strings are expected to be in one of the ISO
 * 8601 formats as defined at https://www.w3.org/TR/NOTE-datetime, and they are
 * converted in full ISO 8601 format with local timezone and without
 * milliseconds like 1997-07-16T19:20:30.45+01:00.
 */
export class DateConverter implements PropertyConverter {

    /**
     * Converts the given value (which should be a string) to a Date. If the
     * given value is not a string, then it is returned as is.
     * 
     * @param value The value to convert from string to Date.
     * @returns The given string value as a Date.
     */
    mask(value: any): Date {
        if (typeof value === 'string') {
            return parseISO(value);
        } else {
            return value;
        }
    }

    /**
     * Converts the given value to a string (if it exists). If the value is
     * null, then null is returned.
     *
     * @param value The Date to convert to a string. 
     * @returns The string value of the given Date.
     */
    unmask(value: Date | null): string | null {
        if (value === null) {
            return null;
        }
        return value.toISOString();
    }
}
