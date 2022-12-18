import util from './utils';

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

const replace: (searchValue: string | RegExp, replaceValue: string) => string =
    String.prototype.replace;
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
