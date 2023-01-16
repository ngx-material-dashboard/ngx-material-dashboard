import { CommentParser, ParameterParser } from '../../../misc-parsers';
import { ParserData } from '../../../parser';
import { ClassParserAccessibility } from '../../enums/accessibility.enum';

export interface ClassConstructorParserData extends ParserData {
    /**
     * The comment parser of this constructor.
     */
    comment: CommentParser;

    /**
     * The accessibility of this constructor.
     */
    accessibility: ClassParserAccessibility;

    /**
     * The id of the parent class parser.
     */
    parentId: number;

    /**
     * The parameter parsers of this constructor.
     */
    parameters: ParameterParser[];
}
