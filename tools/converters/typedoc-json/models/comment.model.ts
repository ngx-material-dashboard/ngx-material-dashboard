import { UsageNote } from './usage-note.model';

interface Tag {
    tag: string;
    text: string;
}

export class Comment {

    returns?: string;
    shortText?: string;
    tags?: Tag[];
    usageNotes: UsageNote[] = [];

    constructor(data: Partial<Comment>) {
        Object.assign(this, data);

        this.tags?.forEach((t: Tag) => {
            if (t.tag === 'usagenotes') {
                this.usageNotes.push(new UsageNote(t.text.split('\n')));
            }
        });
    }
}