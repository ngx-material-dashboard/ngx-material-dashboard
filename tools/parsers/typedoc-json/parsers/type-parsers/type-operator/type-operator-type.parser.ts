import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { Operator } from './enums/operator.enum';
import { TypeOperatorTypeParserData } from './interfaces/data.interface';
import { TypeOperatorTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a type operator type.
 */
export class TypeOperatorTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.TypeOperator;

    /**
     * The operator of this type operator type.
     */
    public readonly operator: Operator;

    /**
     * The type of this type operator type.
     */
    public readonly type: TypeParser;

    public constructor(data: TypeOperatorTypeParserData) {
        const { operator, type } = data;

        this.operator = operator;
        this.type = type;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): TypeOperatorTypeParserJson {
        return {
            kind: this.kind,
            operator: this.operator,
            type: this.type.toJSON()
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return TypeOperatorTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<TypeOperatorTypeParser>
    ): string {
        const { parser, project } = options;

        return `${parser.operator} ${parser.type.toString(project)}`;
    }
}
