import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import {
    BindingPowers,
    FormatToStringOptions,
    TypeParser,
    wrap
} from '../type-parser';
import { ArrayTypeParserData } from './interfaces/data.interface';
import { ArrayTypeParserJson } from './interfaces/json.interface';

export class ArrayTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Array;

    /**
     * The type of this array type.
     */
    public readonly type: TypeParser;

    public constructor(data: ArrayTypeParserData) {
        const { type } = data;

        this.type = type;
    }

    /**
     * Converts this parser to a Json compatible format.
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): ArrayTypeParserJson {
        return {
            kind: this.kind,
            type: this.type.toJSON()
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @param project The project to convert this parser to a string.
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return ArrayTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<ArrayTypeParser>
    ): string {
        const { parser } = options;

        return `${wrap(parser.type, BindingPowers[Kind.Array])}[]`;
    }
}
