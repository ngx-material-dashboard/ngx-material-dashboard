import { InterfaceParser as TypedocInterfaceParser } from 'typedoc-json-parser';

import { CommentParserJson } from '../../misc-parsers';

export interface InterfaceParserJson extends TypedocInterfaceParser.Json {
    /**
     * The comment parser of this interface.
     * @since 1.0.0
     */
    comment: CommentParserJson;
}
