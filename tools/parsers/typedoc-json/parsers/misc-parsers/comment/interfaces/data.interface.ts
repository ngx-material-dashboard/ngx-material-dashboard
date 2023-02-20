import { BlockTag } from './block-tag.interface';

export interface CommentParserData {
    /**
     * The description of this comment.
     * @since 1.0.0
     */
    description: string | null;

    /**
     * The block tags of this comment.
     * @since 1.0.0
     */
    blockTags: BlockTag[];

    /**
     * The modifier tags of this comment.
     * @since 1.0.0
     */
    modifierTags: string[];

    // /** The list of overviewDetails included in the comment. */
    // overviewDetails: OverviewDetail[];
    /** The type of return value defined in comment. */
    returns?: string;
    /** The first paragraph in the comment. */
    shortText?: string;
    /** Any additional paragraphs after the shortText. */
    text?: string;
}
