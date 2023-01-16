import { Kind } from '../../../enums';
import { ProjectParser } from '../../project/project.parser';
import { ReferenceTypeParser } from '../reference';
import { FormatToStringOptions, TypeParser } from '../type-parser';
import { QueryTypeParserData } from './interfaces/data.interface';
import { QueryTypeParserJson } from './interfaces/json.interface';

/**
 * Parses data for a query type.
 */
export class QueryTypeParser implements TypeParser {
    /**
     * The kind of type this parser is for.
     */
    public readonly kind = Kind.Query;

    /**
     * The query of this query type.
     */
    public readonly query: ReferenceTypeParser;

    public constructor(data: QueryTypeParserData) {
        const { query } = data;

        this.query = query;
    }

    /**
     * Converts this parser to a Json compatible format.
     *
     * @returns The Json compatible format of this parser.
     */
    public toJSON(): QueryTypeParserJson {
        return {
            kind: this.kind,
            query: this.query.toJSON()
        };
    }

    /**
     * Converts this parser to a string.
     *
     * @returns The string representation of this parser.
     */
    public toString(project?: ProjectParser): string {
        return QueryTypeParser.formatToString({ parser: this, project });
    }

    /**
     * Formats this type parser to a string.
     *
     * @param options The options to format this type parser to a string.
     * @returns The string representation of this parser.
     */
    public static formatToString(
        options: FormatToStringOptions<QueryTypeParser>
    ): string {
        const { parser, project } = options;

        return `typeof ${parser.query.toString(project)}`;
    }
}
