import { JSONOutput } from 'typedoc';
import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { ReflectionTypeParserData } from './interfaces/data.interface';
import { ReflectionTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a reflection type.
 */
export class ReflectionTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Reflection;

    /**
     * The reflection of this reflection type.
     */
    public reflection: JSONOutput.DeclarationReflection | null;

    public constructor(data: ReflectionTypeParserData) {
        const { reflection } = data;

        this.reflection = reflection;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): ReflectionTypeParserJson {
        return {
            kind: this.kind,
            reflection: this.reflection
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return ReflectionTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<ReflectionTypeParser>
    ): string {
        const { parser } = options;

        return !parser.reflection?.children && parser.reflection?.signatures
            ? 'Function'
            : 'Object';
    }
}
