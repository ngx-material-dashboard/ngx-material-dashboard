import { TypedocBase } from './typedoc-base.model';
import { Decorator } from './decorator.model';
import { TypeModel } from './type.model';
export class Property extends TypedocBase {

    propertyDecorator?: Decorator;
    type?: TypeModel;
    defaultValue?: string;
    override kindString: string = 'Property';

    constructor(data: Partial<Property>) {
        super(data);

        if (data.decorator) {
            this.propertyDecorator = new Decorator(data.decorator);
        }

        if (data.type) {
            this.type = new TypeModel(data.type);
        }
    }

    get propertyType(): string {
        return this.type ? this.type.displayType : 'any';
    }
}
