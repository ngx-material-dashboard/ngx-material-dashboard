import { CommentParser } from '../../../misc-parsers';
import { ParserData } from '../../../parser';
import { TypeParser } from '../../../type-parsers';
import { ClassParserAccessibility } from '../../enums/accessibility.enum';

export interface ClassPropertyParserData extends ParserData {
    /**
     * The comment parser of this property.
     */
    comment: CommentParser;

    /**
     * The id of the parent class parser.
     */
    parentId: number;

    /**
     * The accessibility of this property.
     */
    accessibility: ClassParserAccessibility;

    /**
     * Whether this property is abstract.
     */
    abstract: boolean;

    /**
     * Whether this property is static.
     */
    static: boolean;

    /**
     * Whether this property is readonly.
     */
    readonly: boolean;

    /**
     * Whether this property is optional.
     */
    optional: boolean;

    /**
     * The type parser of this property.
     */
    type: TypeParser;
}
