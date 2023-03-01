/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { CommentParser } from 'typedoc-json-parser';

/**
 * A tag of a comment.
 * @since 1.0.0
 */
export interface BlockTag extends CommentParser.BlockTag {
    /**
     * The text of this tag.
     * @since 1.0.0
     */
    textArray: string[];
}
