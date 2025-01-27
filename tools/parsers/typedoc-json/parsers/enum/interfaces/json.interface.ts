/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { EnumParser } from 'typedoc-json-parser';
import { CommentParserJson } from '../../misc-parsers';

export interface EnumParserJson extends EnumParser.Json {
    /**
     * The comment parser of this enum.
     */
    comment: CommentParserJson;
}
