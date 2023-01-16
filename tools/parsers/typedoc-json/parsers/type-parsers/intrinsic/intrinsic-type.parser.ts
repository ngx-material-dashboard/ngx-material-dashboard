import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { IntrinsicTypeParserData } from './interfaces/data.interface';
import { IntrinsicTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for an intrinsic type.
 * @since 1.0.0
 */
export class IntrinsicTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Intrinsic;

    /**
     * The type of this intrinsic type.
     */
    public readonly type: string;

    public constructor(data: IntrinsicTypeParserData) {
        const { type } = data;

        this.type = type;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): IntrinsicTypeParserJson {
        return {
            kind: this.kind,
            type: this.type
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return IntrinsicTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<IntrinsicTypeParser>
    ): string {
        const { parser } = options;

        return parser.type;
    }
}
