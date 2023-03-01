/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { ReferenceTypeParser, TypeParser } from 'typedoc-json-parser';

import { FileUtil } from '../../util/file.util';
import { WorkspaceParser } from './parsers/workspace/workspace.parser';

/**
 * The `TypedocJsonParser` reads and parses the JSON output from typedoc into
 * the `workspaceParser`, making it easier to work with to generate markdown
 * needed for workspace documentation.
 */
export class TypedocJsonParser {
    workspaceParser: WorkspaceParser;

    constructor(fileName: string) {
        const str = FileUtil.read(__dirname, '..', '..', '..', fileName);
        const data = JSON.parse(str);
        this.initOverrides();
        this.workspaceParser = new WorkspaceParser({ data });
    }

    /**
     * Initialize all overridden methods needed for custom parser.
     */
    private initOverrides() {
        ReferenceTypeParser.formatToString = (
            options: TypeParser.FormatToStringOptions<ReferenceTypeParser>
        ) => {
            const { parser, project } = options;
            const typeArguments =
                parser.typeArguments.length > 0
                    ? `<${parser.typeArguments
                          .map((type) => type.toString(project))
                          .join(', ')}>`
                    : '';

            return `${parser.name}${typeArguments}`;
        };
    }
}
