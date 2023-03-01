/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { InterfaceParser as TypedocInterfaceParser } from 'typedoc-json-parser';

import { CommentParserJson } from '../../misc-parsers';

export interface InterfaceParserJson extends TypedocInterfaceParser.Json {
    /**
     * The comment parser of this interface.
     * @since 1.0.0
     */
    comment: CommentParserJson;
}
