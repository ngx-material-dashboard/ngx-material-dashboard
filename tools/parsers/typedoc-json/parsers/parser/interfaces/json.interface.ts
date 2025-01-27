/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { SourceParser } from 'typedoc-json-parser';

export interface ParserJson {
    /**
     * The identifier for this parser.
     * @since 1.0.0
     */
    id: number;

    /**
     * The name for this parser.
     * @since 1.0.0
     */
    name: string;

    /**
     * The source parser for this parser in a Json compatible format.
     * @since 1.0.0
     */
    source: SourceParser.Json | null;
}
