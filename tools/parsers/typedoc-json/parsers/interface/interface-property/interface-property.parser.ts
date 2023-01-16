import { ReflectionKind } from '../../../enums';
import { JSONOutput } from 'typedoc';
import { CommentParser, SourceParser } from '../../misc-parsers';
import { Parser } from '../../parser';
import {
    generateFromJson,
    generateFromTypeDoc,
    TypeParser
} from '../../type-parsers';
import { InterfacePropertyParserData } from './interfaces/data.interface';
import { InterfacePropertyParserJson } from './interfaces/json.interface';

/**
 * Parses data from an interface property reflection.
 * @since 1.0.0
 */
export class InterfacePropertyParser extends Parser {
    /**
     * The comment parser of this property.
     * @since 1.0.0
     */
    public readonly comment: CommentParser;

    /**
     * The id of the parent interface parser.
     * @since 4.0.0
     */
    public readonly parentId: number;

    /**
     * Whether this interface property is readonly.
     * @since 1.0.0
     */
    public readonly readonly: boolean;

    /**
     * The type of this property.
     * @since 1.0.0
     */
    public readonly type: TypeParser;

    public constructor(data: InterfacePropertyParserData) {
        super(data);

        const { comment, parentId, readonly, type } = data;

        this.comment = comment;
        this.parentId = parentId;
        this.readonly = readonly;
        this.type = type;
    }

    /**
     * Converts this parser to a JSON compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public override toJSON(): InterfacePropertyParserJson {
        return {
            ...super.toJSON(),
            comment: this.comment.toJSON(),
            parentId: this.parentId,
            readonly: this.readonly,
            type: this.type.toJSON()
        };
    }

    /**
     * Generates a new {@link InterfacePropertyParser} instance from the given data.
     * @since 1.0.0
     * @param reflection The reflection to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromTypeDoc(
        reflection: JSONOutput.DeclarationReflection,
        parentId: number
    ): InterfacePropertyParser {
        const {
            kind,
            kindString = 'Unknown',
            id,
            name,
            comment = { summary: [] },
            sources = [],
            type,
            flags
        } = reflection;

        if (kind !== ReflectionKind.Property)
            throw new Error(
                `Expected Property (${ReflectionKind.Property}), but received ${kindString} (${kind})`
            );

        return new InterfacePropertyParser({
            id,
            name,
            comment: CommentParser.generateFromTypeDoc(comment),
            source: sources.length
                ? SourceParser.generateFromTypeDoc(sources[0])
                : null,
            parentId,
            readonly: Boolean(flags.isReadonly),
            type: generateFromTypeDoc(type!)
        });
    }

    /**
     * Generates a new {@link InterfacePropertyParser} instance from the given data.
     * @param json The json to generate the parser from.
     * @returns The generated parser.
     */
    public static generateFromJson(
        json: InterfacePropertyParserJson
    ): InterfacePropertyParser {
        const { id, name, comment, source, parentId, readonly, type } = json;

        return new InterfacePropertyParser({
            id,
            name,
            comment: CommentParser.generateFromJson(comment),
            source: source ? SourceParser.generateFromJson(source) : null,
            parentId,
            readonly,
            type: generateFromJson(type)
        });
    }
}
