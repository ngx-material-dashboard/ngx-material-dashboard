import { TypedocBase } from './typedoc-base.model';
import { Decorator } from './decorator.model';
import { TypeModel } from './type.model';
export class Property extends TypedocBase {

    propertyDecorator?: Decorator;
    type?: TypeModel;
    displayType: string;
    defaultValue?: string;
    override kindString: string = 'Property';

    constructor(data: Partial<Property>) {
        super(data);

        if (data.decorator) {
            this.propertyDecorator = new Decorator(data.decorator);
        }

        if (data.type) {
            this.type = new TypeModel(data.type);
            this.displayType = this.type.displayType;
        } else {
            this.displayType = 'any';
        }
    }
}
