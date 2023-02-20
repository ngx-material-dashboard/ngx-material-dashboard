import { CommentParserJson, SignatureParserJson } from '../../misc-parsers';
import { ParserJson } from '../../parser';

export interface FunctionParserJson extends ParserJson {
    /**
     * The comment parser of this function.
     */
    comment: CommentParserJson;

    /**
     * Whether this function is external.
     */
    external: boolean;

    /**
     * The signature parsers of this function in a Json compatible format.
     */
    signatures: SignatureParserJson[];
}
