import { SignatureParserJson } from '../../../misc-parsers';
import { ParserJson } from '../../../parser';
import { ClassParserAccessibility } from '../../enums/accessibility.enum';

export interface ClassMethodParserJson extends ParserJson {
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
     * The signature parsers of this method in a Json compatible format.
     */
    signatures: SignatureParserJson[];
}
