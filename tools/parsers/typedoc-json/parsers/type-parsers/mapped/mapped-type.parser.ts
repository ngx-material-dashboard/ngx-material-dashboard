import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { Modifier } from './enums/modifier.enum';
import { MappedTypeParserData } from './interfaces/data.interface';
import { MappedTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a mapped type.
 * @since 1.0.0
 */
export class MappedTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    public readonly kind = Kind.Mapped;

    /**
     * The parameter name of this mapped type.
     * @since 1.0.0
     */
    public readonly parameter: string;

    /**
     * The parameter type of this mapped type.
     * @since 1.0.0
     */
    public readonly parameterType: TypeParser;

    /**
     * The name type of this mapped type.
     * @since 1.0.0
     */
    public readonly nameType: TypeParser | null;

    /**
     * The template type of this mapped type.
     * @since 1.0.0
     */
    public readonly templateType: TypeParser;

    /**
     * The readonly modifier of this mapped type.
     * @since 1.0.0
     */
    public readonly readonly: Modifier | null;

    /**
     * The optional modifier of this mapped type.
     * @since 1.0.0
     */
    public readonly optional: Modifier | null;

    public constructor(data: MappedTypeParserData) {
        const {
            parameter,
            parameterType,
            nameType,
            templateType,
            readonly,
            optional
        } = data;

        this.parameter = parameter;
        this.parameterType = parameterType;
        this.nameType = nameType;
        this.templateType = templateType;
        this.readonly = readonly;
        this.optional = optional;
    }

    /**
     * Converts this parser to a Json compatible format.
     * @since 1.0.0
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): MappedTypeParserJson {
        return {
            kind: this.kind,
            parameter: this.parameter,
            parameterType: this.parameterType.toJSON(),
            nameType: this.nameType ? this.nameType.toJSON() : null,
            templateType: this.templateType.toJSON(),
            readonly: this.readonly,
            optional: this.optional
        };
    }

    /**
     * Converts this parser to a string.
     * @since 1.0.0
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return MappedTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<MappedTypeParser>
    ): string {
        const { parser, project } = options;
        const readonly =
            parser.readonly === Modifier.Add
                ? 'readonly'
                : parser.readonly === Modifier.Remove
                ? '-readonly'
                : '';

        const optional =
            parser.optional === Modifier.Add
                ? '?'
                : parser.optional === Modifier.Remove
                ? '-?'
                : '';

        return `{ ${readonly}[${
            parser.parameter
        } in ${parser.parameterType.toString(
            project
        )}]${optional}: ${parser.templateType.toString(project)} }`;
    }
}
