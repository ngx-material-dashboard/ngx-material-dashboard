import { TypeAliasParser as TypedocTypeAliasParser } from 'typedoc-json-parser';
import { CommentParser } from '../../misc-parsers';

export interface TypeAliasParserData extends TypedocTypeAliasParser.Data {
    /**
     * The comment parser of this type alias.
     * @since 1.0.0
     */
    comment: CommentParser;
}
