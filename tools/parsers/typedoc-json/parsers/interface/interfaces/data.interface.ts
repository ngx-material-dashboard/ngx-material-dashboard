import { InterfaceParser as TypedocInterfaceParser } from 'typedoc-json-parser';

import { CommentParser } from '../../misc-parsers';

export interface InterfaceParserData extends TypedocInterfaceParser.Data {
    /**
     * The comment parser of this interface.
     */
    comment: CommentParser;
}
