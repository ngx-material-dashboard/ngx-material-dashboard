import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import {
    BindingPowers,
    FormatToStringOptions,
    TypeParser,
    wrap
} from '../type-parser';
import { OptionalTypeParserData } from './interfaces/data.interface';
import { OptionalTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for an optional type.
 * @since 1.0.0
 */
export class OptionalTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    public readonly kind = Kind.Optional;

    /**
     * The type of this optional type.
     * @since 1.0.0
     */
    public readonly type: TypeParser;

    public constructor(data: OptionalTypeParserData) {
        const { type } = data;

        this.type = type;
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): OptionalTypeParserJson {
        return {
            kind: this.kind,
            type: this.type.toJSON()
        };
    }

    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return OptionalTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<OptionalTypeParser>
    ): string {
        const { parser } = options;

        return `${wrap(parser.type, BindingPowers[Kind.Optional])}?`;
    }
}
