import { ComponentDecoratorParser } from '../../../../parsers/decorators/parsers/component-decorator.parser';
import { DecoratorParser } from '../../../../parsers/decorators/parsers/decorator.parser';
import { DirectiveDecoratorParser } from '../../../../parsers/decorators/parsers/directive-decorator.parser';
import { JSONOutput, ReflectionKind } from 'typedoc';
import {
    CommentParser,
    TypeParameterParser,
    SourceParser
} from '../misc-parsers';
import { Parser } from '../parser';
import {
    generateFromJson,
    generateFromTypeDoc,
    TypeParser
} from '../type-parsers';
import { ClassConstructorParser } from './class-constructor';
import { ClassMethodParser } from './class-method';
import { ClassPropertyParser } from './class-property';
import { ClassParserData } from './interfaces/data.interface';
import { ClassParserJson } from './interfaces/json.interface';

/**
 * Parses data from a class reflection.
 * @since 1.0.0
 */
export class ClassParser extends Parser {
    /**
     * The comment parser of this class.
     * @since 1.0.0
     */
    public readonly comment: CommentParser;

    /**
     * Whether this class is external.
     * @since 1.0.0
     */
    public readonly external: boolean;

    /**
     * Whether this class is abstract.
     * @since 1.0.0
     */
    public readonly abstract: boolean;

    /**
     * The `extends` type of this class.
     * @since 1.0.0
     */
    public readonly extendsType: TypeParser | null;

    /**
     * The `implements` type of this class.
     * @since 1.0.0
     */
    public readonly implementsType: TypeParser[];

    /**
     * The type parameter parsers of this class.
     * @since 6.0.0
     */
    public readonly typeParameters: TypeParameterParser[];

    /**
     * The constructor parser of this class.
     * @since 1.0.0
     */
    public readonly construct: ClassConstructorParser;

    /**
     * The property parsers of this class.
     * @since 1.0.0
     */
    public readonly properties: ClassPropertyParser[];

    /**
     * The method parsers of this class.
     * @since 1.0.0
     */
    public readonly methods: ClassMethodParser[];

    public readonly decorator?: DecoratorParser;

    public constructor(data: ClassParserData) {
        super(data);

        const {
            comment,
            external,
            abstract,
            extendsType,
            implementsType,
            typeParameters,
            construct,
            properties,
            methods
        } = data;

        this.comment = comment;
        this.external = external;
        this.abstract = abstract;
        this.extendsType = extendsType;
        this.implementsType = implementsType;
        this.typeParameters = typeParameters;
        this.construct = construct;
        this.properties = properties;
        this.methods = methods;

        // manually parse and add decorator data since TypeDoc doesn't contain
        // this info anymore...
        if (this.source) {
            const path: string = `${this.source.path}/${this.source.file}`;
            if (this.name.includes('Component')) {
                this.decorator = new ComponentDecoratorParser(path);
            } else if (this.name.includes('Directive')) {
                this.decorator = new DirectiveDecoratorParser(path);
            }
        }
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): ClassParserJson {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            external: this.external,
            abstract: this.abstract,
            extendsType: this.extendsType ? this.extendsType.toJSON() : null,
            implementsType: this.implementsType.map((implementsType) =>
                implementsType.toJSON()
            ),
            typeParameters: this.typeParameters.map((typeParameter) =>
                typeParameter.toJSON()
            ),
            construct: this.construct.toJSON(),
            properties: this.properties,
            methods: this.methods
        };
    }

    /**
     * Generates a new {@link ClassParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection
    ): ClassParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            comment = { summary: [] },
            sources = [],
            flags,
            children = [],
            extendedTypes = [],
            implementedTypes = [],
            typeParameters = []
        } = reflection;

        if (kind !== ReflectionKind.Class)
            throw new Error(
                `Expected Project (${ReflectionKind.Project}), but received ${kindString} (${kind})`
            );

        const construct = children.find(
            (child) => child.kind === ReflectionKind.Constructor
        );

        if (construct === undefined)
            throw new Error(
                `Expected Class (${ReflectionKind.Class}) with a constructor, but there was none`
            );

        const properties = children
            .filter(
                (child) =>
                    child.kind === ReflectionKind.Property ||
                    (child.kind === ReflectionKind.Accessor &&
                        child.getSignature)
            )
            .map((child) => ClassPropertyParser.generateFromTypeDoc(child, id));

        const methods = children
            .filter((child) => child.kind === ReflectionKind.Method)
            .map((child) => ClassMethodParser.generateFromTypeDoc(child, id));

        return new ClassParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            external: Boolean(flags.isExternal),
            abstract: Boolean(flags.isAbstract),
            extendsType: extendedTypes.length
                ? generateFromTypeDoc(extendedTypes[0])
                : null,
            implementsType: implementedTypes.map((implementedType) =>
                generateFromTypeDoc(implementedType)
            ),
            typeParameters: typeParameters.map((typeParameter) =>
                TypeParameterParser.generateFromTypeDoc(typeParameter)
            ),
            construct: ClassConstructorParser.generateFromTypeDoc(
                construct,
                id
            ),
            properties,
            methods
        });
    }

    /**
     * Generates a new {@link ClassParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(json: ClassParserJson): ClassParser {
        const {
            id,
            name,
            comment,
            source,
            external,
            abstract,
            extendsType,
            implementsType,
            typeParameters,
            construct,
            properties,
            methods
        } = json;

        return new ClassParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            source: source ? SourceParser.generateFromJson(source) : null,
            external,
            abstract,
            extendsType: extendsType ? generateFromJson(extendsType) : null,
            implementsType: implementsType.map((implementedType) =>
                generateFromJson(implementedType)
            ),
            typeParameters: typeParameters.map((typeParameter) =>
                TypeParameterParser.generateFromJson(typeParameter)
            ),
            construct: ClassConstructorParser.generateFromJson(construct),
            properties: properties.map((property) =>
                ClassPropertyParser.generateFromJson(property)
            ),
            methods: methods.map((method) =>
                ClassMethodParser.generateFromJson(method)
            )
        });
    }
}
