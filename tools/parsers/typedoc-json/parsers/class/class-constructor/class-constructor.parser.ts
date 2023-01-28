import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../../../enums';
import {
    CommentParser,
    ParameterParser,
    SourceParser
} from '../../misc-parsers';
import { Parser } from '../../parser';
import { ClassParserAccessibility } from '../enums/accessibility.enum';
import { ClassConstructorParserData } from './interfaces/data.interface';
import { ClassConstructorParserJson } from './interfaces/json.interface';

export class ClassConstructorParser extends Parser {
    /**
     * The comment parser of this constructor.
     */
    public readonly comment: CommentParser;

    /**
     * The id of the parent class parser.
     */
    public readonly parentId: number;

    /**
     * The accessibility of this constructor.
     */
    public accessibility: ClassParserAccessibility;

    /**
     * The parameter parsers of this constructor.
     */
    public readonly parameters: ParameterParser[];

    public constructor(data: ClassConstructorParserData) {
        super(data);

        const { comment, parentId, accessibility, parameters } = data;

        this.comment = comment;
        this.parentId = parentId;
        this.accessibility = accessibility;
        this.parameters = parameters;
    }

    /**
     * Whether or not this constructor has a public accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    public isPublic(): boolean {
        return this.accessibility === ClassParserAccessibility.Public;
    }

    /**
     * Whether or not this constructor has a protected accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    public isProtected(): boolean {
        return this.accessibility === ClassParserAccessibility.Protected;
    }

    /**
     * Whether or not this constructor has a private accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    public isPrivate(): boolean {
        return this.accessibility === ClassParserAccessibility.Private;
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): ClassConstructorParserJson {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            parentId: this.parentId,
            accessibility: this.accessibility,
            parameters: this.parameters.map((parameter) => parameter.toJSON())
        };
    }

    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection,
        parentId: number
    ): ClassConstructorParser {
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

        if (kind !== ReflectionKind.Constructor) {
            throw new Error(
                `Expected Constructor (${ReflectionKind.Constructor}), but received ${kindString} (${kind})`
            );
        }

        const signature = signatures.find(
            (signature) =>
                signature.kind === ReflectionKind.ConstructorSignature
        );

        if (signature === undefined)
            throw new Error(
                `Expected Constructor (${ReflectionKind.Constructor}) with a signature, but there was none`
            );

        const { parameters = [] } = signature;

        return new ClassConstructorParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            parentId,
            accessibility: flags.isPrivate
                ? ClassParserAccessibility.Private
                : flags.isProtected
                ? ClassParserAccessibility.Protected
                : ClassParserAccessibility.Public,
            parameters: parameters.map((parameter) =>
                ParameterParser.generateFromTypeDoc(parameter)
            )
        });
    }

    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(
        json: ClassConstructorParserJson
    ): ClassConstructorParser {
        const {
            id,
            name,
            comment,
            source,
            parentId,
            accessibility,
            parameters
        } = json;

        return new ClassConstructorParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            source: source ? SourceParser.generateFromJson(source) : null,
            parentId,
            accessibility,
            parameters: parameters.map((parameter) =>
                ParameterParser.generateFromJson(parameter)
            )
        });
    }
}
