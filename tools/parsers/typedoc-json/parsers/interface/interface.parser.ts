import { JSONOutput } from 'typedoc';
import { ReflectionKind } from '../../enums';
import {
    CommentParser,
    SourceParser,
    TypeParameterParser
} from '../misc-parsers';
import { Parser } from '../parser';
import { InterfaceMethodParser } from './interface-method';
import { InterfacePropertyParser } from './interface-property';
import { InterfaceParserData } from './interfaces/data.interface';
import { InterfaceParserJson } from './interfaces/json.interface';

/**
 * Parses data from an interface reflection.
 */
export class InterfaceParser extends Parser {
    /**
     * The comment parser of this interface.
     */
    public readonly comment: CommentParser;

    /**
     * Whether this interface is external.
     */
    public readonly external: boolean;

    /**
     * The type parameters of this interface.
     */
    public readonly typeParameters: TypeParameterParser[];

    /**
     * The property parsers of this interface.
     */
    public readonly properties: InterfacePropertyParser[];

    /**
     * The method parsers of this interface.
     */
    public readonly methods: InterfaceMethodParser[];

    public constructor(data: InterfaceParserData) {
        super(data);

        const { comment, external, typeParameters, properties, methods } = data;

        this.comment = comment;
        this.external = external;
        this.typeParameters = typeParameters;
        this.properties = properties;
        this.methods = methods;
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
    public static generateFromTypeDoc(
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
    public static generateFromJson(json: InterfaceParserJson): InterfaceParser {
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
