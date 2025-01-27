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
    FunctionParser as TypedocFunctionParser,
    ReflectionKind,
    SourceParser
} from 'typedoc-json-parser';

import { CommentParser } from '../misc-parsers';
import { SignatureParser } from '../misc-parsers/signature';
import { FunctionParserData } from './interfaces/data.interface';
import { FunctionParserJson } from './interfaces/json.interface';

/**
 * Parses data from a function reflection.
 */
export class FunctionParser extends TypedocFunctionParser {
    /**
     * The comment parser of this function.
     */
    public override readonly comment: CommentParser;
    public override readonly signatures: SignatureParser[];

    public constructor(data: FunctionParserData) {
        super(data);

        const { comment, signatures } = data;

        this.comment = new CommentParser(comment);
        this.signatures = [];
        signatures.forEach((s) => {
            this.signatures.push(new SignatureParser(s));
        });
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): FunctionParserJson {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            external: this.external,
            signatures: this.signatures.map((signature) => signature.toJSON())
        };
    }

    /**
     * Generates a new {@link FunctionParser} instance from the given data.
     *
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection
    ): FunctionParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            comment = { summary: [] },
            sources = [],
            flags,
            signatures = []
        } = reflection;

        if (kind !== ReflectionKind.Function)
            throw new Error(
                `Expected Function (${ReflectionKind.Function}), but received ${kindString} (${kind})`
            );

        return new FunctionParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            external: Boolean(flags.isExternal),
            signatures: signatures.map((signature) =>
                SignatureParser.generateFromTypeDoc(signature)
            )
        });
    }

    /**
     * Generates a new {@link FunctionParser} instance from the given data.
     *
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromJson(
        json: TypedocFunctionParser.Json
    ): FunctionParser {
        const { id, name, comment, source, external, signatures } = json;

        return new FunctionParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            source: source ? SourceParser.generateFromJson(source) : null,
            external,
            signatures: signatures.map((signature) =>
                SignatureParser.generateFromJson(signature)
            )
        });
    }
}
