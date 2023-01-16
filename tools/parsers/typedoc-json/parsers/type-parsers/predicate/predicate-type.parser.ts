import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { PredicateTypeParserData } from './interfaces/data.interface';
import { PredicateTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a predicate type.
 */
export class PredicateTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Predicate;

    /**
     * Whether this predicate type asserts a value.
     */
    public readonly asserts: boolean;

    /**
     * The name of this predicate type.
     */
    public readonly name: string;

    /**
     * The type of this predicate type.
     *
     * If this {@link PredicateTypeParser.asserts} is `false` this will not be `null`
     */
    public readonly type: TypeParser | null;

    public constructor(data: PredicateTypeParserData) {
        const { asserts, name, type } = data;

        this.asserts = asserts;
        this.name = name;
        this.type = type;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): PredicateTypeParserJson {
        return {
            kind: this.kind,
            asserts: this.asserts,
            name: this.name,
            type: this.type ? this.type.toJSON() : null
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return PredicateTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<PredicateTypeParser>
    ): string {
        const { parser, project } = options;

        return parser.asserts
            ? `asserts ${parser.name}`
            : `${parser.name} is ${parser.type?.toString(project)}`;
    }
}
