import { TypedocBase } from './typedoc-base.model';

export class Property extends TypedocBase {

    defaultValue?: string;
    override kindString: string = 'Property';

    get description(): string {
        return this.comment ? this.comment.shortText : '';
    }
}
