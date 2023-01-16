import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import {
    BindingPowers,
    FormatToStringOptions,
    TypeParser,
    wrap
} from '../type-parser';
import { RestTypeParserData } from './interfaces/data.interface';
import { RestTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a rest type.
 */
export class RestTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Rest;

    /**
     * The type of this rest type.
     */
    public readonly type: TypeParser;

    public constructor(data: RestTypeParserData) {
        const { type } = data;

        this.type = type;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): RestTypeParserJson {
        return {
            kind: this.kind,
            type: this.type.toJSON()
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return RestTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<RestTypeParser>
    ): string {
        const { parser } = options;

        return `...${wrap(parser.type, BindingPowers[Kind.Rest])}`;
    }
}
