/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { CommentParserJson, SignatureParserJson } from '../../misc-parsers';
import { ParserJson } from '../../parser';

export interface FunctionParserJson extends ParserJson {
    /**
     * The comment parser of this function.
     */
    comment: CommentParserJson;

    /**
     * Whether this function is external.
     */
    external: boolean;

    /**
     * The signature parsers of this function in a Json compatible format.
     */
    signatures: SignatureParserJson[];
}
