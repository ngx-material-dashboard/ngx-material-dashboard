import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { TupleTypeParserData } from './interfaces/data.interface';
import { TupleTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a tuple type.
 */
export class TupleTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Tuple;

    /**
     * The types of this tuple type.
     */
    public readonly types: TypeParser[];

    public constructor(data: TupleTypeParserData) {
        const { types } = data;

        this.types = types;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): TupleTypeParserJson {
        return {
            kind: this.kind,
            types: this.types.map((type) => type.toJSON())
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return TupleTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<TupleTypeParser>
    ): string {
        const { parser, project } = options;

        return `[${parser.types
            .map((type) => type.toString(project))
            .join(', ')}]`;
    }
}
