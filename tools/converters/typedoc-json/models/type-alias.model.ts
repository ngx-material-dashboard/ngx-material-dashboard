import { Comment } from './comment.model';
import { Property } from './property.model';
import { TypeModel } from './type.model';
import { TypedocBase } from './typedoc-base.model';

export class TypeAlias extends TypedocBase {
    override kindString: string = 'Type Alias';
    properties: Property[] = [];
    sortedProperties: Property[] = [];

    constructor(data: Partial<TypeAlias>) {
        super(data);

        if (data.type) {
            if (data.type.declaration?.signatures[0]?.comment) {
                // parse out comments which should be in 'Constructor signature'
                this.comment = new Comment(
                    data.type.declaration.signatures[0].comment
                );
                this.description = this.comment.shortText;
                this.usageNotes = this.comment.usageNotes;
                this.overviewDetails = this.comment.overviewDetails;
            } else if (data.comment) {
                this.comment = new Comment(data.comment);
                this.description = this.comment.shortText;
                this.usageNotes = this.comment.usageNotes;
                this.overviewDetails = this.comment.overviewDetails;
            }

            this.type = new TypeModel(data.type);
        }
    }

    sortProperties(): void {
        this.sortedProperties = this.properties.sort(Property.sort);
    }
}
