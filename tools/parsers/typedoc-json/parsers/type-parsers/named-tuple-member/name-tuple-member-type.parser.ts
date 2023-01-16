import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { NamedTupleMemberTypeParserData } from './interfaces/data.interface';
import { NamedTupleMemberTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a named tuple member.
 */
export class NamedTupleMemberTypeParser implements TypeParser {
    /**
     * The name of this named tuple member.
     */
    public readonly kind = Kind.NamedTupleMember;

    /**
     * The name of this named tuple member.
     */
    public readonly name: string;

    /**
     * The type of this named tuple member.
     */
    public readonly type: TypeParser;

    /**
     * Whether this named tuple member is optional.
     */
    public readonly optional: boolean;

    public constructor(data: NamedTupleMemberTypeParserData) {
        const { name, type, optional } = data;

        this.name = name;
        this.type = type;
        this.optional = optional;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): NamedTupleMemberTypeParserJson {
        return {
            kind: this.kind,
            name: this.name,
            type: this.type.toJSON(),
            optional: this.optional
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return NamedTupleMemberTypeParser.formatToString({
            parser: this,
            project
        });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<NamedTupleMemberTypeParser>
    ): string {
        const { parser, project } = options;

        return `${parser.name}${
            parser.optional ? '?' : ''
        }: ${parser.type.toString(project)}`;
    }
}
