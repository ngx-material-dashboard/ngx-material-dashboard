import { TypedocBase } from './typedoc-base.model';
import { Decorator } from './decorator.model';
import { TypeModel } from './type.model';
export class Property extends TypedocBase {

    propertyDecorator?: Decorator;
    propertyDecoratorDisplay: string = '';
    type?: TypeModel;
    displayType: string;
    defaultValue?: string;
    override kindString: string = 'Property';

    constructor(data: Partial<Property>) {
        super(data);

        if (data.decorators) {
            this.propertyDecorator = new Decorator(data.decorators[0]);
            if (this.propertyDecorator.type) {
                this.propertyDecoratorDisplay = `@${this.propertyDecorator.type.name}()`;
            }
        }

        if (data.type) {
            this.type = new TypeModel(data.type);
            this.displayType = this.type.displayType;
        } else {
            this.displayType = 'any';
        }
    }
}
