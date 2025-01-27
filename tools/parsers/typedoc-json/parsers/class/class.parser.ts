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
    ClassConstructorParser,
    ClassParser as TypedocClassParser,
    ClassPropertyParser,
    ReflectionKind,
    SourceParser,
    TypeParameterParser
} from 'typedoc-json-parser';
import { ComponentDecoratorParser } from '../../../../parsers/decorators/parsers/component-decorator.parser';
import { DecoratorParser } from '../../../../parsers/decorators/parsers/decorator.parser';
import { DirectiveDecoratorParser } from '../../../../parsers/decorators/parsers/directive-decorator.parser';
import { PropertyDecoratorParser } from '../../../../parsers/decorators/parsers/property-decorator.parser';
import { CommentParser } from '../misc-parsers';
import { generateFromJson, generateFromTypeDoc } from '../type-parsers';
import { ClassParserJson } from './interfaces/json.interface';
import { PropertyParser } from './property/property.parser';
import { MethodParser } from './method/method.parser';

/**
 * Parses data from a class reflection.
 * @since 1.0.0
 */
export class ClassParser extends TypedocClassParser {
    public override readonly comment: CommentParser;
    public readonly decorator?: DecoratorParser;
    public readonly sortedProperties: ClassPropertyParser[] = [];

    public constructor(data: TypedocClassParser.Data) {
        super(data);

        const { comment } = data;
        this.comment = new CommentParser(comment);

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

        const properties = this.properties as PropertyParser[];
        this.sortedProperties = properties.sort(ClassParser.sortProperties);
    }

    static sortProperties(a: PropertyParser, b: PropertyParser): number {
        if (a.decorator?.type && b.decorator?.type) {
            if (a.decorator.type === b.decorator.type) {
                return a.name.localeCompare(b.name);
            } else {
                return (
                    PropertyDecoratorParser.decoratorTypes.indexOf(
                        a.decorator.type
                    ) -
                    PropertyDecoratorParser.decoratorTypes.indexOf(
                        b.decorator.type
                    )
                );
            }
        } else if (!a.decorator && !b.decorator) {
            return a.name.localeCompare(b.name);
        } else if (a.decorator) {
            return -1;
        } else {
            return 1;
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
            methods: this.methods,
            decorator: this.decorator
        };
    }

    /**
     * Generates a new {@link ClassParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static override generateFromTypeDoc(
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
            .map((child) => PropertyParser.generateFromTypeDoc(child, id));

        const methods = children
            .filter((child) => child.kind === ReflectionKind.Method)
            .map((child) => MethodParser.generateFromTypeDoc(child, id));

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
    public static override generateFromJson(
        json: TypedocClassParser.Json
    ): ClassParser {
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
                PropertyParser.generateFromJson(property)
            ),
            methods: methods.map((method) =>
                MethodParser.generateFromJson(method)
            )
        });
    }
}
