import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { UnknownTypeParserData } from './interfaces/data.interface';
import { UnknownTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for an unknown type.
 */
export class UnknownTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Unknown;

    /**
     * The name of this unknown type.
     */
    public readonly name: string;

    public constructor(data: UnknownTypeParserData) {
        const { name } = data;

        this.name = name;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): UnknownTypeParserJson {
        return {
            kind: this.kind,
            name: this.name
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return UnknownTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<UnknownTypeParser>
    ): string {
        const { parser } = options;

        return parser.name;
    }
}
