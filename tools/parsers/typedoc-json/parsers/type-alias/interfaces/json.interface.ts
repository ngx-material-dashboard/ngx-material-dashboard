import { TypeAliasParser as TypedocTypeAliasParser } from 'typedoc-json-parser';
import { CommentParserJson } from '../../misc-parsers';

export interface TypeAliasParserJson extends TypedocTypeAliasParser.Json {
    /**
     * The comment parser of this type alias.
     * @since 1.0.0
     */
    comment: CommentParserJson;
}
