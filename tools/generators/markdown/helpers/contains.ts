import * as Handlebars from 'handlebars';

/**
 * Custom Handlebars helper to test if a string contains some text value based
 * on code from here: https://stackoverflow.com/a/9405113.
 */
export default function() {
    Handlebars.registerHelper('contains', function(
        this: any,
        needle: string,
        haystack: string,
        options: { fn: (val: any) => string, inverse: (val: any) => string },
    ) {
        needle = Handlebars.escapeExpression(needle);
        haystack = Handlebars.escapeExpression(haystack);
        return (haystack.indexOf(needle) > -1) ? options.fn(this): options.inverse(this);
    });
}
