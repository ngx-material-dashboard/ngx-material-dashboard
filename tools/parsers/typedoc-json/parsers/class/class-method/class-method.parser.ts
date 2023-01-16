import { ReflectionKind } from '../../../enums';
import { JSONOutput } from 'typedoc';
import { SignatureParser, SourceParser } from '../../misc-parsers';
import { Parser } from '../../parser';
import { ClassParserAccessibility } from '../enums/accessibility.enum';
import { ClassMethodParserData } from './interfaces/data.interface';
import { ClassMethodParserJson } from './interfaces/json.interface';

/**
 * Parses data from a class method reflection.
 * @since 1.0.0
 */
export class ClassMethodParser extends Parser {
    /**
     * The id of the parent class parser.
     * @since 4.0.0
     */
    public readonly parentId: number;

    /**
     * The accessibility of this method.
     * @since 1.0.0
     */
    public readonly accessibility: ClassParserAccessibility;

    /**
     * Whether this method is abstract.
     * @since 1.0.0
     */
    public readonly abstract: boolean;

    /**
     * Whether this method is static.
     * @since 1.0.0
     */
    public readonly static: boolean;

    /**
     * The signature parsers of this method.
     * @since 1.0.0
     */
    public readonly signatures: SignatureParser[];

    public constructor(data: ClassMethodParserData) {
        super(data);

        const {
            parentId,
            accessibility,
            abstract,
            static: _static,
            signatures
        } = data;

        this.parentId = parentId;
        this.accessibility = accessibility;
        this.abstract = abstract;
        this.static = _static;
        this.signatures = signatures;
    }

    /**
     * Whether or not this method has a public accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    public isPublic(): boolean {
        return this.accessibility === ClassParserAccessibility.Public;
    }

    /**
     * Whether or not this method has a protected accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    public isProtected(): boolean {
        return this.accessibility === ClassParserAccessibility.Protected;
    }

    /**
     * Whether or not this method has a private accessibility.
     * @since 7.0.0
     * @returns The validation boolean.
     */
    public isPrivate(): boolean {
        return this.accessibility === ClassParserAccessibility.Private;
    }

    /**
     * Convert this parser to a JSON compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): ClassMethodParserJson {
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
     * Generates a new {@link ClassMethodParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection,
        parentId: number
    ): ClassMethodParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            sources = [],
            flags,
            signatures = []
        } = reflection;

        if (kind !== ReflectionKind.Method)
            throw new Error(
                `Expected Method (${ReflectionKind.Method}), but received ${kindString} (${kind})`
            );

        return new ClassMethodParser({
            id,
            name,
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            parentId,
            accessibility: flags.isPrivate
                ? ClassParserAccessibility.Private
                : flags.isProtected
                ? ClassParserAccessibility.Protected
                : ClassParserAccessibility.Public,
            abstract: Boolean(flags.isAbstract),
            static: Boolean(flags.isStatic),
            signatures: signatures.map((signature) =>
                SignatureParser.generateFromTypeDoc(signature)
            )
        });
    }

    /**
     * Generates a new {@link ClassMethodParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(
        json: ClassMethodParserJson
    ): ClassMethodParser {
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

        return new ClassMethodParser({
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
