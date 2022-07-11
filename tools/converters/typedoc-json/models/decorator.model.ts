import { DecoratorType } from './decorator-type.model';
import { TypedocBase } from './typedoc-base.model';

export class Decorator extends TypedocBase {

    arguments?: { obj: string };

    constructor(data: Partial<Decorator>) {
        super(data);

        if (data.arguments) {
            this.arguments = data.arguments;
        }

        if (data.type) {
            this.type = new DecoratorType(data.type);
        }
    }
}
