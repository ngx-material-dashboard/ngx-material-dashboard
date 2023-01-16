import { CommentParser } from '../../../misc-parsers';
import { ParserData } from '../../../parser';
import { TypeParser } from '../../../type-parsers';

export interface InterfacePropertyParserData extends ParserData {
    /**
     * The comment parser of this property.
     */
    comment: CommentParser;

    /**
     * The id of the parent interface parser.
     */
    parentId: number;

    /**
     * Whether this interface property is readonly.
     */
    readonly: boolean;

    /**
     * The type of this property.
     */
    type: TypeParser;
}
