import { TypedocBase } from './typedoc-base.model';
import { Decorator } from './decorator.model';
export class Property extends TypedocBase {

    propertyDecorator?: Decorator;
    defaultValue?: string;
    override kindString: string = 'Property';

    constructor(data: Partial<Property>) {
        super(data);

        if (data.decorator) {
            this.propertyDecorator = new Decorator(data.decorator);
        }
    }

    get description(): string {
        return this.comment ? this.comment.shortText : '';
    }
}
