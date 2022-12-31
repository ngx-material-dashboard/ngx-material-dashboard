import { OverviewDetail } from 'tools/converters/typedoc-json/models/overview-detail.model';

export interface Comment {
    /** The list of overviewDetails included in the comment. */
    overviewDetails: OverviewDetail[];
    /** The type of return value defined in comment. */
    returns?: string;
    /** The first paragraph in the comment. */
    shortText?: string;
    /** Any additional paragraphs after the shortText. */
    text?: string;
}
