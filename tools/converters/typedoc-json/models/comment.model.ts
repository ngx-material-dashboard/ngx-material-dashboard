import { OverviewDetail } from './overview-detail.model';
import { UsageNote } from './usage-note.model';

export class Tag {
    header?: string;
    tag!: string;
    text!: string;
    type!: string;
    content?: OverviewDetail | UsageNote;

    constructor(data: Partial<Tag>) {
        Object.assign(this, data);
    }
}

export class Comment {
    overviewDetails: OverviewDetail[] = [];
    returns?: string;
    /** The first paragraph in the documentation. */
    shortText?: string;
    /** Any additional paragraphs after the shortText. */
    text?: string;
    tags: Tag[] = [];
    usageNotes: UsageNote[] = [];

    constructor(data: Partial<Comment>) {
        this.shortText = data.shortText;
        this.text = data.text;
        this.returns = data.returns;

        data.tags?.forEach((t: Partial<Tag>) => {
            const tag: Tag = new Tag(t);
            const text = t.text?.trim()?.split('\n');
            if (text && t.tag === 'usagenotes') {
                // remove any leading and trailing whitespace and line terminator
                // characters from text, then split on remaining "\n" characters
                // to create array of each line of text in note so it can be
                // rendered in template line by line
                const note = new UsageNote(text);
                this.usageNotes.push(note);
                tag.content = note;
                tag.header = note.header;
            } else if (text && t.tag === 'overviewdetails') {
                const detail = new OverviewDetail(text);
                this.overviewDetails.push(detail);
                tag.content = detail;
            }

            this.tags.push(tag);
        });
    }
}
