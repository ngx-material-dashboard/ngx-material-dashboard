import util from './utils';

/**
 * Code taken from https://github.com/ghidoz/angular2-jsonapi/pull/277 and
 * updated to work with current version of typescript
 */

const replace: (searchValue: string | RegExp, replaceValue: string) => string = String.prototype.replace;
const percentTwenties = /%20/g;

const Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

export default util.assign(
    {
        default: Format.RFC3986,
        formatters: {
            RFC1738(value: any) {
                return replace.call(value, percentTwenties, '+');
            },
            RFC3986(value: any) {
                return String(value);
            }
        }
    },
    Format
);
