import { SourceParser } from '../..';

export interface ParserData {
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
     * The source parser for this parser.
     * @since 1.0.0
     */
    source: SourceParser | null;
}
