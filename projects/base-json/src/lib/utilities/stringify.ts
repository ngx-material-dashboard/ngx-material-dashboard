import utils from './utils';
import formats from './formats';

/**
 * Code taken from https://github.com/ghidoz/angular2-jsonapi/pull/277 and
 * updated to work with current version of typescript. The utilities is a part
 * of the library I do not know enough about since I just copied the code and
 * and updated it enough to get it to function, and still have all the unit
 * tests pass. I am slowly going through the code to get a better understanding
 * of what exactly it is doing, and adding unit tests and comments in places
 * where I think I have a basic understanding of what is going on.
 */

const has = Object.prototype.hasOwnProperty;

const arrayPrefixGenerators = {
    brackets: (prefix: any) => prefix + '[]',
    comma: 'comma',
    indices: (prefix: any, key: any) => prefix + '[' + key + ']',
    repeat: (prefix: any) => prefix
};

const isArray = Array.isArray;
const push = Array.prototype.push;
const pushToArray = (arr: any, valueOrArray: any | any[]) => {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

const toISO = Date.prototype.toISOString;

const defaultFormat = formats.default;
const defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    sort: undefined,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    filter: undefined,
    serializeDate: (date: Date) => toISO.call(date),
    skipNulls: false,
    strictNullHandling: false
};

const isNonNullishPrimitive = (v: any) =>
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean' ||
    typeof v === 'symbol' ||
    typeof v === 'bigint';

const stringify = (
    object: any,
    prefix: any,
    generateArrayPrefix: any,
    strictNullHandling: any,
    skipNulls: any,
    encoder: any,
    filter: any,
    sort: any,
    allowDots: any,
    serializeDate: any,
    formatter: any,
    encodeValuesOnly: any,
    charset: any
) => {
    let obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utils.maybeMap(obj, (value: any) => {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly
                ? encoder(prefix, defaults.encoder, charset, 'key')
                : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            const keyValue = encodeValuesOnly
                ? prefix
                : encoder(prefix, defaults.encoder, charset, 'key');
            return [
                formatter(keyValue) +
                    '=' +
                    formatter(encoder(obj, defaults.encoder, charset, 'value'))
            ];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    const values: any = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    let objKeys;
    if (generateArrayPrefix === 'comma' && isArray(obj)) {
        // we need to join elements in
        objKeys = [
            { value: obj.length > 0 ? obj.join(',') || null : undefined }
        ];
    } else if (isArray(filter)) {
        objKeys = filter;
    } else {
        const keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (const key of objKeys) {
        const value =
            typeof key === 'object' && key.value !== undefined
                ? key.value
                : obj[key];
        if (skipNulls && value === null) {
            continue;
        }

        const keyPrefix = isArray(obj)
            ? typeof generateArrayPrefix === 'function'
                ? generateArrayPrefix(prefix, key)
                : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');

        pushToArray(
            values,
            stringify(
                value,
                keyPrefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            )
        );
    }

    return values;
};

const normalizeStringifyOptions = (opts: any) => {
    if (!opts) {
        return defaults;
    }

    if (
        opts.encoder !== null &&
        opts.encoder !== undefined &&
        typeof opts.encoder !== 'function'
    ) {
        throw new TypeError('Encoder has to be a function.');
    }

    const charset = opts.charset || defaults.charset;
    if (
        typeof opts.charset !== 'undefined' &&
        opts.charset !== 'utf-8' &&
        opts.charset !== 'iso-8859-1'
    ) {
        throw new TypeError(
            'The charset option must be either utf-8, iso-8859-1, or undefined'
        );
    }

    let format = formats.default;
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    const formatter = formats.formatters[format];

    let filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix:
            typeof opts.addQueryPrefix === 'boolean'
                ? opts.addQueryPrefix
                : defaults.addQueryPrefix,
        allowDots:
            typeof opts.allowDots === 'undefined'
                ? defaults.allowDots
                : !!opts.allowDots,
        charset,
        charsetSentinel:
            typeof opts.charsetSentinel === 'boolean'
                ? opts.charsetSentinel
                : defaults.charsetSentinel,
        delimiter:
            typeof opts.delimiter === 'undefined'
                ? defaults.delimiter
                : opts.delimiter,
        encode:
            typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder:
            typeof opts.encoder === 'function'
                ? opts.encoder
                : defaults.encoder,
        encodeValuesOnly:
            typeof opts.encodeValuesOnly === 'boolean'
                ? opts.encodeValuesOnly
                : defaults.encodeValuesOnly,
        filter,
        formatter,
        serializeDate:
            typeof opts.serializeDate === 'function'
                ? opts.serializeDate
                : defaults.serializeDate,
        skipNulls:
            typeof opts.skipNulls === 'boolean'
                ? opts.skipNulls
                : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling:
            typeof opts.strictNullHandling === 'boolean'
                ? opts.strictNullHandling
                : defaults.strictNullHandling
    };
};

export default (object: any, opts: any) => {
    let obj = object;
    const options = normalizeStringifyOptions(opts);

    let objKeys;
    let filter: any;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    const keys: any = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    let arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    const generateArrayPrefix =
        arrayPrefixGenerators[
            arrayFormat as keyof typeof arrayPrefixGenerators
        ];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < objKeys.length; ++i) {
        const key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }

        pushToArray(
            keys,
            stringify(
                obj[key],
                key,
                generateArrayPrefix,
                options.strictNullHandling,
                options.skipNulls,
                options.encode ? options.encoder : null,
                options.filter,
                options.sort,
                options.allowDots,
                options.serializeDate,
                options.formatter,
                options.encodeValuesOnly,
                options.charset
            )
        );
    }

    const joined = keys.join(options.delimiter);
    let prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};
