import { OverviewDetail } from './overview-detail.model';
import { UsageNote } from './usage-note.model';

interface Tag {
    tag: string;
    text: string;
}

export class Comment {

    overviewDetails: OverviewDetail[] = [];
    returns?: string;
    /** The first paragraph in the documentation. */
    shortText?: string;
    /** Any additional paragraphs after the shortText. */
    text?: string;
    tags?: Tag[];
    usageNotes: UsageNote[] = [];

    constructor(data: Partial<Comment>) {
        Object.assign(this, data);

        this.tags?.forEach((t: Tag) => {
            if (t.tag === 'usagenotes') {
                // remove any leading and trailing whitespace and line terminator
                // characters from text, then split on remaining "\n" characters
                // to create array of each line of text in note so it can be
                // rendered in template line by line 
                this.usageNotes.push(new UsageNote(t.text.trim().split('\n')));
            } else if (t.tag === 'overviewdetails') {
                this.overviewDetails.push(new OverviewDetail(t.text.trim().split('\n')));
            }
        });
    }
}
