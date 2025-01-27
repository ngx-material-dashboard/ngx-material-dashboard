/**
 * @license
 * Copyright Jonathan Phillips (https://github.com/jphillips03) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://github.com/ngx-material-dashboard/ngx-material-dashboard/blob/main/LICENSE
 */

import { JSONOutput } from 'typedoc';
import {
    ReflectionKind,
    SourceParser,
    TypeAliasParser as TypedocTypeAliasParser,
    TypeParameterParser
} from 'typedoc-json-parser';
import { CommentParser } from '../misc-parsers';
import { Parser } from '../parser';
import { generateFromJson, generateFromTypeDoc } from '../type-parsers';
import { TypeAliasParserData } from './interfaces/data.interface';
import { TypeAliasParserJson } from './interfaces/json.interface';

/**
 * Parses data from a type alias reflection.
 * @since 1.0.0
 */
export class TypeAliasParser extends TypedocTypeAliasParser {
    /**
     * The comment parser of this type alias.
     * @since 1.0.0
     */
    public override readonly comment: CommentParser;

    public constructor(data: TypeAliasParserData) {
        super(data);

        const { comment } = data;

        this.comment = new CommentParser(comment);
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): TypeAliasParserJson {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            external: this.external,
            typeParameters: this.typeParameters.map((typeParameter) =>
                typeParameter.toJSON()
            ),
            type: this.type.toJSON()
        };
    }

    /**
     * Generates a new {@link TypeAliasParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection
    ): TypeAliasParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            comment = { summary: [] },
            sources = [],
            flags,
            type,
            typeParameters = []
        } = reflection;

        if (kind !== ReflectionKind.TypeAlias)
            throw new Error(
                `Expected TypeAlias (${ReflectionKind.TypeAlias}), but received ${kindString} (${kind})`
            );

        return new TypeAliasParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            external: Boolean(flags.isExternal),
            typeParameters: typeParameters.map(
                (typeParameter: JSONOutput.TypeParameterReflection) =>
                    TypeParameterParser.generateFromTypeDoc(typeParameter)
            ),
            type: generateFromTypeDoc(type!)
        });
    }

    /**
     * Generates a new {@link TypeAliasParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromJson(
        json: TypedocTypeAliasParser.Json
    ): TypeAliasParser {
        const { id, name, comment, source, external, typeParameters, type } =
            json;

        return new TypeAliasParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            source: source ? SourceParser.generateFromJson(source) : null,
            external,
            typeParameters: typeParameters.map((typeParameter) =>
                TypeParameterParser.generateFromJson(typeParameter)
            ),
            type: generateFromJson(type)
        });
    }
}
