import { SourceParser } from 'typedoc-json-parser';

export interface ParserJson {
    /**
     * The identifier for this parser.
     * @since 1.0.0
     */
    id: number;

    /**
     * The name for this parser.
     * @since 1.0.0
     */
    name: string;

    /**
     * The source parser for this parser in a Json compatible format.
     * @since 1.0.0
     */
    source: SourceParser.Json | null;
}
