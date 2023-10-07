/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { CommentParser } from 'typedoc-json-parser';

export interface CommentParserJson extends CommentParser.Json {
    /** List of deprecated notes included in comment. */
    deprecatedNotes?: string;
    /** The list of overviewDetails included in the comment. */
    overviewDetails: CommentParser.BlockTag[];
    /** The type of return value defined in comment. */
    returns?: string;
    /** The first paragraph in the comment. */
    shortText?: string;
    /** Any additional paragraphs after the shortText. */
    text?: string;
    usageNotes: CommentParser.BlockTag[];
}
