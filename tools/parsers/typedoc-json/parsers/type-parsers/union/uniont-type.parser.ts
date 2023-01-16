import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import {
    BindingPowers,
    FormatToStringOptions,
    TypeParser,
    wrap
} from '../type-parser';
import { UnionTypeParserData } from './interfaces/data.interface';
import { UnionTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a union type.
 */
export class UnionTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Union;

    /**
     * The types of this union type.
     */
    public readonly types: TypeParser[];

    public constructor(data: UnionTypeParserData) {
        const { types } = data;

        this.types = types;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): UnionTypeParserJson {
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
        return UnionTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<UnionTypeParser>
    ): string {
        const { parser } = options;

        return parser.types
            .map((type) => wrap(type, BindingPowers[Kind.Union]))
            .join(' | ');
    }
}
