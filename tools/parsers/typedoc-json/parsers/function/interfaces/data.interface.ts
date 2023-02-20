import { CommentParser, SignatureParser } from '../../misc-parsers';
import { ParserData } from '../../parser';

export interface FunctionParserData extends ParserData {
    /**
     * The comment parser of this function.
     */
    comment: CommentParser;

    /**
     * Whether this function is external.
     */
    external: boolean;

    /**
     * The signature parsers of this function.
     */
    signatures: SignatureParser[];
}
