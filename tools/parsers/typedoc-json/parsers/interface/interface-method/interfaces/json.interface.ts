import { SignatureParserJson } from '../../../misc-parsers';
import { ParserJson } from '../../../parser';

export interface InterfaceMethodParserJson extends ParserJson {
    /**
     * The id of the parent interface parser.
     * @since 4.0.0
     */
    parentId: number;

    /**
     * The signature parsers of this method in a Json compatible format.
     * @since 3.1.0
     */
    signatures: SignatureParserJson[];
}
