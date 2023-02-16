import { EnumParser } from 'typedoc-json-parser';
import { CommentParserJson } from '../../misc-parsers';

export interface EnumParserJson extends EnumParser.Json {
    /**
     * The comment parser of this enum.
     */
    comment: CommentParserJson;
}
