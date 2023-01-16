import { JSONOutput, ReflectionKind } from 'typedoc';
import {
    generateFromJson,
    generateFromTypeDoc,
    TypeParser
} from '../../type-parsers';
import { CommentParser } from '../comment';
import { ParameterParserData } from './interfaces/data.interface';
import { ParameterParserJson } from './interfaces/json.interface';

/**
 * Parses data from a parameter reflection.
 * @since 1.0.0
 */
export class ParameterParser {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    public readonly id: number;

    /**
     * The name of this parameter.
     * @since 1.0.0
     */
    public readonly name: string;

    /**
     * The comment of this parameter.
     * @since 5.3.0
     */
    public readonly comment: CommentParser;

    /**
     * The type of this parameter.
     * @since 1.0.0
     */
    public readonly type: TypeParser;

    public constructor(data: ParameterParserData) {
        const { id, name, comment, type } = data;

        this.id = id;
        this.name = name;
        this.comment = comment;
        this.type = type;
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): ParameterParserJson {
        return {
            id: this.id,
            name: this.name,
            comment: this.comment.toJSON(),
            type: this.type.toJSON()
        };
    }

    /**
     * Generates a new {@link ParameterParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection
    ): ParameterParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            comment = { summary: [] },
            type
        } = reflection;

        if (kind !== ReflectionKind.Parameter) {
            throw new Error(
                `Expected Parameter (${ReflectionKind.Parameter}), but received ${kindString} (${kind})`
            );
        }

        return new ParameterParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            type: generateFromTypeDoc(type!)
        });
    }

    /**
     * Generates a new {@link ClassConstructorParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(json: ParameterParserJson): ParameterParser {
        const { id, name, comment, type } = json;

        return new ParameterParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            type: generateFromJson(type)
        });
    }
}
