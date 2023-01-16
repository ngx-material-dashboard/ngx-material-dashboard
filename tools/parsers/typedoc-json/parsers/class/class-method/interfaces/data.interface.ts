import { SignatureParser } from '../../../misc-parsers';
import { ParserData } from '../../../parser';
import { ClassParserAccessibility } from '../../enums/accessibility.enum';

export interface ClassMethodParserData extends ParserData {
    /**
     * The id of the parent class parser.
     */
    parentId: number;

    /**
     * The accessibility of this method.
     */
    accessibility: ClassParserAccessibility;

    /**
     * Whether this method is abstract.
     */
    abstract: boolean;

    /**
     * Whether this method is static.
     */
    static: boolean;

    /**
     * The signature parsers of this method.
     */
    signatures: SignatureParser[];
}
