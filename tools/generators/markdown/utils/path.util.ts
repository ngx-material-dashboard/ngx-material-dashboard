/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import * as path from 'path';
import { SearchResult } from 'typedoc-json-parser';

import {
    MODULE_TYPE_DIRECTORY_MAP,
    reformatText
} from '../../../generators/documentation/helpers';

export class PathUtil {
    // add module type to output path hierarchy if it exists
    public static buildOutputPath(outputPath: string, t: SearchResult) {
        const moduleType = this.getModuleType(t);
        if (moduleType) {
            outputPath = path.join(outputPath, moduleType);
        }

        // add formatted class name to directory hierarchy
        return path.join(outputPath, reformatText(t.name));
    }

    private static getModuleType(t: SearchResult): string | undefined {
        let moduleType;
        Object.keys(MODULE_TYPE_DIRECTORY_MAP).forEach((key: string) => {
            if (t.name.includes(key)) {
                moduleType = MODULE_TYPE_DIRECTORY_MAP[key];
            }
            // else if (t.sources[0].fileName.includes(key)) {
            //     moduleType = MODULE_TYPE_DIRECTORY_MAP[key];
            // }
        });
        return moduleType;
    }

    /**
     * Returns a substring of the given directory making it relative to the
     * given relativeBase. Essentially this finds the starting index of the
     * given relativeBase in the given directory and creates returns a
     * substring of the directory from there.
     *
     * @param directory The directory to make relative.
     * @param relativeBase The path in the directory to make relative to.
     * @returns A substring of the given directory starting at relativeBase.
     */
    public static makeRelativeTo(directory: string, relativeBase: string) {
        return directory.substring(directory.indexOf(relativeBase));
    }
}
