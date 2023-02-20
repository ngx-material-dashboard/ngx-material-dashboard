import { CommentParser } from 'typedoc-json-parser';

/**
 * A tag of a comment.
 * @since 1.0.0
 */
export interface BlockTag extends CommentParser.BlockTag {
    /**
     * The text of this tag.
     * @since 1.0.0
     */
    textArray: string[];
}
