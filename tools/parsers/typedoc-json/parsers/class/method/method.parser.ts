import {
    ClassMethodParser,
    ClassParser,
    ReflectionKind,
    SourceParser
} from 'typedoc-json-parser';

import { DecoratorParser } from '../../../../../parsers/decorators/parsers/decorator.parser';
import { CommentParser, SignatureParser } from '../../misc-parsers';
import { JSONOutput } from 'typedoc';
import { MethodParserData } from './interfaces/data.interface';

export class MethodParser extends ClassMethodParser {
    public readonly comment?: CommentParser;
    public readonly decorator?: DecoratorParser;

    public constructor(data: MethodParserData) {
        super(data);

        this.comment = new CommentParser(this.signatures[0].comment);
    }

    /**
     * Converts this parser to a json compatible format.
     * @since 1.0.0
     * @returns The json compatible format of this parser.
     */
    public override toJSON(): ClassMethodParser.Json {
        return {
            ...super.toJSON(),
            parentId: this.parentId,
            accessibility: this.accessibility,
            abstract: this.abstract,
            static: this.static,
            signatures: this.signatures.map((signature) => signature.toJSON())
        };
    }

    /**
     * Generates a new {@link ClassPropertyParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection,
        parentId: number
    ): MethodParser {
        const {
            kind,
            id,
            name,
            sources = [],
            flags,
            signatures = []
        } = reflection;

        if (kind !== ReflectionKind.Method) {
            throw new Error(
                `Expected Method (${ReflectionKind.Method}), but received ${kind} (${kind}). NAME=${name};ID=${id}`
            );
        }

        return new MethodParser({
            id,
            name,
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            parentId,
            accessibility: flags.isPrivate
                ? ClassParser.Accessibility.Private
                : flags.isProtected
                ? ClassParser.Accessibility.Protected
                : ClassParser.Accessibility.Public,
            abstract: Boolean(flags.isAbstract),
            static: Boolean(flags.isStatic),
            signatures: signatures.map((signature) =>
                SignatureParser.generateFromTypeDoc(signature)
            )
        });
    }

    /**
     * Generates a new {@link ClassPropertyParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromJson(
        json: ClassMethodParser.Json
    ): MethodParser {
        const {
            id,
            name,
            source,
            parentId,
            accessibility,
            abstract,
            static: _static,
            signatures
        } = json;

        return new MethodParser({
            id,
            name,
            source: source ? SourceParser.generateFromJson(source) : null,
            parentId,
            accessibility,
            abstract,
            static: _static,
            signatures: signatures.map((signature) =>
                SignatureParser.generateFromJson(signature)
            )
        });
    }
}
