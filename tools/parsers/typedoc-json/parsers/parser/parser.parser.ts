/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { SourceParser } from 'typedoc-json-parser';
import { ParserData } from './interfaces/data.interface';
import { ParserJson } from './interfaces/json.interface';

/**
 * The base parser for all top level exported parsers.
 * @since 1.0.0
 */
export abstract class Parser {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    public readonly id: number;

    /**
     * The name of this parser.
     * @since 1.0.0
     */
    public readonly name: string;

    /**
     * The source parser for this parser.
     * @since 1.0.0
     */
    public readonly source: SourceParser | null;

    public constructor(data: ParserData) {
        const { id, name, source } = data;

        this.id = id;
        this.name = name;
        this.source = source;
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): ParserJson {
        return {
            id: this.id,
            name: this.name,
            source: this.source ? this.source.toJSON() : null
        };
    }
}
