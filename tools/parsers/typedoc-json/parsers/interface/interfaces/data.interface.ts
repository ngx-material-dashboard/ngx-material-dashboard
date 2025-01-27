/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { InterfaceParser as TypedocInterfaceParser } from 'typedoc-json-parser';

import { CommentParser } from '../../misc-parsers';

export interface InterfaceParserData extends TypedocInterfaceParser.Data {
    /**
     * The comment parser of this interface.
     */
    comment: CommentParser;
}
