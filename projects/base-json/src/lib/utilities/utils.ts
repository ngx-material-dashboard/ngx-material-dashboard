/**
 * Code taken from https://github.com/ghidoz/angular2-jsonapi/pull/277 and
 * updated to work with current version of typescript. The utilities is sad to
 * say a part of the library I do not know enough about since I just copied the
 * code and updated it enough to get it to function, and still have all the
 * unit tests pass. I am slowly going through the code to get a better
 * understanding of what exactly it is doing, and adding unit tests and
 * comments in places where I think I have a basic understanding of what is
 * going on.
 */

/* tslint:disable:no-bitwise */
const has = Object.prototype.hasOwnProperty;
const isArray = Array.isArray;

const hexTable = ((() => {
  const array = [];
  for (let i = 0; i < 256; ++i) {
    array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
  }

  return array;
})());

const compactQueue = (queue: any) => {
  while (queue.length > 1) {
    const item = queue.pop();
    const obj = item.obj[item.prop];

    if (isArray(obj)) {
      const compacted = [];

      for (const item1 of obj) {
        if (typeof item1 !== 'undefined') {
          compacted.push(item1);
        }
      }

      item.obj[item.prop] = compacted;
    }
  }
};

/**
 * Converts the given source array into an object.
 *
 * @param source 
 * @param options 
 * @returns 
 */
const arrayToObject = (source: any, options: any) => {
  const obj = options && options.plainObjects ? Object.create(null) : {};
  for (let i = 0; i < source.length; ++i) {
    if (typeof source[i] !== 'undefined') {
      obj[i] = source[i];
    }
  }

  return obj;
};

/**
 * Merges the source into the target. This DOES modify the original target
 * value, and does not return a new object (assuming the target is an object or
 * an array; a new object or array is returned if the target is a primitive).
 * If you need to keep the original object/array as is you might consider
 * passing a copy of the object without reference.
 *
 * @param target The object to add to. 
 * @param source The object to add.
 * @param options ?
 * @returns The target with source added to it.
 */
const merge = (target: any, source: any, options: any) => {
  /* eslint no-param-reassign: 0 */
  if (!source) {
    return target;
  }

  if (typeof source !== 'object') {
    // if the source is not an object, then it's  a primitive?
    if (isArray(target)) {
      // just add the value to array
      target.push(source);
    } else if (target && typeof target === 'object') {
      if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
        target[source] = true;
      }
    } else {
      // both target and array are primitives so return an array...
      return [target, source];
    }

    return target;
  }

  if (!target || typeof target !== 'object') {
    return [target].concat(source);
  }

  let mergeTarget = target;
  if (isArray(target) && !isArray(source)) {
    mergeTarget = arrayToObject(target, options);
  }

  if (isArray(target) && isArray(source)) {
    source.forEach((item, i) => {
      if (has.call(target, i)) {
        const targetItem = target[i];
        if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
          target[i] = merge(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i] = item;
      }
    });
    return target;
  }

  return Object.keys(source).reduce((acc, key) => {
    const value = source[key];

    if (has.call(acc, key)) {
      acc[key] = merge(acc[key], value, options);
    } else {
      acc[key] = value;
    }
    return acc;
  }, mergeTarget);
};

const assign = (target: any, source: any) => Object.keys(source).reduce((acc, key) => {
  acc[key] = source[key];
  return acc;
}, target);

const decode = (str: any, decoder: any, charset: any) => {
  const strWithoutPlus = str.replace(/\+/g, ' ');
  if (charset === 'iso-8859-1') {
    // unescape never throws, no try...catch needed:
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  }
  // utf-8
  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
};

const encode = (str: any, defaultEncoder: any, charset: any) => {
  // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
  // It has been adapted here for stricter adherence to RFC 3986
  if (str.length === 0) {
    return str;
  }

  // tslint:disable-next-line:variable-name
  let string = str;
  if (typeof str === 'symbol') {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== 'string') {
    string = String(str);
  }

  if (charset === 'iso-8859-1') {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, $0 => '%26%23' + parseInt($0.slice(2), 16) + '%3B');
  }

  let out = '';
  for (let i = 0; i < string.length; ++i) {
    let c = string.charCodeAt(i);

    if (
      c === 0x2D // -
      || c === 0x2E // .
      || c === 0x5F // _
      || c === 0x7E // ~
      || (c >= 0x30 && c <= 0x39) // 0-9
      || (c >= 0x41 && c <= 0x5A) // a-z
      || (c >= 0x61 && c <= 0x7A) // A-Z
    ) {
      out += string.charAt(i);
      continue;
    }

    if (c < 0x80) {
      out = out + hexTable[c];
      continue;
    }

    if (c < 0x800) {
      out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
      continue;
    }

    if (c < 0xD800 || c >= 0xE000) {
      out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
      continue;
    }

    i += 1;
    c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
    out += hexTable[0xF0 | (c >> 18)]
      + hexTable[0x80 | ((c >> 12) & 0x3F)]
      + hexTable[0x80 | ((c >> 6) & 0x3F)]
      + hexTable[0x80 | (c & 0x3F)];
  }

  return out;
};

const compact = (value: any) => {
  const queue = [{obj: {o: value}, prop: 'o'}];
  const refs = [];

  for (const item of queue) {
    // found code to fix error when just using item.obj[item.prop] below
    // https://bobbyhadz.com/blog/typescript-no-index-signature-with-parameter-of-type-string
    const obj = item.obj[item.prop as keyof typeof item.obj];
    const keys = Object.keys(obj);
    for (const key of keys) {
      const val = obj[key];
      if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
        queue.push({obj, prop: key});
        refs.push(val);
      }
    }
  }

  compactQueue(queue);

  return value;
};

const isRegExp = (obj: any) => Object.prototype.toString.call(obj) === '[object RegExp]';

const isBuffer = (obj: any) => {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

/**
 * Returns a new array of the given arrays combined, b array added to a array.
 *
 * @param a The array to add to.
 * @param b The array to add.
 * @returns A new array with b added to a.
 */
const combine = (a: any, b: any) => a.concat(b);

const maybeMap = (val: any, fn: any) => {
  if (isArray(val)) {
    const mapped = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
};

export default {
    arrayToObject,
    assign,
    combine,
    compact,
    decode,
    encode,
    isBuffer,
    isRegExp,
    maybeMap,
    merge
};
