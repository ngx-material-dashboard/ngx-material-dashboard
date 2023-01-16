import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { TemplateLiteralTypeParserData } from './interfaces/data.interface';
import { TemplateLiteralTypeParserJson } from './interfaces/json.interface';
import { Tail } from './interfaces/tail.interface';

/**
 * Parses data for a template literal type.
 */
export class TemplateLiteralTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     * @since 1.0.0
     */
    public readonly kind = Kind.TemplateLiteral;

    /**
     * The head of this template literal type.
     */
    public readonly head: string;

    /**
     * The tail of this template literal type.
     */
    public readonly tail: Tail[];

    public constructor(data: TemplateLiteralTypeParserData) {
        const { head, tail } = data;

        this.head = head;
        this.tail = tail;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): TemplateLiteralTypeParserJson {
        return {
            kind: this.kind,
            head: this.head,
            tail: this.tail.map((tail) => ({
                type: tail.type.toJSON(),
                text: tail.text
            }))
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return TemplateLiteralTypeParser.formatToString({
            parser: this,
            project
        });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<TemplateLiteralTypeParser>
    ): string {
        const { parser, project } = options;

        return `\`${parser.head}${parser.tail
            .map((tail) => `\${${tail.type.toString(project)}}${tail.text}`)
            .join('')}\``;
    }
}
