import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { InferredTypeParserData } from './interfaces/data.interface';
import { InferredTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for an inferred type.
 */
export class InferredTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Inferred;

    /**
     * The type of this inferred type.
     */
    public readonly type: string;

    public constructor(data: InferredTypeParserData) {
        const { type } = data;

        this.type = type;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): InferredTypeParserJson {
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
        return InferredTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<InferredTypeParser>
    ): string {
        const { parser } = options;

        return `infer ${parser.type}`;
    }
}
