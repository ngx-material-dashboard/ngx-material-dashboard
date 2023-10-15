/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { ClassMethodParser } from 'typedoc-json-parser';
import { CommentParser } from '../../../misc-parsers';

export interface MethodParserData extends ClassMethodParser.Data {
    /**
     * The comment parser of this class.
     */
    comment?: CommentParser;
}
