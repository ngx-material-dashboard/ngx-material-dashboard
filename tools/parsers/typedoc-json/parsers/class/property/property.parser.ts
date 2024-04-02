import {
    ClassParser,
    ClassPropertyParser,
    ReflectionKind,
    SourceParser,
    TypeParser
} from 'typedoc-json-parser';

import { PropertyDecoratorParser } from '../../../../../parsers/decorators/parsers/property-decorator.parser';
import { CommentParser } from '../../misc-parsers';
import { JSONOutput } from 'typedoc';

export class PropertyParser extends ClassPropertyParser {
    public override readonly comment: CommentParser;
    public readonly decorator?: PropertyDecoratorParser;

    public constructor(data: ClassPropertyParser.Data) {
        super(data);

        const { comment } = data;
        this.comment = new CommentParser(comment);

        if (this.source) {
            const path: string = `${this.source.path}/${this.source.file}`;
            // source line is not 0 based, so subtract 1 since file contents
            // parsed into array of strings (each element a line in the file)
            const decorator: PropertyDecoratorParser =
                new PropertyDecoratorParser(path, this.source.line - 1);
            if (decorator.type) {
                this.decorator = decorator;
            }
        }
    }

    /**
     * Converts this parser to a json compatible format.
     * @since 1.0.0
     * @returns The json compatible format of this parser.
     */
    public override toJSON(): ClassPropertyParser.Json {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            parentId: this.parentId,
            accessibility: this.accessibility,
            abstract: this.abstract,
            static: this.static,
            readonly: this.readonly,
            optional: this.optional,
            type: this.type.toJSON()
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
    ): PropertyParser {
        const {
            kind,
            id,
            name,
            comment = { summary: [] },
            sources = [],
            type,
            flags,
            getSignature
        } = reflection;

        if (
            kind !== ReflectionKind.Property &&
            kind !== ReflectionKind.Accessor
        ) {
            throw new Error(
                `Expected Property (${ReflectionKind.Property}) or Accessor (${ReflectionKind.Accessor}), but received ${kind} (${kind}). NAME=${name};ID=${id}`
            );
        }

        if (kind === ReflectionKind.Accessor) {
            if (getSignature === undefined) {
                throw new Error(
                    `Expected Accessor (${ReflectionKind.Accessor}) with a getter, but there was none`
                );
            }

            const {
                id,
                name,
                comment = { summary: [] },
                type,
                flags
            } = getSignature;

            return new PropertyParser({
                id,
                name,
                comment: CommentParser.generateFromTypeDoc(comment),
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
                readonly: Boolean(flags.isReadonly),
                optional: Boolean(flags.isOptional),
                type: TypeParser.generateFromTypeDoc(type!)
            });
        }

        return new PropertyParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
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
            readonly: Boolean(flags.isReadonly),
            optional: Boolean(flags.isOptional),
            type: TypeParser.generateFromTypeDoc(type!)
        });
    }

    /**
     * Generates a new {@link ClassPropertyParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromJson(
        json: ClassPropertyParser.Json
    ): ClassPropertyParser {
        const {
            id,
            name,
            comment,
            source,
            parentId,
            accessibility,
            abstract,
            static: _static,
            readonly,
            optional,
            type
        } = json;

        return new ClassPropertyParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            source: source ? SourceParser.generateFromJson(source) : null,
            parentId,
            accessibility,
            abstract,
            static: _static,
            readonly,
            optional,
            type: TypeParser.generateFromJson(type)
        });
    }
}
