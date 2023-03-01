/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { TypeAliasParser as TypedocTypeAliasParser } from 'typedoc-json-parser';
import { CommentParserJson } from '../../misc-parsers';

export interface TypeAliasParserJson extends TypedocTypeAliasParser.Json {
    /**
     * The comment parser of this type alias.
     * @since 1.0.0
     */
    comment: CommentParserJson;
}
