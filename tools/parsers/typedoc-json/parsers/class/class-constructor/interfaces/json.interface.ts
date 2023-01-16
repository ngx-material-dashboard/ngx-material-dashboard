import { CommentParserData, ParameterParserJson } from '../../../misc-parsers';
import { ParserJson } from '../../../parser';
import { ClassParserAccessibility } from '../../enums/accessibility.enum';

export interface ClassConstructorParserJson extends ParserJson {
    /**
     * The comment parser of this constructor.
     */
    comment: CommentParserData;

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
    parameters: ParameterParserJson[];
}
