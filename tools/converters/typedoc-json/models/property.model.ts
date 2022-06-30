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

    get description(): string {
        return this.comment ? this.comment.shortText : '';
    }

    get propertyType(): string {
        if (this.type) {
            let type;
            if (this.type.type === 'array') {
                // if the type.type is array, then type.elementType.name should
                // contain type of array
                type = `${this.type.elementType?.name}`;
                if (this.type.typeArguments) {
                    type += `<${this.type.typeArguments.name}>`;
                }

                type += '[]';
            } else {
                // if type.type is not an array, then type.name should contain
                // name of property type whether they are primitive or Objects
                type = this.type.name;
                if (this.type.typeArguments) {
                    type += `<${this.type.typeArguments.name}>`;
                }
            }

            return type;
        } else {
            return 'any';
        }
    }
}
