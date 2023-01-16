import { SignatureParser } from '../../../misc-parsers';
import { ParserData } from '../../../parser';

export interface InterfaceMethodParserData extends ParserData {
    /**
     * The id of the parent interface parser.
     * @since 4.0.0
     */
    parentId: number;

    /**
     * The signature parsers of this method.
     * @since 3.1.0
     */
    signatures: SignatureParser[];
}
