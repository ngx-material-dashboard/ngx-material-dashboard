import { ReflectionKind } from '../../../enums';
import { JSONOutput } from 'typedoc';
import { CommentParser, SourceParser } from '../../misc-parsers';
import { Parser } from '../../parser';
import { generateFromTypeDoc } from '../../type-parsers';
import { EnumMemberParserData } from './interfaces/data.interface';
import { EnumMemberParserJson } from './interfaces/json.interface';

/**
 * Parses data from an enum property reflection.
 * @since 1.0.0
 */
export class EnumMemberParser extends Parser {
    /**
     * The comment parser of this property.
     * @since 1.0.0
     */
    public readonly comment: CommentParser;

    /**
     * The id of the parent enum parser.
     * @since 4.0.0
     */
    public readonly parentId: number;

    /**
     * The value of this enum property.
     * @since 1.0.0
     */
    public readonly value: string;

    public constructor(data: EnumMemberParserData) {
        super(data);

        const { comment, parentId, value } = data;

        this.comment = comment;
        this.parentId = parentId;
        this.value = value;
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): EnumMemberParserJson {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            parentId: this.parentId,
            value: this.value
        };
    }

    /**
     * Generates a new {@link EnumMemberParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection,
        parentId: number
    ): EnumMemberParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            comment = { summary: [] },
            sources = [],
            type
        } = reflection;

        if (kind !== ReflectionKind.EnumMember) {
            throw new Error(
                `Expected EnumMember (${ReflectionKind.EnumMember}), but received ${kindString} (${kind})`
            );
        }

        return new EnumMemberParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            parentId,
            value: generateFromTypeDoc(type!).toString()
        });
    }

    /**
     * Generates a new {@link EnumMemberParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(
        json: EnumMemberParserJson
    ): EnumMemberParser {
        const { id, name, comment, source, parentId, value } = json;

        return new EnumMemberParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            source: source ? SourceParser.generateFromJson(source) : null,
            parentId,
            value
        });
    }
}
