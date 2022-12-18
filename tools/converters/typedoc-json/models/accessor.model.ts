import { Decorator } from './decorator.model';
import { Parameter } from './parameter.model';
import { Property } from './property.model';
import { TypeModel } from './type.model';
import { TypedocBase } from './typedoc-base.model';

export class Accessor extends Property {
    override kindString: string = 'Accessor';
    getSignature?: TypedocBase[];
    setSignature?: TypedocBase[];
    isGetter: boolean = false;
    isSetter: boolean = false;
    returnType?: string;

    constructor(data: Partial<Accessor>) {
        super(data);

        if (data.getSignature && data.getSignature[0].type) {
            this.isGetter = true;
            const getSignature = new TypedocBase(data.getSignature[0]);
            const returnType = new TypeModel(data.getSignature[0].type);
            this.displayType = returnType.name;
            this.description = getSignature.description;
        } else if (data.setSignature && data.setSignature[0].type) {
            this.isSetter = true;
            const setSignature = new TypedocBase(data.setSignature[0]);
            this.description = setSignature.description;

            if (data.setSignature[0].parameters) {
                this.parameters = [];
                this.displayType = '';
                data.setSignature[0].parameters.forEach(
                    (p: Partial<Parameter>) => {
                        const param = new Parameter(p);
                        this.parameters?.push(param);
                        this.displayType += param.displayType;
                    }
                );
            }
        }

        if (data.decorators) {
            this.propertyDecorator = new Decorator(data.decorators[0]);
            if (this.propertyDecorator.type) {
                this.propertyDecoratorDisplay = `@${this.propertyDecorator.type.name}()`;
            }
        }
    }
}
