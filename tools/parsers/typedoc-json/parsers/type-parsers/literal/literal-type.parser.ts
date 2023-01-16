import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { LiteralTypeParserData } from './interfaces/data.interface';
import { LiteralTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a literal type.
 */
export class LiteralTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Literal;

    /**
     * The value of this literal type.
     */
    public readonly value: string;

    public constructor(data: LiteralTypeParserData) {
        const { value } = data;

        this.value = value;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): LiteralTypeParserJson {
        return {
            kind: this.kind,
            value: this.value
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return LiteralTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<LiteralTypeParser>
    ): string {
        const { parser } = options;

        return parser.value;
    }
}
