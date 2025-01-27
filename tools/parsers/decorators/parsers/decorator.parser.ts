/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { FileUtil } from '../../../util/file.util';

/**
 * A pretty basic parser for Angular class decorators. This currently is only
 * designed to work for Components and Directives. Will definitely need work
 * if additional decorators need to be added, specifically NgModule decorators
 * since providers can have destructured objects defined, and parser won't work
 * well with those currently...
 */
export class DecoratorParser {
    fileData: string;
    lines: string[];
    /** A map used to define any property needed from decorator. */
    [key: string]: any;

    constructor(pathString: string, type?: string) {
        this.fileData = this.getFileContents(pathString);
        this.lines = this.fileData.split('\n');
        this.lines.map((value) => value.trim());
        if (type) {
            const decoratorString = this.parseDecoratorString(this.lines, type);
            this.parseDecoratorProperties(decoratorString);
        }
    }

    /**
     * Split up each of key/value pair of decorator properties.
     *
     * @param decoratorString A string representation of a decorator.
     * @returns An object with properties defined in decorator.
     */
    private parseDecoratorProperties(decoratorString: string) {
        // split the given string on ',', which should result in list of key
        // value pairs that need to be processed further
        decoratorString.split(',').forEach((s) => {
            // split each key/value pair on ':' which should separate the pair
            // into values we can actually use
            const keyValuePairs = s.split(':');

            // set the key to the further parsed value in the resulting
            // decorator property object
            this[keyValuePairs[0]] = this.parseProperty(keyValuePairs[1]);
        });
    }

    /**
     * Find the contents of the decorator in the fileData based on given
     * type; this is a very naive way of doing this since it relies on
     * decorator to start at beginning of line and then reads line by
     * line until it reaches what should be closing bracket and parentheses
     * of decorator i.e. '})'; should probably be done with RegExp.
     *
     * @param lines An array of each line of code in class.
     * @param type The type of decorator to look for (Component, Directive).
     * @returns A string of the decorator from the given fileData.
     */
    private parseDecoratorString(lines: string[], type: string): string {
        let decoratorString = '';
        for (let i = 0; i < lines.length; i++) {
            // when we find starting point of decorator i.e. '@Component({'
            if (lines[i].indexOf(`@${type}({`) === 0) {
                i++;
                // add lines from fileData to decorator string until we reach
                // end of fileData or end of decorator i.e. '})'
                while (i < lines.length && lines[i] !== '})') {
                    decoratorString += lines[i++].trim();
                }
            }
        }

        return decoratorString;
    }

    /**
     * Parses the given property, which should be either a single value or an
     * array of values. NOTE: this currently only handles string values and
     * does not take into account the fact that you can have destructured
     * objects.
     *
     * @param p The property to parse.
     * @returns The property parsed out into a single value or array of values.
     */
    private parseProperty(p: string): string | string[] {
        // remove any extra spaces around property before anything else
        let res: string = p.trim();

        if (p.indexOf('[') >= 0) {
            // this should be an array of strings so parse into array
            res = res.replace('[', '').replace(']', '').replaceAll("'", '');
            return res.split(',');
        } else {
            // this should just be a single value so remove surrounding quotes
            return res.replaceAll("'", '');
        }
    }

    /**
     * Find the file at given path and get its contents.
     *
     * @param pathString The full path to the file to get the contents for.
     * @returns The contents of the file at the given path.
     */
    private getFileContents(pathString: string): string {
        const path: string[] = pathString.split('/');
        return FileUtil.read(__dirname, '..', '..', '..', '..', ...path);
    }
}
