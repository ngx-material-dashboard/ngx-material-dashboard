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
    InterfaceMethodParser,
    InterfaceParser as TypedocInterfaceParser,
    InterfacePropertyParser,
    ReflectionKind,
    SourceParser,
    TypeParameterParser
} from 'typedoc-json-parser';

import { CommentParser } from '../misc-parsers';
import { InterfaceParserData } from './interfaces/data.interface';
import { InterfaceParserJson } from './interfaces/json.interface';

/**
 * Parses data from an interface reflection.
 */
export class InterfaceParser extends TypedocInterfaceParser {
    /**
     * The comment parser of this interface.
     */
    public override readonly comment: CommentParser;

    public constructor(data: InterfaceParserData) {
        super(data);

        const { comment } = data;

        this.comment = new CommentParser(comment);
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): InterfaceParserJson {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            external: this.external,
            typeParameters: this.typeParameters.map((typeParameter) =>
                typeParameter.toJSON()
            ),
            properties: this.properties.map((parser) => parser.toJSON()),
            methods: this.methods.map((parser) => parser.toJSON())
        };
    }

    /**
     * Generates a new {@link InterfaceParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection
    ): InterfaceParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            comment = { summary: [] },
            sources = [],
            flags,
            typeParameters = [],
            children = []
        } = reflection;

        if (kind !== ReflectionKind.Interface)
            throw new Error(
                `Expected Interface (${ReflectionKind.Interface}), but received ${kindString} (${kind})`
            );

        const properties = children
            .filter((child) => child.kind === ReflectionKind.Property)
            .map((child) =>
                InterfacePropertyParser.generateFromTypeDoc(child, id)
            );

        const methods = children
            .filter((child) => child.kind === ReflectionKind.Method)
            .map((child) =>
                InterfaceMethodParser.generateFromTypeDoc(child, id)
            );

        return new InterfaceParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            external: Boolean(flags.isExternal),
            typeParameters: typeParameters.map((typeParameter) =>
                TypeParameterParser.generateFromTypeDoc(typeParameter)
            ),
            properties,
            methods
        });
    }

    /**
     * Generates a new {@link InterfaceParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromJson(
        json: TypedocInterfaceParser.Json
    ): InterfaceParser {
        const {
            id,
            name,
            comment,
            source,
            external,
            typeParameters,
            properties,
            methods
        } = json;

        return new InterfaceParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            source: source ? SourceParser.generateFromJson(source) : null,
            external,
            typeParameters: typeParameters.map((typeParameter) =>
                TypeParameterParser.generateFromJson(typeParameter)
            ),
            properties: properties.map((parser) =>
                InterfacePropertyParser.generateFromJson(parser)
            ),
            methods: methods.map((parser) =>
                InterfaceMethodParser.generateFromJson(parser)
            )
        });
    }
}
