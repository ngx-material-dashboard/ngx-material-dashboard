import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import {
    BindingPowers,
    FormatToStringOptions,
    TypeParser,
    wrap
} from '../type-parser';
import { ConditionTypeParserData } from './interfaces/data.interface';
import { ConditionalTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a conditional type.
 * @since 1.0.0
 */
export class ConditionalTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    public readonly kind = Kind.Conditional;

    /**
     * The check type of this conditional type.
     * @since 1.0.0
     */
    public readonly checkType: TypeParser;

    /**
     * The extends type of this conditional type.
     * @since 1.0.0
     */
    public readonly extendsType: TypeParser;

    /**
     * The type of this conditional type when the check type is true.
     * @since 1.0.0
     */
    public readonly trueType: TypeParser;

    /**
     * The type of this conditional type when the check type is false.
     * @since 1.0.0
     */
    public readonly falseType: TypeParser;

    public constructor(data: ConditionTypeParserData) {
        const { checkType, extendsType, trueType, falseType } = data;

        this.checkType = checkType;
        this.extendsType = extendsType;
        this.trueType = trueType;
        this.falseType = falseType;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): ConditionalTypeParserJson {
        return {
            kind: this.kind,
            checkType: this.checkType.toJSON(),
            extendsType: this.extendsType.toJSON(),
            trueType: this.trueType.toJSON(),
            falseType: this.falseType.toJSON()
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return ConditionalTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     * @since 4.0.0
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<ConditionalTypeParser>
    ): string {
        const { parser, project } = options;

        return `${wrap(
            parser.checkType,
            BindingPowers[Kind.Conditional]
        )} extends ${parser.extendsType.toString(
            project
        )} ? ${parser.trueType.toString(project)} : ${parser.falseType.toString(
            project
        )}`;
    }
}
