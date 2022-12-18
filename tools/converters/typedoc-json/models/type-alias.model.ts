import { Comment } from './comment.model';
import { TypedocBase } from './typedoc-base.model';

export class TypeAlias extends TypedocBase {
    override kindString: string = 'Type Alias';

    constructor(data: Partial<TypeAlias>) {
        super(data);

        if (data.type && data.type.declaration.signatures[0].comment) {
            // parse out comments which should be in 'Constructor signature'
            this.comment = new Comment(
                data.type.declaration.signatures[0].comment
            );
            this.description = this.comment.shortText;
            this.usageNotes = this.comment.usageNotes;
            this.overviewDetails = this.comment.overviewDetails;
        }
    }
}
