/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/license
 */

import { JSONOutput } from 'typedoc';
import {
    EnumMemberParser,
    EnumParser as TypedocEnumParser,
    ReflectionKind,
    SourceParser
} from 'typedoc-json-parser';

import { CommentParser } from '../misc-parsers';
import { EnumParserData } from './interfaces/data.interface';
import { EnumParserJson } from './interfaces/json.interface';

/**
 * Parses data from an enum reflection.
 * @since 1.0.0
 */
export class EnumParser extends TypedocEnumParser {
    /**
     * The comment parser of this enum.
     * @since 1.0.0
     */
    public override readonly comment: CommentParser;

    public constructor(data: EnumParserData) {
        super(data);

        const { comment } = data;

        this.comment = new CommentParser(comment);
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): EnumParserJson {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON()
        };
    }

    /**
     * Generates a new {@link EnumParser} instance from the given Json data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection
    ): EnumParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            comment = { summary: [] },
            sources = [],
            flags,
            children = []
        } = reflection;

        if (kind !== ReflectionKind.Enum)
            throw new Error(
                `Expected Enum (${ReflectionKind.Enum}), but received ${kindString} (${kind})`
            );

        const members = children
            .filter((child) => child.kind === ReflectionKind.EnumMember)
            .map((child) => EnumMemberParser.generateFromTypeDoc(child, id));

        return new EnumParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            external: Boolean(flags.isExternal),
            members
        });
    }

    /**
     * Generates a new {@link EnumParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromJson(
        json: TypedocEnumParser.Json
    ): EnumParser {
        const { id, name, comment, source, external, members } = json;

        return new EnumParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            source: source ? SourceParser.generateFromJson(source) : null,
            external,
            members: members.map((property) =>
                EnumMemberParser.generateFromJson(property)
            )
        });
    }
}
