import { CommentParserJson } from '../../../misc-parsers';
import { ParserJson } from '../../../parser';
import { Json } from '../../../type-parsers';

export interface InterfacePropertyParserJson extends ParserJson {
    /**
     * The comment parser of this property.
     */
    comment: CommentParserJson;

    /**
     * The id of the parent interface parser.
     */
    parentId: number;

    /**
     * Whether this interface property is readonly.
     */
    readonly: boolean;

    /**
     * The type of this property in a Json compatible format.
     */
    type: Json;
}
