/**
 * Text included with @overviewDetails tags in comments. The text is split on
 * all "\n" characters included in the text for the tag. This allows the
 * markdown generator to format the text exactly as it is written in the
 * comments.
 */
export interface OverviewDetail {
    /** The lines of text as written in overview detail. */
    text: string[];
}
